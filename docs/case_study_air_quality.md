## 1. Abstract

This case study examines the conceptual framework, analytical methodology, and geospatial architecture of the Uzbekistan Air Quality and Health Risk system. The platform is designed to transform disparate ground-level air quality observations and satellite atmospheric measurements into continuous spatial rasters and composite health-risk indices across the thirteen administrative regions of Uzbekistan. By integrating multi-pollutant telemetry (PM2.5, PM10, NO2, SO2, O3, CO, NH3, VOCs) with regional exposure weighting and boundary clipping, the system constructs a standardized risk metric to assist environmental assessment. The platform operates as a client-side analytical dashboard that reads structured daily static datasets while also providing an in-browser WebAssembly Python execution environment for reproducible pipeline execution. The resulting outputs include five continuous raster layers, a thirteen-column ranked municipal risk matrix, and interactive temporal visualizations. This document details the end-to-end data pipeline, mathematical formulations, spatial interpolation techniques, and interpretation mechanics underlying the system.

## 2. Introduction

Ambient air pollution in Central Asia presents complex environmental and public health challenges shaped by arid topography, regional dust transport from the Aral Sea basin, dense urban centers such as Tashkent, and enclosed topographical basins like the Fergana Valley. Assessing population exposure requires reconciling discrete point observations from municipal monitoring stations with regional-scale atmospheric patterns.

Conventional environmental monitoring often presents air quality data as disconnected numerical tables or isolated pollutant concentrations. However, public health risks arise from simultaneous exposure to multiple gaseous and particulate pollutants rather than individual parameters in isolation. Furthermore, ground sensor networks often exhibit uneven spatial distribution, leaving wide rural and desert expanses unmonitored.

To bridge this operational gap, the Uzbekistan Air Quality system combines multi-pollutant ground measurements, satellite observation schemas (Sentinel-5P and MODIS), and administrative boundary models. By deriving a unified composite health risk score and interpolating continuous spatial fields across Uzbekistan's geographical extent, the system provides a holistic view of national air quality dynamics.

## 3. Problem Statement

Environmental decision-makers, regional analysts, and public health officials face several difficulties when assessing air quality in Uzbekistan:

1. **Multi-Pollutant Complexity:** Individual pollutants have distinct health impacts, dispersion rates, and baseline behaviors. Interpreting raw concentrations of PM2.5, PM10, NO2, and SO2 concurrently without an integrated index creates cognitive overhead and complicates regional comparisons.
2. **Spatial Discontinuity:** Ground monitoring stations provide localized point measurements. Without spatial interpolation, regional exposure between monitoring locations remains unquantified.
3. **Geographical Vulnerability Disparities:** Distinct geographical zones face varying environmental burdens, such as heavy mineral dust in Karakalpakstan versus concentrated vehicular and industrial emissions in Tashkent and Fergana. Standard air quality index metrics do not account for these geographical vulnerabilities.
4. **Data Delivery Friction:** Complex geospatial models typically require dedicated server backends and geospatial databases, limiting operational accessibility in low-bandwidth or resource-constrained settings.

The primary objective of the system is to solve these problems by providing an end-to-end pipeline that ingests multi-pollutant metrics, applies a weighted composite risk formulation with regional vulnerability adjustments, generates boundary-clipped spatial rasters, and serves the results through an accessible, serverless interface.

## 4. Objectives

### Primary Objective

To construct a unified analytical and spatial visualization platform that computes, ranks, and maps multi-pollutant health risks across the administrative territories of Uzbekistan on a daily basis.

### Supporting Objectives

- Formulate a weighted composite health-risk scoring algorithm that integrates particulate matter, gaseous pollutants, and overall air quality index (AQI) values.
- Incorporate geographical vulnerability factors that adjust raw exposure scores according to regional environmental conditions.
- Implement an Inverse Distance Weighting (IDW) interpolation method with nearest-neighbor blending and Gaussian smoothing to create continuous spatial surfaces across the national extent.
- Clip all spatial raster surfaces precisely to the international boundary of Uzbekistan using official administrative vector boundaries.
- Provide a dual-mode operational architecture that pairs pre-rendered daily time series with an in-browser WebAssembly Python pipeline execution engine (Pipeline Studio) for interactive scenario modeling.
- Support compliance assessment against international standards, specifically flagging particulate concentrations exceeding the World Health Organization (WHO) guideline thresholds.

