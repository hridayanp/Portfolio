## 1. Abstract

Decennial censuses provide the foundational ground truth for population statistics, yet their ten-year cadence creates critical information deficits in rapidly urbanising and resource-intensive regions. In India, where the 2021 decennial enumeration was postponed, sub-national governance, disaster risk reduction, and infrastructure planning have had to rely on increasingly outdated 2011 baseline data. This case study examines the Odisha Demographic and Data Intelligence Platform, an analytical system developed to estimate, project, and explain annual district- and sub-district-level population dynamics across all 30 districts of Odisha from 2011 through 2036.

The system integrates three analytical pipelines:

1. Machine-learning regression models (CatBoost, LightGBM, Random Forest, XGBoost) trained on Census 2011 ground truth and driven by multi-sensor satellite features, including Landsat spectral indices, Land Surface Temperature, VIIRS nighttime lights, and ESRI Land Use and Land Cover products, to generate annual population estimates from 2011 to 2025.
2. District-specific log-linear growth models fitted to the recent satellite-derived series to project population forward to 2036, accompanied by dasymetric spatial disaggregation and degree of urbanisation mapping via GHS-SMOD raster layers.
3. A multi-signal land-use change detection and driver attribution pipeline operating on post-monsoon Sentinel-2 Level-2A imagery between 2016 and 2024 to identify, rank, and contextualise 150 significant transformation hotspots across the state.

Independent validation against official UNFPA Bayesian projections indicates agreement within plus or minus 5% across priority districts throughout the 2011 to 2036 series, with state-level aggregates tracking within 3.4%. Cross-validation with WorldPop gridded products and human-in-the-loop geographical audits confirms the physical plausibility of the derived spatial distributions. The platform delivers these analytical outputs via Cloud-Optimized GeoTIFFs and PMTiles in a serverless web interface, demonstrating a scalable framework for continuous demographic monitoring in data-sparse administrative environments.

## 2. Introduction

Sub-national demographic intelligence is vital for public administration, resource allocation, public health logistics, and climate vulnerability management. When demographic transitions occur rapidly due to industrialisation, mining development, infrastructure expansion, or rural distress migration, traditional decennial censuses fail to capture intercensal realities. In administrative units where demographic shifts deviate from historical trends, planning based on decade-old censuses misallocates resources and misjudges local infrastructure capacity.

Odisha presents a distinct geographic and demographic setting. Spanning 155,707 square kilometres on India's eastern seaboard, the state contains two sharply contrasting socio-economic regimes:

- The coastal metropolitan and industrial corridors (including Khordha, Cuttack, Puri, Ganjam, and Jajpur), which experience rapid urban sprawl around the Bhubaneswar-Cuttack agglomeration and the Paradip-Kalinganagar industrial corridor, while facing acute exposure to cyclonic storms and monsoon inundation.
- The interior tribal and mineral-rich highlands (including the Kalahandi-Balangir-Koraput region, Kendujhar, Sundargarh, and Mayurbhanj), characterised by dispersed rural settlements, heavy resource extraction, workforce migration, and varying levels of formal urbanisation.

Capturing these dual dynamics requires an observational system capable of continuous spatial and temporal monitoring. Grounded in open-access Earth observation data and machine-learning regressors, the Odisha platform bridges the gap between static census statistics and continuous landscape transformations, translating physical surface changes into verifiable demographic intelligence.

## 3. Problem Statement

The central problem addressed by this project is the growing divergence between actual demographic distributions and available administrative data during prolonged intercensal intervals. In the absence of a recent census, conventional governance workflows typically resort to one of two inadequate approaches:

1. Static extrapolation using historic decennial growth rates from the 2001 to 2011 intercensal period, which fails to account for non-linear economic transformations, mining corridor expansions, or decelerating fertility rates.
2. Coarse, top-down national or state projections that lack spatial disaggregation and offer no insight into where settlement expansion is physically occurring on the ground.

These approaches fail to answer three practical questions:

- How many people currently live in each administrative unit, and how has that number evolved each year since 2011?
- Where within each district is settlement expanding, stagnating, or transforming?
- What physical or economic drivers (such as coal extraction, rail corridors, metallurgical plants, or urban fringe sprawl) are driving observed landscape changes?

The platform addresses this challenge by combining satellite observation, statistical machine learning, and geospatial spatial indexing into a unified demographic intelligence pipeline.

## 4. Objectives

### Primary Objective

To construct an automated, empirically grounded data intelligence platform that provides continuous, annual district-level population estimates (2011 to 2025) and projections (2026 to 2036) for all 30 districts of Odisha, coupled with high-resolution land transformation detection and driver attribution.

### Supporting Objectives

1. Multi-Sensor Feature Extraction: Formulate annual cloud-free spectral, thermal, and nightlight composite stacks at district and sub-district granularities from Landsat 5/7/8, Sentinel-2, and VIIRS sensors.
2. Machine-Learning Estimation: Train and validate non-linear ensemble models against Census 2011 ground truth to estimate annual population counts through 2025 without propagating recursive prediction errors.
3. Trend-Preserving Trajectory Projection: Fit log-linear growth models to localized estimated historical series to generate forward demographic predictions to 2036 that remain calibrated against official benchmarks.
4. Multi-Signal Landscape Change Detection: Develop an automated change-scoring algorithm to identify and rank the top five land transformation hotspots per district between 2016 and 2024.
5. Spatial Driver Attribution: Link observed physical transitions (such as tree canopy loss or cropland conversion to built surfaces) to nearby infrastructure, industrial, or mining features using spatial proximity queries and distance-weighted rule engines.
6. Cloud-Native Geospatial Delivery: Build a responsive, browser-based delivery architecture using Cloud-Optimized GeoTIFFs (COGs) and PMTiles to support interactive analysis and automated vector PDF reporting.

## 5. Domain and Theoretical Background

The methodology relies on principles from remote sensing, spatial demography, statistical learning, and spatial indexing:

### Earth Observation Proxies for Human Settlement

Human presence alters the optical, thermal, and radiative characteristics of the Earth's surface:

- Spectral Indices: Multispectral reflectance bands capture surface characteristics. The Normalized Difference Vegetation Index (NDVI) tracks canopy density and agricultural cycles; the Normalized Difference Built-up Index (NDBI), Built-Up Index (BUI), and Urban Index (UI) isolate impervious and built structures; and the Modified Normalized Difference Water Index (MNDWI) delineates open water bodies.
- Nighttime Radiance: The Visible Infrared Imaging Radiometer Suite (VIIRS) Day/Night Band (DNB) measures nocturnal anthropogenic light emissions (500-metre resolution), serving as a proxy for electrification, economic density, and commercial activity.
- Land Surface Temperature (LST): Thermal infrared data from Landsat sensors reflects surface energy balance changes, highlighting urban heat island effects and bare ground transitions.
- Vegetation-Temperature-Light Population Index (VTLPI): A combined index designed to fuse normalized nightlight radiance, land surface temperature, and peak vegetation density into a single settlement signal.

### Spatial Demography and Dasymetric Mapping

Spatial demography deals with the spatial distribution of population attributes. In dasymetric mapping, coarse administrative population counts are disaggregated into finer spatial grids based on ancillary land-cover masks and settlement probability weights, ensuring that population is allocated only to habitable and built environments while preserving regional mass conservation.

### Degree of Urbanisation (DEGURBA)

The Degree of Urbanisation framework, established by the European Commission, OECD, and UN-HABITAT, classifies settlement structures into standard categories based on continuous population density and built-up area thresholds. The Global Human Settlement Layer Settlement Grid (GHS-SMOD) standardizes settlement hierarchies into eight classes, ranging from very low density rural land to high-density urban centres.

## 6. System Concept

The platform operates as a directed information pipeline converting multi-source raw satellite observations and tabular census statistics into structured demographic intelligence and interactive spatial layers:

1. **Ground Truth & Baseline Calibration**: Ingests Census 2011 ground truth tables and multi-spectral Landsat/VIIRS/ESRI LULC features across administrative boundaries.
2. **Satellite ML Estimation Pipeline**: Trains ensemble regression models (Random Forest, LightGBM, CatBoost) to generate annual historical demographic estimates from 2011 to 2025.
3. **Forward Prediction Modeling**: Computes district-specific growth rates with log-linear forward projections (2026 to 2036) integrated with GHS-SMOD urbanisation settlement hierarchies.
4. **Change Detection & Hotspot Analysis**: Evaluates multi-signal Sentinel-2 (2016 to 2024) land change scoring to identify and attribute 150+ priority hotspot landmarks.
5. **Spatial Packaging & Decision Delivery**: Packages multi-resolution outputs into cloud-native PMTiles and COGs for interactive in-browser map analysis and automated report generation.

At each stage, raw observation data is systematically filtered, calibrated, spatially aggregated, and verified against independent reference data.

## 7. Data Sources and Data Characteristics

The platform incorporates administrative data, satellite observations, gridded settlement products, and vector infrastructure layers:

| Dataset                          | Source Agency                                                | Native Resolution                | Temporal Span                    | Format                         | Processing Role                                                                     |
| :------------------------------- | :----------------------------------------------------------- | :------------------------------- | :------------------------------- | :----------------------------- | :---------------------------------------------------------------------------------- |
| **Primary Census Abstract 2011** | Office of the Registrar General & Census Commissioner, India | District and Sub-District tables | 2011                             | Tabular / CSV                  | Baseline ground truth for ML model calibration; base land area and urban ratios.    |
| **UNFPA Bayesian Projections**   | United Nations Population Fund (UNFPA) India                 | District and State totals        | 2011 to 2036                     | Tabular                        | Independent reference series for post-hoc validation (not used in training).        |
| **Administrative Boundaries**    | GADM v4.1 (Level 2 & Sub-district)                           | Vector Polygons                  | Contemporary snapshot            | GeoJSON / Shapefile            | Spatial analysis units for zonal statistics and vector tile generation.             |
| **WorldPop Global Projections**  | WorldPop, University of Southampton (R2025A v1)              | 1 km grid                        | 2015 to 2030 (annual)            | GeoTIFF                        | Independent cross-validation of absolute levels and spatial growth rates.           |
| **Landsat 5 / 7 / 8 Imagery**    | USGS / NASA                                                  | 30 m                             | 2011 to 2024 (annual composites) | Cloud-Optimized GeoTIFF        | Feature generation (NDVI, NDBI, MNDWI, SAVI, EVI, TVI, BUI, UI, IBI, LST).          |
| **Sentinel-2 L2A Imagery**       | European Space Agency (Copernicus)                           | 10 m (60 m working resolution)   | 2016 to 2024 (post-monsoon)      | STAC / Cloud-Optimized GeoTIFF | Multi-signal land change scoring, hotspot detection, and visual verification chips. |
| **VIIRS Day/Night Band**         | NOAA / NASA Earth Observation Group                          | 500 m                            | 2012 to 2024 (annual composites) | GeoTIFF                        | Nocturnal light radiance feature; proxy for settlement and electrification.         |
| **ESRI Land Cover**              | Impact Observatory / Esri Living Atlas                       | 10 m                             | 2017 to 2024 (annual)            | Categorical GeoTIFF            | LULC class areas for regression; built-expansion masking for change detection.      |
| **GHS-SMOD R2023A v2.0**         | European Commission Joint Research Centre (JRC)              | 1 km grid                        | 2010, 2015, 2020, 2025, 2030     | Categorical GeoTIFF            | Standard DEGURBA 8-class settlement classification rasters.                         |
| **Infrastructure Features**      | OpenStreetMap Contributors + Curated Registry                | Vector lines and points          | Current                          | Vector GeoJSON                 | Roads, railways, industrial facilities, and mining registry for driver attribution. |

### Data Categorisation

- Observed Source Data: Census 2011 tables, raw satellite multispectral and thermal bands, VIIRS radiance, OpenStreetMap geometries.
- Derived Analytical Data: Annual zonal statistics, VTLPI, robust z-normalised change-score rasters, fitted district growth rates.
- Modelled Data: Annual population estimates (2012 to 2025), log-linear forward projections (2026 to 2036), dasymetric density grids.
- Demonstration and Contextual Data: Curated landmark coordinates, district demographic summaries, and descriptive development text.

## 8. Methodology

The methodology is structured across three core computational pipelines.

### Pipeline 1: Satellite-Based Population Estimation (2011 to 2025)

#### Stage 1.1: Image Preprocessing and Composite Generation

- Input: Multi-year Landsat 5, 7, and 8 surface reflectance scenes acquired via Google Earth Engine and the Microsoft Planetary Computer STAC catalogue.
- Processing: Geometric calibration, radiometric correction, atmospheric normalization, and SLC-off gap filling for Landsat 7. Cloud masking thresholds were tightened from 10-20% down to 3-5% cloud cover per scene. Annual cloud-free median composites were produced for each calendar year from 2011 through 2024.
- Reason: Eliminates cloud contamination and phenological anomalies across Odisha's agricultural belt.
- Output: Clean annual surface reflectance raster mosaics for the entire state.
- Role: Provides consistent input data for calculating spectral and thermal indices.

#### Stage 1.2: Zonal Feature Engineering and Spatial Aggregation

- Input: Annual reflectance mosaics, Landsat thermal bands, VIIRS DNB mosaics, and ESRI LULC annual layers.
- Processing: Derived spectral indices (NDVI, NDBI, MNDWI, SAVI, EVI, TVI, BUI, UI, IBI), annual mean LST, and VIIRS radiance. Because VIIRS operational data begins in 2012, the 2012 composite was used as a proxy for the 2011 baseline. Zonal means and categorical class areas were extracted across all 30 district polygons and sub-district units in UTM Zone 44N (EPSG:32644).
- Reason: Summarises continuous physical landscape variables into tabular feature vectors matching administrative boundaries.
- Output: Structured feature tables containing yearly rows and spectral/environmental attribute columns.
- Role: Serves as the feature training matrix for regression algorithms.

#### Stage 1.3: Feature Selection and Pruning

- Input: Multi-variable feature stack cross-referenced against Census 2011 population counts.
- Processing: Pearson correlation coefficients were calculated. Built-up area (r = 0.65 to 0.70 across tiers), nighttime light intensity (r = 0.79 at district level), and cropland area exhibited strong positive correlations. Weakly correlated features (BUI at r = 0.053, UI at r = 0.12, forest and wasteland areas) were removed.
- Reason: Eliminating noisy and non-predictive variables prevents overfitting and improves model generalisation in rural environments.
- Output: Refined, high-signal feature matrices.
- Role: Enhances the stability and predictive performance of machine learning regressors.

#### Stage 1.4: Model Training and Selection