## 5. Domain and Theoretical Background

Understanding the system requires familiarity with several atmospheric, public health, and geospatial concepts as implemented in the project.

### Particulate Matter (PM2.5 and PM10)

Fine particulate matter with an aerodynamic diameter smaller than 2.5 micrometers (PM2.5) penetrates deeply into the alveolar regions of the lungs and can enter the bloodstream. Coarse particulate matter (PM10) affects the upper respiratory tract. In the project, PM2.5 serves as the primary ground-level pollutant driving both the standard Air Quality Index calculation and the largest single weight in the composite health-risk score.

### Gaseous Air Pollutants

- **Nitrogen Dioxide (NO2):** A marker of combustion processes from vehicular traffic and thermal power generation.
- **Sulfur Dioxide (SO2):** An indicator of industrial emissions and coal combustion.
- **Ground-Level Ozone (O3):** A secondary photochemical oxidant formed by interactions between nitrogen oxides and volatile organic compounds under sunlight.
- **Carbon Monoxide (CO):** A product of incomplete combustion that reduces oxygen delivery in the human circulatory system.
- **Ammonia (NH3) and Volatile Organic Compounds (VOCs):** Agricultural and industrial emissions contributing to secondary aerosol formation.

### Satellite Earth Observations

- **Sentinel-5P (TROPOMI):** Measures tropospheric column densities of NO2 and SO2 in units of micromoles per square meter (µmol/m²).
- **MODIS (MCD19A2):** Measures Aerosol Optical Depth (AOD) at 550 nm, representing the extinction of light caused by atmospheric aerosols over a 1 km spatial resolution.

### Spatial Interpolation and Boundary Clipping

Ground stations measure air quality at discrete coordinates. Continuous spatial mapping requires mathematical interpolation to estimate values at unmonitored grid cells. Inverse Distance Weighting (IDW) estimates unmeasured locations by computing distance-weighted averages of neighboring sample points. To maintain geographic validity, continuous interpolated fields are masked against official administrative vector polygons.

## 6. System Concept

The conceptual architecture of the system follows a clear information progression from raw input ingestion to user decision support:

1. **Input Ingestion:** The system captures multi-pollutant telemetry, satellite observational proxies, and administrative boundary files.
2. **Normalization and Weighting:** Raw pollutant measurements are normalized across empirical percentile bounds to eliminate scale imbalances, then combined using domain weights and regional geographic multipliers.
3. **Regional Aggregation and Categorization:** Station data is aggregated to regional centers, ranked into a 0 to 100 percentile score, and mapped to categorical severity tiers.
4. **Spatial Interpolation:** Point observations are transformed into a regular two-dimensional scalar grid using distance-weighted algorithms and clipped to national borders.
5. **Presentation and Analytics:** The client interface renders spatial overlays, summary statistics, and ranking tables while allowing offline execution via WebAssembly.

## 7. Data Sources and Data Characteristics

The project works with structured data sources covering spatial, temporal, and pollutant dimensions across Uzbekistan.