- Input: Selected feature matrix for the 2011 baseline year paired with Census 2011 counts.
- Processing: Four non-linear ensemble algorithms were trained: Random Forest, XGBoost, LightGBM, and CatBoost. Spatial cross-validation was enforced via Leave-One-Out (LOO) and gridded block-wise spatial partitioning. Models were applied to feature stacks for each subsequent year (2012 to 2025). Iterative self-training (training on previous model predictions) was evaluated and discarded due to 5-8% annual error compounding. CatBoost and LightGBM were retained as primary estimators.
- Reason: Captures non-linear relationships between satellite proxies and settlement density without spatial overfitting.
- Output: Annual population estimates for all 30 districts from 2011 through 2025.
- Role: Establishes the historical time-series baseline required for forward projection.

### Pipeline 2: District-Level Population Prediction (2026 to 2036)

#### Stage 2.1: Growth Trajectory Modelling

- Input: Estimated annual district population series (2011 to 2025) from Pipeline 1.
- Processing: Ordinary least squares regression applied to the log-transformed recent estimates for each district:

$$\ln P(d, y) = a_d + r_d \cdot y$$

The fitting window was focused on the most recent five-year period of the estimated series rather than the entire 2011-2025 span.

- Reason: Odisha's population growth is decelerating due to declining total fertility rates. A localized fitting window captures the prevailing trajectory without overestimating growth based on early-2010s dynamics.
- Output: Calibrated district-specific annual exponential growth rates ($r_d$) and base constants ($a_d$).
- Role: Provides the mathematical foundation for forward projection.

#### Stage 2.2: Forward Prediction and Regional Reconciliation

- Input: Base year estimate $P(d, 2025)$ and growth rate $r_d$.
- Processing: Population is projected geometrically for each year $y \in \{2026, \dots, 2036\}$:

$$P(d, y) = P(d, 2025) \cdot \exp\left(r_d \cdot (y - 2025)\right)$$

District projections are reconciled against state-level aggregate models to ensure internal consistency.

- Reason: Ensures individual district estimates sum correctly to the state demographic trajectory.
- Output: Complete annual population trajectories from 2011 to 2036.
- Role: Provides long-range demographic forecasts for infrastructure and policy planning.

#### Stage 2.3: Demographic Indicator Derivation