| Data Layer                      | Source / Provenance                        | Data Type & Format     | Spatial Extent & Resolution                                       | Temporal Resolution                                      | Variables & Units                                            |
| :------------------------------ | :----------------------------------------- | :--------------------- | :---------------------------------------------------------------- | :------------------------------------------------------- | :----------------------------------------------------------- |
| **Ground Station Telemetry**    | Municipal Monitoring / Regional Model      | Tabular (CSV, JSON)    | 13 Administrative Regions (199 Districts), Point Coordinates      | Daily static records (with multi-day historical archive) | PM2.5, PM10, NO2, SO2, O3, CO, NH3, VOCs (µg/m³, mg/m³), AQI |
| **Nitrogen Dioxide (NO2)**      | Sentinel-5P NRTI / Ground IDW Fallback     | Raster (PNG Overlay)   | Bounding Box: [55.9°E, 37.1°N to 73.1°E, 45.6°N], Grid: 200 x 368 | Daily static / Runtime generated                         | Tropospheric NO2 Column (µmol/m² / µg/m³)                    |
| **Sulfur Dioxide (SO2)**        | Sentinel-5P NRTI / Ground IDW Fallback     | Raster (PNG Overlay)   | Bounding Box: [55.9°E, 37.1°N to 73.1°E, 45.6°N], Grid: 200 x 368 | Daily static / Runtime generated                         | Total SO2 Column (µmol/m² / µg/m³)                           |
| **Aerosol Optical Depth (AOD)** | MODIS MCD19A2 / Regional Gradient Model    | Raster (PNG Overlay)   | Bounding Box: [55.9°E, 37.1°N to 73.1°E, 45.6°N], Grid: 200 x 368 | Daily static / Runtime generated                         | AOD at 550 nm (dimensionless index, 0.05 to 1.5)             |
| **Composite Health Risk**       | Derived Analytical Model                   | Raster (PNG) & Tabular | National Bounding Box, 200 x 368 Grid & Regional Points           | Daily static / Runtime generated                         | Risk score (0 to 100 percentile), 5 categorical tiers        |
| **Administrative Boundaries**   | State Boundary & ADM2 District Vector Data | Vector (GeoJSON)       | National outline (ADM0) and 199 administrative districts (ADM2)   | Static Reference (EPSG:4326 WGS84)                       | Boundary polygons, district names, region P-codes            |

### Provenance and Data Realism Distinctions

The repository maintains a clear structural distinction between operational modes:

- **Static Demonstration Time Series:** The pre-staged datasets in `public/data/<YYYYMMDD>/` provide historical daily snapshots with satellite-derived overlay references and station telemetry.
- **In-Browser Synthetic Model:** Within the WebAssembly execution environment (`src/constants/defaultPipelineScript.ts`), ground station measurements and missing satellite feeds are generated deterministically using date-seeded regional baselines. This ensures full offline reproducibility without external network dependencies.

## 8. Methodology

The computational methodology consists of five discrete stages that convert raw multi-pollutant values into spatial overlays and administrative rankings.

### Stage 1: Station Generation and EPA AQI Derivation

- **Input:** Target date string (`RUN_DATE`), regional coordinate definitions (`FALLBACK_COORDS`), regional PM2.5 baseline targets (`PM25_BASELINE`), and station distribution allocations (`N_STATIONS_PER_REGION`).
- **Processing:** For each of the thirteen administrative regions, synthetic station coordinates are generated within a radius around the regional centroid. Individual pollutant values are assigned using regional baselines, normal distributions, and proportional ratios. PM2.5 concentrations are converted into standard AQI numbers using the United States Environmental Protection Agency (EPA) piecewise linear interpolation formula:

$$AQI = \frac{I_{hi} - I_{lo}}{BP_{hi} - BP_{lo}} (C - BP_{lo}) + I_{lo}$$

where $C$ is the pollutant concentration, $[BP_{lo}, BP_{hi}]$ represents the concentration breakpoint interval, and $[I_{lo}, I_{hi}]$ is the corresponding index breakpoint interval.

- **Reason:** Provides a localized multi-sensor distribution reflecting regional pollution profiles.
- **Output:** Tabular dataset containing point records with coordinates and pollutant concentrations.

### Stage 2: Empirical Normalization and Multi-Pollutant Weighting

- **Input:** Point observations for PM2.5, PM10, AQI, NO2, SO2, O3, CO, NH3, and VOCs.
- **Processing:** Each pollutant column is normalized across its 5th and 95th percentiles to avoid distortions from extreme outliers:

$$x_{norm} = \left( \frac{\text{clip}(x, P_5, P_{95}) - P_5}{P_{95} - P_5} \right) \times 100$$

A weighted average of normalized concentrations is calculated based on defined pollutant weights:

$$\text{HealthRisk}_{raw} = \frac{\sum_{i} (x_{norm, i} \cdot w_i)}{\sum_{i} w_i}$$

- **Reason:** Harmonizes disparate measurement units (µg/m³, mg/m³, AQI units) into a standard 0 to 100 scale before applying domain-specific public health weights.
- **Output:** Raw unadjusted health-risk score per station.

### Stage 3: Geographic Vulnerability Adjustment

- **Input:** Raw health-risk score and regional geographic identifiers.
- **Processing:** The system adjusts the raw score by adding a regional geographic penalty factor:

$$\text{Penalty}_{geo} = (\text{Multiplier}_{region} - 1.0) \times 20$$

$$\text{HealthRisk}_{adjusted} = \text{clip}(\text{HealthRisk}_{raw} + \text{Penalty}_{geo}, 0, 100)$$

- **Reason:** Accounts for chronic geographic and topographical vulnerability factors (such as saline dust exposure in the Aral Sea basin or thermal inversions in the Fergana Valley) that exacerbate standard pollutant exposure.
- **Output:** Regionally adjusted health-risk score.

### Stage 4: Regional Aggregation and Percentile Ranking

- **Input:** Adjusted station scores and pollutant observations grouped by administrative region.
- **Processing:** Sensor values are aggregated to regional centroids by computing arithmetic means. Regional risk scores are ranked on a percentile basis:

$$\text{Rank}_{pct} = \frac{\text{Rank}(\text{HealthRisk}_{adjusted})}{N} \times 100$$

Categorical classifications are assigned based on fixed percentile intervals:

- **Low:** 0 to 20%
- **Moderate:** >20 to 40%
- **High:** >40 to 60%
- **Very High:** >60 to 80%
- **Critical:** >80 to 100%

- **Reason:** Translates continuous raw numbers into actionable relative ranks across the thirteen administrative divisions.
- **Output:** Ranked administrative table containing thirteen regional records with categorical risk assignments.

### Stage 5: Spatial Surface Interpolation and Polygon Clipping

- **Input:** Point coordinates and corresponding scalar values (PM2.5, NO2, SO2, AOD, Health Risk), along with national boundary vectors.
- **Processing:** Point data is interpolated over a 200 x 368 regular grid using a hybrid IDW technique. A boolean mask derived from Uzbekistan's boundary polygons sets all exterior grid cells to NaN.
- **Reason:** Generates continuous raster layers while preventing spatial leakage into neighboring territories.
- **Output:** Transparent PNG raster overlays aligned to the national bounding box.

## 9. Analytical and Computational Methods

### Ground Weighting Matrix

The composite health-risk index applies empirical weights reflecting the relative toxicological significance of each parameter:

| Parameter     | Weight ($w_i$) | Percentage Contribution | Rationale                                                   |
| :------------ | :------------- | :---------------------- | :---------------------------------------------------------- |
| **PM2.5**     | 0.25           | 29.4%                   | Primary driver of cardiovascular and respiratory mortality. |
| **AQI**       | 0.15           | 17.6%                   | Standardized aggregate air quality metric.                  |
| **PM10**      | 0.10           | 11.8%                   | Coarse thoracic particulate matter.                         |
| **NO2**       | 0.10           | 11.8%                   | Marker of urban combustion and traffic density.             |
| **SO2**       | 0.08           | 9.4%                    | Industrial acid gas and coal emissions.                     |
| **O3**        | 0.07           | 8.2%                    | Photochemical oxidant causing airway inflammation.          |
| **CO**        | 0.05           | 5.9%                    | Systemic hypoxia indicator.                                 |
| **NH3**       | 0.03           | 3.5%                    | Agricultural precursor to secondary inorganic aerosols.     |
| **VOCs**      | 0.02           | 2.4%                    | Precursors to ozone and secondary organic aerosols.         |
| **Total Sum** | **0.85**       | **100.0%**              | Normalized divisor for weighted index derivation.           |

### Regional Geographic Multipliers

Regional modifiers reflect localized environmental and dispersion conditions across Uzbekistan:

| Region             | Factor Multiplier | Resulting Score Adjustment | Environmental Context                                                 |
| :----------------- | :---------------- | :------------------------- | :-------------------------------------------------------------------- |
| **Karakalpakstan** | 1.20              | +4.0 points                | Aral Sea dust storms and high salt deposition.                        |
| **Khorezm**        | 1.15              | +3.0 points                | Downwind Aral basin agricultural and dust exposure.                   |
| **Bukhara**        | 1.15              | +3.0 points                | Arid desert boundary with frequent windblown dust.                    |
| **Fergana**        | 1.10              | +2.0 points                | Dense population and topographic basin trapping emissions.            |
| **Andijan**        | 1.10              | +2.0 points                | High population density and enclosed valley geography.                |
| **Namangan**       | 1.10              | +2.0 points                | Valley geography with limited atmospheric ventilation.                |
| **Navoi**          | 1.10              | +2.0 points                | Major industrial and mineral extraction activities.                   |
| **Tashkent**       | 1.05              | +1.0 points                | Highest national concentration of vehicular and industrial emissions. |
| **Jizzakh**        | 1.05              | +1.0 points                | Transitional plains and industrial corridors.                         |
| **Kashkadarya**    | 1.05              | +1.0 points                | Hydrocarbon processing and agricultural areas.                        |
| **Samarkand**      | 1.00              | 0.0 points                 | Baseline regional reference.                                          |
| **Sirdaryo**       | 1.00              | 0.0 points                 | Baseline agricultural valley reference.                               |
| **Surkhandarya**   | 0.90              | -2.0 points                | Open southern river basin with higher dispersion rates.               |

### Hybrid Spatial Interpolation Algorithm

The system uses a four-step hybrid interpolation algorithm to generate smooth, continuous spatial fields:

1. **Bivariate Linear Surface Estimation:** Computes a piecewise linear triangular surface over the convex hull of station points using Delaunay triangulation (`scipy.interpolate.griddata(method="linear")`).
2. **Nearest-Neighbor Fill:** Unsampled regions outside the convex hull are assigned values using a nearest-neighbor fill (`griddata(method="nearest")`).
3. **Distance-Weighted Kernel Blending:** A KD-tree computes the Euclidean distance from every grid cell to the nearest observation point. A near-distance weighting factor ($w_{near}$) blends the smoothed linear grid with the smoothed nearest-neighbor grid.
4. **Gaussian Smoothing:** A final low-pass Gaussian filter pass removes boundary discontinuities, producing a continuous raster surface.

## 10. End-to-End Processing Pipeline

The full operational lifecycle of a daily dataset proceeds in a structured sequence:

1. **Acquisition & Ingestion:** The system captures multi-pollutant telemetry, satellite observational proxies, and administrative boundary files.
2. **Quality Control & Formatting:** Applies coordinate clipping within national bounds and empirical normalization.
3. **Index & Metric Computation:** Computes EPA AQI breakpoints, multi-pollutant composite weighting, and regional centroid aggregations.
4. **Spatial Interpolation & Masking:** Generates the regular 2D scalar grid with KD-Tree blending and vector polygon clipping.
5. **Artifact Export & Manifest Update:** Generates optimized overlay PNGs, station metadata JSON files, and manifest records.
6. **Client Presentation & Visual Analysis:** Renders dual-slot MapLibre WebGL overlays and interactive sortable tables.

## 11. Spatial and Geospatial Methodology

### Geographic Extent and Coordinate Reference System

All spatial data within the project uses the WGS 84 geographic coordinate reference system (EPSG:4326). The spatial domain covers the full terrestrial bounds of Uzbekistan:

- **Latitude Minimum:** 37.1° N
- **Latitude Maximum:** 45.6° N
- **Longitude Minimum:** 55.9° E
- **Longitude Maximum:** 73.1° E

### Grid Dimensions and Aspect Ratio

To maintain spatial fidelity without distortion, the internal raster generation calculates grid dimensions dynamically:

- **Grid Height ($H$):** 200 cells
- **Grid Width ($W$):** $\text{round}\left(200 \times \frac{73.1 - 55.9}{45.6 - 37.1}\right) = 368\text{ cells}$
- **Cell Spatial Resolution:** Approximately 0.0425° longitude by 0.0425° latitude (~4.7 km per grid cell).

### Vector Polygon Masking

To prevent raster data from bleeding across international frontiers, boundary vector data from `public/geojson/uzb_country.geojson` (with fallback to `uzb_districts.geojson` containing 199 ADM2 polygons) is flattened into polygon path coordinates. For every grid point $(lon_i, lat_j)$, a point-in-polygon test checks containment against exterior boundary rings and interior exclusion holes. Cells falling outside the national border are assigned NaN values, rendering them completely transparent in exported PNG overlays.

### Color Mapping Palettes

Each layer uses a specialized continuous color ramp to convey relative severity:

- **PM2.5:** 9-stop gradient transitioning from blue (low) through cyan, green, yellow, orange, to deep red (critical).
- **NO2:** 9-stop gradient from white and cyan through blue, violet, and magenta to red.
- **SO2:** 9-stop high-contrast palette from pale yellow and amber through scarlet, magenta, to deep purple.
- **AOD:** 9-stop aerosol palette from navy blue through cyan, yellow, orange, to dark red.
- **Health Risk:** 9-stop palette from blue (0th percentile) through cyan, lime, yellow, orange, red, to purple (100th percentile).

## 12. Temporal Methodology

### Daily Time Windows

The system is organized around daily temporal units (`YYYY-MM-DD`). Each date represents a discrete 24-hour analytical snapshot encompassing ground observations and satellite passes.

### Temporal Playback and Historical Exploration

The platform includes an automated time-travel engine that cycles through available dates at a configurable playback cadence (defaulting to 1500 ms per step). As users navigate through time:

- The active map layer cross-fades smoothly between daily rasters.
- Station markers dynamically adjust their radius and color based on daily PM2.5 and risk values.
- Regional ranking tables and summary metric cards update immediately to reflect the selected date.

### Pre-fetching and Caching

To maintain high responsiveness during temporal scrubbing, the system executes background prefetching:

- When a date manifest loads, metadata and station JSON payloads for all available dates are fetched asynchronously into an in-memory session cache.
- The raster overlay image for the currently active map tab is prefetched across all available dates, eliminating network latency during interactive playback.

## 13. Decision and Interpretation Layer

The system transforms multi-pollutant numbers into actionable decision categories through structured classification rules:

- **Low (0-20%):** Standard background conditions.
- **Moderate (20-40%):** Acceptable air quality.
- **High (40-60%):** Elevated risk for vulnerable groups.
- **Very High (60-80%):** Broad health impact across population.
- **Critical (80-100%):** Severe acute multi-pollutant exposure.

### Thresholds and Alerts

- **WHO 24-Hour PM2.5 Guideline (35.4 µg/m³):** Any station exceeding this threshold receives an automatic visual warning icon in the ranking table, alerting users to air quality non-compliance regardless of the composite score.
- **Critical Category Flags:** Stations falling into the top 20th percentile band (Critical) are highlighted in bold red badges across summary cards, sidebar lists, and map popups.

## 14. User Interaction With the System

The user workflow is designed for intuitive exploration across spatial, temporal, and tabular dimensions:

1. **Overview and Temporal Orientation**: Review top-level KPI cards and select target dates via calendar or scrub timeline.
2. **Spatial Exploration**: Switch between map layers, adjust opacity sliders, and pan/zoom across the MapLibre viewport.
3. **Regional Inspection**: Click regional stations to trigger camera animations and inspect detailed multi-pollutant scorecards.
4. **Tabular Analysis & Data Export**: Filter, sort across 13 columns, and export data tables to CSV or Excel.
5. **Scenario Modeling (Pipeline Studio)**: Modify algorithm parameters and run in-browser Pyodide WebAssembly models.

## 15. Outputs and Results

The system generates a coordinated set of analytical outputs for every processed daily cycle.

### 1. Spatial Raster Overlays (PNG Format)

- `overlay_health_risk.png`: Continuous national composite risk surface (0 to 100 percentile).
- `overlay_pm25.png`: Interpolated fine particulate matter distribution (µg/m³).
- `overlay_no2.png`: Tropospheric nitrogen dioxide distribution (µmol/m² or µg/m³).
- `overlay_so2.png`: Sulfur dioxide distribution (µmol/m² or µg/m³).
- `overlay_aod.png`: Aerosol optical depth surface (550 nm).

### 2. Tabular Datasets

- `health_risk_scores.csv`: 13-row regional matrix containing municipal names, coordinates, individual pollutant averages, AQI, raw risk scores, percentile ranks, and categorical tiers.
- `stations.json`: Structured JSON representation of the regional matrix used for web client rendering.

### 3. Pipeline Metadata (`pipeline_meta.json`)

Records execution provenance, target date, source declarations (ground, GEE, boundaries), processing time in seconds, station count, and score range boundaries.

### 4. Optional Land Cover Model (LULC)