- Input: 2011 to 2036 population totals, official Census 2011 land areas, and historical urbanisation trends.
- Processing:
  - Population Density: Calculated as total population divided by Census 2011 land area in square kilometres.
  - Year-on-Year Growth: Percentage change relative to the preceding year.
  - Urban/Rural Split: The baseline Census 2011 urban percentage was advanced linearly by +0.17 percentage points per year (Odisha's observed 2001-2011 urbanisation rate) and applied to the projected annual totals:

$$U_{\text{share}}(y) = U_{\text{share}}(2011) + 0.0017 \cdot (y - 2011)$$
$$P_{\text{urban}}(d, y) = P(d, y) \cdot U_{\text{share}}(y)$$
$$P_{\text{rural}}(d, y) = P(d, y) - P_{\text{urban}}(d, y)$$

- Reason: Provides urbanisation and settlement density breakdowns aligned with administrative standards.
- Output: Tabular indicators per district and year.
- Role: Populates dashboard analytics, summary cards, and PDF profiles.

### Pipeline 3: Multi-Signal Land-Use Change Detection and Driver Attribution (2016 to 2024)

#### Stage 3.1: Post-Monsoon Image Acquisition and Median Compositing

- Input: Sentinel-2 Level-2A surface reflectance granules covering Odisha for 2016 and 2024.
- Processing: STAC queries filtered to post-monsoon months (October through February) with cloud cover under 10%. Scene Classification Layer (SCL) masks removed clouds, shadows, and water boundaries. Per-pixel median compositing produced cloud-free 60-metre working grids for district-wide screening.
- Reason: The post-monsoon dry season provides maximum cloud-free surface visibility while minimizing phenological noise across agricultural paddies.
- Output: Consistent 2016 and 2024 surface reflectance mosaics.
- Role: Base rasters for spectral differencing and change quantification.

#### Stage 3.2: Multi-Spectral Change Scoring and Expansion Masking

- Input: Paired 2016 and 2024 multispectral composites, ESRI Land Cover 2016 and 2024 rasters.
- Processing: Computed spectral index deltas: $\Delta\text{NDVI}$, $\Delta\text{NDBI}$, $\Delta\text{NDWI}$, $\Delta\text{MNDWI}$, and $\Delta\text{BSI}$ (Bare Soil Index). Differenced rasters were converted to directional magnitudes (vegetation loss, built gain, bare soil gain). Signals were robustly normalised using median and median absolute deviation (MAD). A built-expansion mask was generated from ESRI Land Cover transitions. A multi-signal change index ($S_{\text{change}}$) was computed using linear weighting:

$$S_{\text{change}} = 0.40 \cdot M_{\text{built\_expansion}} + 0.35 \cdot \tilde{\Delta}\text{NDBI} + 0.15 \cdot \tilde{\Delta}\text{BSI} + 0.10 \cdot (-\tilde{\Delta}\text{NDVI})$$

A dynamic water mask was applied to exclude reservoir drawdown and water body fluctuations.

- Reason: Isolates genuine anthropogenic transformations from seasonal moisture or phenological variations.
- Output: Continuous change-score rasters across all 30 districts.
- Role: Defines the search space for identifying significant landscape transformation hotspots.

#### Stage 3.3: Hotspot Identification and Spatial Suppression

- Input: Continuous change-score rasters.
- Processing: Aggregated change scores into a 1-kilometre spatial grid. Applied non-maximum suppression with a 3-kilometre minimum distance constraint to extract the top five distinct transformation centroids per district (150 total statewide). Centroids were then extracted at native 10-metre resolution for high-fidelity visual analysis.
- Reason: Prevents spatial clustering and ensures selected hotspots represent distinct geographic phenomena across the district.
- Output: 150 geographically distinct hotspot coordinates and 10-metre true-colour image chips.
- Role: Supplies the visual and spatial assets for the platform's change exploration modules.

#### Stage 3.4: Contextual Driver Attribution and Classification

- Input: Hotspot coordinates, ESRI LULC transition matrices, OpenStreetMap infrastructure vectors, and a curated registry of 250 state industrial and mining facilities.
- Processing: Extracted dominant land-cover transition pathways (such as Cropland to Built, or Forest to Bare Ground) within a 1-kilometre buffer. Spatial distance queries matched nearby drivers (coal mines, steel plants, railway stations, highways, ports) within a 10-kilometre radius. A rule-based classifier assigned settlement tags (residential, industrial, mining-adjacent, transport, mixed, or vegetation). Hotspots with zero new built-up area were snapped to vegetation to prevent deforestation from being misclassified as settlement growth.
- Reason: Provides narrative context and causal attribution for observed physical landscape changes.
- Output: Structured attribution records containing transition metrics, nearest infrastructure drivers, confidence ratings, and descriptive narratives.
- Role: Powers the platform's interactive change explorer and PDF profile reports.

## 9. Analytical and Computational Methods

### 1. Robust Normalization for Spectral Change Detection

To combine disparate spectral indices without sensitivity to extreme outliers, variables are normalised using median and Median Absolute Deviation (MAD):

$$\tilde{x} = \frac{x - \text{median}(x)}{\text{MAD}(x) + \epsilon}$$

Where:
$$\text{MAD}(x) = \text{median}\left(|x - \text{median}(x)|\right)$$

This robust transformation scales directional deltas ($\Delta\text{NDBI}$, $\Delta\text{BSI}$, $-\Delta\text{NDVI}$) into comparable distributions, ensuring multi-signal index combination remains stable across diverse ecological zones.

### 2. Log-Linear Trajectory Estimation

District-level forward projection relies on log-linear growth fitting over recent estimated time windows:

$$\ln P(d, y) = a_d + r_d \cdot y$$

Parameters $a_d$ (intercept) and $r_d$ (instantaneous growth rate) are solved via ordinary least squares:

$$r_d = \frac{\sum_{i=1}^n (y_i - \bar{y})(\ln P_i - \overline{\ln P})}{\sum_{i=1}^n (y_i - \bar{y})^2}$$

$$a_d = \overline{\ln P} - r_d \cdot \bar{y}$$

This formulation enforces stable geometric growth without risk of erratic polynomial oscillations over multi-year projections.

### 3. Non-Maximum Suppression for Hotspot Extraction

To prevent multiple redundant detections within the same industrial or urban complex, spatial candidate centroids are filtered using spatial non-maximum suppression:

Given candidate coordinates $C = \{c_1, c_2, \dots, c_m\}$ ranked by score $S(c_i)$, a point $c_i$ is accepted if:

$$\text{dist}(c_i, c_j) \ge d_{\text{min}} \quad \forall c_j \in C_{\text{selected}}$$

Where $d_{\text{min}} = 3.0\text{ km}$. This guarantees that the five hotspots extracted per district represent distinct spatial developments.

## 10. End-to-End Processing Pipeline

The end-to-end data processing lifecycle is structured as follows:

1. **Raw Data Ingestion**: Census 2011 Primary Abstract (tabular), Landsat 5/7/8 & Sentinel-2 L2A (STAC/GEE APIs), VIIRS Nighttime Radiance & ESRI Land Cover (GeoTIFF), and OpenStreetMap & Industrial Registry (vector).
2. **Preprocessing & Feature Stack Generation**: Cloud masking (3-5% threshold) & SLC-off gap correction, seasonal median compositing (Oct-Feb window), and zonal extraction in UTM Zone 44N (30 districts + sub-districts).
3. **Pipeline 1: Historical Estimation (2011-2025)**: Feature correlation pruning (NDBI, nightlights, cropland retained), supervised regression (CatBoost / LightGBM), and dasymetric redistribution over settlement masks.
4. **Pipeline 2: Demographic Prediction (2026-2036)**: Log-linear growth fitting on recent estimated series, state aggregate reconciliation, and demographic indicator derivation (density, YoY growth, urban/rural).
5. **Pipeline 3: Change Detection & Attribution (2016-2024)**: Multi-spectral delta scoring (NDBI, NDVI, BSI, built mask), 1 km spatial aggregation + 3 km non-maximum suppression, and proximity attribution against infrastructure and LULC transitions.
6. **Optimization & Client Delivery**: Vector data conversion to PMTiles (district & sub-district), categorical GHS-SMOD raster encoding to COGs (nearest-neighbor), and browser rendering via MapLibre GL + dynamic PDF generation.

## 11. Spatial and Geospatial Methodology

### Coordinate Reference Systems and Projections

- Storage and Metadata: EPSG:4326 (WGS84 geographic coordinates) is used for GeoJSON structures, bounding boxes, and tabular coordinate attributes.
- Spatial Analysis and Calculations: UTM Zone 44N (EPSG:32644) is used for geometric area calculations, buffering, non-maximum suppression, and distance measurements. This ensures metric distance preservation across Odisha's spatial extent.
- Web Map Visualization: EPSG:3857 (Web Mercator) is used for raster tiles and vector map canvas rendering.

### Cloud-Optimized GeoTIFFs (COGs) and PMTiles Architecture

Geospatial data delivery uses a serverless cloud-native architecture:

- GHS-SMOD Settlement Rasters: Multi-epoch DEGURBA rasters (2010 to 2030) are formatted as Cloud-Optimized GeoTIFFs with internal overviews. Web clients fetch only the required spatial extents and zoom levels via HTTP Range requests. Nearest-neighbour resampling is strictly enforced during reprojection to preserve categorical integer class assignments.
- Population Vector PMTiles: District and sub-district polygons containing multi-year population counts, densities, and growth rates are compiled into single-file PMTiles archives. The browser decodes vector tiles directly using MapLibre GL protocols, eliminating backend GIS server overhead.

## 12. Temporal Methodology

The platform operates across four distinct temporal frames:

- **Historical ML Estimation (2011-2025)**: Landsat + VIIRS + Census 2011 calibration and yearly regression estimates.
- **Sentinel-2 Change Analysis (2016-2024)**: Multi-spectral land-use change detection across post-monsoon dry season acquisitions.
- **Forward Prediction (2026-2036)**: District-level log-linear extrapolation and state aggregate reconciliation.

Additional temporal specifications include:

- Calibration Base Year (2011): Anchored directly to official Primary Census Abstract tables.
- Satellite-Estimated Period (2012 to 2025): Annual population series estimated via CatBoost and LightGBM models driven by annual satellite composites.
- Forward Prediction Window (2026 to 2036): District-level log-linear extrapolation based on fitted recent growth rates.
- Land-Use Change Detection Window (2016 to 2024): An eight-year span selected because Sentinel-2 Level-2A surface reflectance data achieved global consistency after late 2015, capturing long-term land transformation while avoiding single-year agricultural anomalies.
- Settlement Classification Epochs: GHS-SMOD categorical rasters processed at five-year intervals (2010, 2015, 2020, 2025, 2030).

## 13. Decision and Interpretation Layer

The platform translates raw Earth observations and statistical models into structured decision-support layers:

1. **Raw Observations**: Landsat / Sentinel-2 surface reflectance, VIIRS nighttime radiance, and Census counts.
2. **Derived Indicators**: NDBI, NDVI, BSI, VTLPI, robust change scores, and exponential growth rates ($r_d$).
3. **Classified Attributes**: DEGURBA 8-class urbanisation grids, urban / rural population proportions, and settlement tags (residential, industrial, mining, transport).
4. **Decision-Support Outputs**: District density & growth trajectories, hotspot attribution & pre/post visual comparisons, and automated PDF policy briefs.

- Directly Observed: Census 2011 baseline counts, raw multispectral reflectance bands, geographic boundary coordinates.
- Analytically Derived: Annual spectral indices, zonal feature means, robust normalised change deltas.
- Modelled & Extrapolated: Annual population estimates (2012-2025) and log-linear forecasts (2026-2036).
- Rule-Classified: Degree of urbanisation categories, urban/rural demographic splits, and hotspot driver attribution tags.

## 14. User Interaction With the System

Users navigate the platform through an interconnected demographic and geospatial exploration workflow:

1. Statewide Demographic Overview: Users begin with a macro-level dashboard displaying statewide population trends, total demographic growth curves (2011 to 2036), urbanisation trajectories, and interactive thematic maps of population density.
2. District Selection and Analytical Deep-Dive: Selecting an individual district filters demographic cards, showing historical trajectories, annual growth rates, urban-rural distributions, and age-sex structures.
3. Multi-Layer Geospatial Comparison: Users can toggle between vector choropleths, Cloud-Optimized GeoTIFF raster layers, GHS-SMOD urbanisation classes, and quarterly LULC maps.
4. "What / How / Why" Landscape Change Exploration: For any selected district, users can inspect the top five detected transformation hotspots, viewing true-colour before/after Sentinel-2 image pairs, transition matrices (such as Forest to Bare Ground), and identified infrastructure drivers.
5. Automated Publication-Grade PDF Reporting: Users can generate a comprehensive vector PDF district profile containing executive summaries, growth charts, raster snapshots, and hotspot analyses.

## 15. Outputs and Results

The system produces structured analytical outputs across multiple formats:

- Annual District Demographic Series: Tabular time-series of total, urban, and rural populations and densities for all 30 districts from 2011 to 2036.
- 150 Attributed Change Hotspots: High-resolution true-colour image pairs, spatial context maps, LULC transition summaries, and driver attribution records across the state.
- Cloud-Optimized GeoTIFF Rasters: GHS-SMOD settlement classification grids spanning 2010 to 2030 at 1-kilometre resolution.
- Vector Tile Archives: PMTiles packaging district and sub-district boundaries and multi-year demographic indicators.
- Automated Vector PDF Profiles: Publication-quality district documentation generated dynamically in the browser.

These outputs represent modelled estimations, projected trajectories, and spatial change indicators. They provide empirical decision support rather than formal enumeration.

## 16. Validation and Reliability

Validation protocols were integrated across all stages of model development:

### 1. Statistical Evaluation of Machine Learning Estimates

Ensemble regression models were evaluated using Leave-One-Out (LOO) cross-validation and gridded block-wise spatial cross-validation against Census 2011 ground truth. In back-testing against projected 2021 checkpoints:

- Baseline models exhibited limited temporal transfer (Random Forest $R^2 = 0.40$).
- Tightening cloud masking (3-5% threshold) and feature selection improved performance, lifting CatBoost to $R^2 = 0.91$ under sub-district LOO validation, with Mean Absolute Percentage Error (MAPE) stabilising between 13% and 16%.
- Year-by-year historical back-tests (2012 to 2020) maintained $R^2$ values between 0.77 and 0.92.

### 2. Independent Cross-Validation Against UNFPA Official Projections

The modelled demographic series (2011 to 2036) was evaluated against official UNFPA population projections derived via Bayesian cohort methods:

- Priority industrial and metropolitan districts (such as Khordha and Cuttack) track within plus or minus 5% of official figures across all projected years.
- State-level aggregate population tracks within 3.4% of official projections throughout the forecast window.
- The platform exhibits a slightly conservative implied compound annual growth rate (~0.69% per year versus ~0.81% in UNFPA tables), reflecting differences between empirical physical settlement proxies and demographic fertility-decline assumptions.

### 3. Comparison with Gridded Population Products

District-year aggregates were cross-checked against the WorldPop Global 2015 to 2030 constrained projection product (R2025A), confirming consistent spatial distribution and growth directions.

### 4. Human-in-the-Loop Hotspot Validation

An expert review of detected change hotspots across a multi-district sample identified and corrected initial classification errors:

- Establishing a rule snapping zero-built hotspots to vegetation prevented canopy loss in mining belts from being misclassified as settlement growth.
- Refining driver proximity voting reduced hotspot classification errors from 8/40 to 0/40 in audited evaluation sets.

## 17. Assumptions

The analytical pipeline incorporates several methodological assumptions:

- Census 2011 Ground Truth Anchor: Census 2011 is assumed to represent accurate baseline counts. Because 2021 census data was unavailable, all subsequent estimates rely on physical proxies and statistical models.
- Uniform Annual Urbanisation Shift: In the absence of annual sub-district migration data, the urban share is advanced at a uniform statewide historical rate of +0.17 percentage points per year, which may underestimate growth in rapidly expanding urban centres while overestimating it in remote rural districts.
- Sensor Consistency and Cloud Filtering: Annual and seasonal median composites are assumed to adequately remove cloud and atmospheric noise.
- Land Surface Physicality: Spectral built-up gains and nightlight radiance increases are assumed to correlate positively with residential and economic settlement intensity.
- Stability of Administrative Boundaries: District boundaries from GADM v4.1 are treated as stable across the 2011 to 2036 time frame.

## 18. Technical Implementation Approach

The system uses a modern, serverless cloud architecture designed for high performance:

- Data Preprocessing and Feature Pipelines: Python scripts using `geopandas`, `rasterio`, `rioxarray`, `xarray`, `scikit-learn`, `LightGBM`, and `CatBoost` executed against Google Earth Engine and the Microsoft Planetary Computer STAC catalogue.
- Geospatial Layer Packaging: Static rasters compiled into Cloud-Optimized GeoTIFFs using GDAL; vector polygons compiled into single-file PMTiles archives.
- Web Client and Map Rendering: React and TypeScript application utilising MapLibre GL for client-side vector and raster decoding via `@geomatico/maplibre-cog-protocol` and `pmtiles`.
- Automated Vector Document Generation: District profile reports rendered client-side into true vector PDFs using `@react-pdf/renderer`.

## 19. Reproducibility

Reproducibility is maintained through structured configuration and open data assets:

- Open Data Standards: All imagery (Landsat, Sentinel-2, VIIRS) and reference products (GHS-SMOD, WorldPop, ESRI Land Cover) are publicly accessible via STAC catalogues and public repositories.
- Deterministic Processing: Processing workflows use fixed random seeds, standard spatial bounds, and reproducible median compositing algorithms.
- Configurable Parameterization: Boundary shapefiles, baseline census tables, and regression parameters are stored in modular configuration dictionaries, allowing the methodology to be adapted to other states or regions.

## 20. Discussion

The Odisha Demographic and Data Intelligence Platform demonstrates the viability of using open Earth observation data and machine learning to address intercensal demographic data gaps. By combining statistical population estimation with physical change detection, the platform provides actionable insights into both the magnitude and spatial distribution of population growth.

The system's three-pipeline architecture balances statistical stability with spatial detail:

- Pipeline 1 establishes an empirically calibrated historical foundation anchored to census ground truth.
- Pipeline 2 projects local demographic growth forward without the volatility of unconstrained high-order curves.
- Pipeline 3 grounds the aggregate population figures in observable surface changes, identifying specific industrial, transport, and mining developments driving local settlement patterns.

This combined approach provides public administrators, spatial planners, and humanitarian agencies with a practical tool for monitoring demographic transitions and prioritizing infrastructure investments during extended intercensal periods.

## 21. Conclusion

The Odisha Demographic and Data Intelligence Platform addresses the challenge of governance in data-sparse intercensal periods by integrating satellite remote sensing, ensemble machine learning, and cloud-native geospatial streaming. By fusing Landsat, Sentinel-2, VIIRS, and ESRI Land Cover observations with Census 2011 ground truth, the platform delivers continuous annual population estimates and projections from 2011 to 2036 across all 30 districts of Odisha.

Its multi-signal change detection pipeline contextualises demographic numbers by identifying and attributing 150 significant land transformation hotspots across the state. Independent validation against official UNFPA projections and gridded reference products confirms the reliability of the system. The platform illustrates how satellite observations and machine learning can modernize demographic monitoring and support responsive, evidence-based planning.

## 22. Technical Glossary

- **BSI (Bare Soil Index)**: A spectral index combining blue, red, near-infrared, and shortwave-infrared bands to differentiate bare soil and cleared land from built structures and vegetation.
- **CAGR (Compound Annual Growth Rate)**: The annualized geometric rate of population growth over a specified multi-year period.
- **COG (Cloud-Optimized GeoTIFF)**: A GeoTIFF file structured with internal tiling and overviews to enable efficient HTTP Range requests, allowing clients to stream only the spatial extent and zoom level required for display.
- **CRS (Coordinate Reference System)**: A coordinate-based system used to locate geographical entities on the Earth's surface (such as EPSG:4326 for geographic WGS84 and EPSG:32644 for UTM Zone 44N).
- **Dasymetric Disaggregation**: A spatial statistical technique that subdivides coarse aggregate administrative population data into smaller spatial units based on ancillary land-cover and settlement masks.
- **DEGURBA (Degree of Urbanisation)**: A standardised classification methodology classifying administrative and spatial units into urban centres, urban clusters, or rural areas based on population density and settlement size.
- **EVI (Enhanced Vegetation Index)**: An optimized vegetation index designed to enhance canopy signal sensitivity in high biomass regions while reducing atmospheric and soil background influences.
- **GHS-SMOD**: The European Commission Global Human Settlement Layer Settlement Grid, which categorises settlement types into an 8-class hierarchy using DEGURBA principles.
- **LST (Land Surface Temperature)**: The radiative skin temperature of the land surface derived from satellite thermal infrared sensors.
- **LULC (Land Use and Land Cover)**: The physical classification of surface cover (vegetation, water, bare ground) and anthropogenic use (built structures, agricultural fields).
- **MAD (Median Absolute Deviation)**: A robust measure of statistical dispersion, calculated as the median of the absolute deviations from the data's median.
- **MNDWI (Modified Normalized Difference Water Index)**: A spectral water index that uses green and shortwave-infrared bands to suppress built-up land noise and delineate open water bodies.
- **NDBI (Normalized Difference Built-up Index)**: A spectral index that uses shortwave-infrared and near-infrared bands to highlight impervious surfaces and built infrastructure.
- **NDVI (Normalized Difference Vegetation Index)**: A widely used spectral index comparing red and near-infrared reflectance to assess vegetation vigor and canopy cover.
- **PMTiles**: A single-file archive format for pyramid tile datasets, enabling serverless, cloud-hosted vector and raster map streaming via standard HTTP requests.
- **SAVI (Soil Adjusted Vegetation Index)**: A vegetation index that incorporates a soil-brightness correction factor to reduce background soil influences in sparsely vegetated environments.
- **STAC (SpatioTemporal Asset Catalog)**: A standardized specification for searching, querying, and accessing geospatial asset metadata across distributed cloud repositories.
- **VIIRS DNB (Day/Night Band)**: A nocturnal sensor on the Suomi-NPP and NOAA-20 satellites that measures low-light visible and near-infrared emissions, used to map nighttime lighting and human activity.
- **VTLPI (Vegetation-Temperature-Light Population Index)**: A multi-sensor index fusing normalized nighttime light radiance, land surface temperature, and peak vegetation density into a proxy for settlement intensity.
- **Zonal Statistics**: The calculation of summary statistics (such as mean, median, or sum) of raster cell values within defined vector polygon boundaries.