The system includes an optional Land Use / Land Cover script producing classified 7-category rasters (Water, Forest, Cropland, Grassland, Shrubland, Barren Land, Built-up) alongside single-band GeoTIFF files (`lulc.tiff`) and class distribution metrics (`lulc_statistics.json`).

## 16. Validation and Reliability

The project incorporates structural sanity checks and data integrity mechanisms:

- **Empirical Value Clipping:** Individual pollutant normalizations enforce strict percentile clipping ($P_5$ to $P_{95}$) to prevent localized sensor spikes from skewing the national scale.
- **EPA AQI Breakpoint Checks:** AQI conversion uses official EPA breakpoint tables with upper-bound caps (500 AQI) to ensure standard compliance.
- **Geospatial Mask Validation:** All output rasters pass through a point-in-polygon verification stage against dissolved national boundaries, eliminating edge-effect artifacts outside Uzbekistan.
- **Data Provenance Declarations:** System metadata explicitly records whether ground telemetry and satellite layers originated from live sensors, satellite retrievals, or deterministic fallback models.

Formal ground-truth validation (such as collocated reference monitor comparisons, satellite retrieval error matrices, or epidemiological cohort validation) is not included within the repository.

## 17. Assumptions

The analytical models in the system operate under several explicit assumptions:

1. **Linear Point Interpolation:** The IDW and linear triangular interpolation methods assume that atmospheric concentrations between monitoring points vary smoothly as a function of Euclidean distance. In reality, complex terrain (such as the Chatkal and Fan mountain ranges) creates localized microclimates and sharp dispersion barriers.
2. **Regional Homogeneity:** Station observations are aggregated to regional administrative centroids, assuming that centroid averages reasonably represent population-weighted exposure across an entire province.
3. **Additive Multi-Pollutant Index:** The composite health-risk formulation assumes linear additive interactions among pollutants. Potential synergistic toxicological interactions between fine particulates and acidic gases are modeled through fixed weighting rather than non-linear biological response curves.
4. **Static Geographic Penalties:** Regional geographic multipliers are applied as fixed constants, assuming static baseline vulnerability differences rather than dynamically adjusting for seasonal dust storms or temperature inversions.
5. **Deterministic Browser Sandbox:** The Pyodide WebAssembly runtime uses date-seeded pseudo-random generators to synthesize point values when live APIs are unreachable, ensuring consistent demonstrations while trading real-time observational accuracy for offline reliability.

## 18. Technical Implementation Approach

The platform uses a modern, serverless architecture that separates data processing from high-performance client rendering:

### 1. Static Single-Page Application

The primary dashboard is built with React 19, TypeScript, and Vite. It serves pre-generated daily datasets from static directories (`/data/<YYYYMMDD>/`), eliminating backend server dependencies and database maintenance.

### 2. Dual-Slot WebGL Raster Transitions

Map rendering is powered by MapLibre GL. To ensure seamless transitions during time-travel playback and layer switching, the map uses two alternating raster image sources (`slotA` and `slotB`). When the active date or layer changes, the incoming raster loads into the inactive slot and cross-fades via opacity transitions, preventing visual flickering.

### 3. In-Browser Python Web Worker (Pyodide WASM)

For custom pipeline runs and scenario analysis, the dashboard embeds Pyodide (CPython compiled to WebAssembly) inside a dedicated background Web Worker. This worker runs NumPy, SciPy, Pandas, Matplotlib, and Shapely directly on the user's machine off the main UI thread. Generated raster overlays and CSV files are stored as in-memory blob URLs and hot-injected into the dashboard state without reloading the page.

### 4. Dynamic Code Splitting

Heavy secondary libraries (such as the SheetJS `xlsx` spreadsheet engine) are loaded via dynamic ECMAScript imports only when a user triggers an export action, keeping the initial application bundle lightweight.

## 19. Reproducibility

Reproducing the data processing and pipeline execution requires the following assets and procedures:

### Input Assets

1. **Administrative Vectors:** `uzb_country.geojson` and `uzb_districts.geojson` located in `public/geojson/`.
2. **Pipeline Script:** The baseline Python script defined in `src/constants/defaultPipelineScript.ts`.

### Execution Environment

- **Runtime:** CPython 3.11+ or Pyodide WASM runtime v0.28.3+.
- **Required Libraries:** `numpy`, `pandas`, `scipy`, `matplotlib`, `pillow`, `shapely`.

### Execution Steps

1. Set the target date string parameter `RUN_DATE` (e.g., `'2026-06-03'`).
2. Run the pipeline script. The script generates synthetic multi-station data, derives EPA AQI numbers, calculates normalized health-risk scores, performs IDW surface interpolation, applies vector boundary clipping, and writes five transparent PNG rasters, `stations.json`, `health_risk_scores.csv`, and `pipeline_meta.json` into the output directory.
3. For static deployment, stage the generated files into `public/data/<YYYYMMDD>/` using `scripts/stage_data.py` and update the date registry with `scripts/gen_manifest.py`.

## 20. Discussion

The Uzbekistan Air Quality and Health Risk system demonstrates how multi-source environmental telemetry, satellite observation concepts, and spatial modeling can be unified into an accessible decision-support platform.

By shifting from isolated single-pollutant displays to a composite, regionally weighted health-risk index, the system provides a more holistic representation of cumulative air pollution burdens. Incorporating geographical vulnerability factors acknowledges that identical pollutant concentrations can carry differing health implications depending on local environmental context, such as airborne Aral Sea salts versus urban combustion plumes.

From an architectural standpoint, the project demonstrates the viability of a serverless, client-side geospatial architecture. By pairing pre-rendered static tile datasets with an in-browser WebAssembly Python execution environment, the platform achieves instant map rendering and interactive temporal scrubbing while preserving full analytical reproducibility. Users can adjust model weights and recalculate spatial surfaces directly within their browser without requiring dedicated cloud computing infrastructure.

## 21. Conclusion

The Uzbekistan Air Quality and Health Risk Dashboard combines atmospheric science, geospatial analysis, and modern web technologies into a unified environmental intelligence system. Through multi-pollutant normalization, domain-specific weighting, regional exposure penalties, and boundary-clipped IDW interpolation, the platform transforms discrete monitoring data into continuous spatial risk fields and ranked administrative summaries across Uzbekistan's thirteen regions. The resulting architecture delivers an accessible, highly responsive platform for environmental analysis, policy evaluation, and public health risk assessment.

## 22. Technical Glossary

- **ADM0 / ADM2:** Administrative boundary levels representing national territory (ADM0) and secondary municipal districts (ADM2).
- **AOD (Aerosol Optical Depth):** A dimensionless measure of light extinction caused by atmospheric aerosols, measured at 550 nm by satellite sensors such as MODIS.
- **AQI (Air Quality Index):** A standardized piecewise indicator defined by the EPA to communicate daily air quality severity.
- **cKDTree:** A fast k-dimensional binary tree structure in SciPy used for rapid nearest-neighbor spatial queries and distance evaluations.
- **EPSG:4326:** Standard spatial reference system using the WGS 84 geographic coordinate grid (latitude and longitude in decimal degrees).
- **IDW (Inverse Distance Weighting):** A deterministic spatial interpolation technique where values at unmeasured points are calculated as weighted averages of nearby known observations.
- **LULC (Land Use / Land Cover):** Categorical classification of the Earth's terrestrial surface into distinct land cover classes (water, forest, cropland, urban, etc.).
- **MODIS (Moderate Resolution Imaging Spectroradiometer):** A key satellite sensor aboard NASA's Terra and Aqua satellites providing global atmospheric and aerosol measurements.
- **NO2 (Nitrogen Dioxide):** A toxic gaseous pollutant primarily produced by high-temperature combustion in vehicles and power plants.
- **PM2.5 / PM10:** Particulate matter with aerodynamic diameters less than 2.5 and 10 micrometers, respectively.
- **Pyodide:** A port of CPython to WebAssembly (WASM), enabling execution of Python data science stacks directly inside web browsers.
- **Sentinel-5P (TROPOMI):** A European Space Agency Earth observation satellite dedicated to high-resolution monitoring of atmospheric trace gases and air quality.
- **SO2 (Sulfur Dioxide):** A pungent gaseous air pollutant generated by fossil fuel combustion and industrial mineral smelting.
- **WHO Guideline Threshold:** Health-based air quality standards established by the World Health Organization, including the 35.4 µg/m³ 24-hour limit for PM2.5.
