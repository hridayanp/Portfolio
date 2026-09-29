## 1. Abstract

Climate variability and environmental stress pose persistent risks to agricultural productivity, food security, and rural livelihoods across India. The Data in Climate Resilient Agriculture (DiCRA) platform is a digital public good developed in collaboration with the United Nations Development Programme (UNDP), the Government of Telangana, NABARD, ICRISAT, and academic research institutions. DiCRA addresses the challenge of fragmented, high-volume Earth observation and socioeconomic datasets by integrating them into an interactive geospatial analytics system.

The platform brings together satellite-derived remote sensing indices, meteorological reanalysis, environmental monitoring, agricultural land use classifications, infrastructure locations, and Data Powered Positive Deviance (DPPD) indicators across 36 Indian states and union territories. Data is delivered through Cloud Optimized GeoTIFFs (COGs) and PMTiles vector tile archives. This architecture enables multi-scale spatial exploration, dynamic client-side raster color ramping, vector-based administrative boundary analysis at district and sub-district (mandal) levels, user-defined custom polygon zonal statistics, and synchronized split-screen temporal and layer comparisons.

Analytical outputs include multi-year time-series trends, administrative rankings, area percentage distributions, and point-level environmental metrics. The system translates multi-source geospatial observations into structured, decision-relevant evidence for agricultural planners, policy researchers, and district administrators without requiring high-performance local computing infrastructure.

## 2. Introduction

Agriculture in South Asia is exposed to shifting monsoon patterns, increasing heat stress, erratic rainfall distribution, declining groundwater tables, and soil degradation. Smallholder farmers, who make up the majority of the agricultural workforce in India, have limited financial buffers to absorb crop loss driven by weather extremes and pest outbreaks. At the same time, regional and local agricultural planning often relies on delayed statistical reporting, aggregated seasonal summaries, and isolated ground surveys that lack spatial granularity.

Over the past two decades, Earth observation systems and climate models have expanded the availability of high-resolution environmental data. Satellite constellations such as NASA Terra/Aqua (MODIS), ESA Copernicus Sentinel-2, Sentinel-5P, and NASA SMAP produce continuous observations of photosynthetic vigor, surface temperature, atmospheric trace gases, and soil moisture. Parallel initiatives such as the ECMWF ERA5-Land reanalysis provide multi-decadal meteorological records, while projects like SoilGrids and WorldPop map pedological and demographic variables.

Despite the public availability of these datasets, practical utilization by regional policymakers, agronomists, and local administrators has been hindered by significant technical barriers. Raw Earth observation files are distributed across disparate portals in specialized binary formats (NetCDF, HDF, raw GeoTIFF) requiring high bandwidth, specialized Geographic Information System (GIS) software, and data engineering expertise. Furthermore, raw physical observations (such as radiative temperature in Kelvin or spectral reflectance ratios) do not immediately convey agronomic meaning without contextual baselines, administrative aggregation, and historical comparison.

DiCRA is designed as an open-access geospatial intelligence system that bridges raw satellite data and practical regional analysis. By standardizing diverse remote sensing, meteorological, socioeconomic, and infrastructure layers into optimized cloud formats, the platform provides immediate spatial and temporal querying capabilities across all administrative tiers in India.

## 3. Problem Statement

Agricultural decision-makers and climate resilience planners operate under three fundamental information constraints:

1. **Spatial and Formats Fragmentation**: Relevant agricultural data is siloed across independent scientific domains. Vegetation monitoring sits in optical satellite archives, meteorological records reside in global climate repositories, soil carbon maps exist in pedological databases, and infrastructure assets (such as state warehouses and cold storage facilities) exist in local administrative registries. Combining these layers typically requires manual GIS workflows that cannot scale to daily operational decisions.

2. **Temporal Context and Anomaly Detection**: An isolated environmental measurement (for example, a single-day NDVI or soil moisture value) provides little actionable guidance without historical context. Decision-makers need to know whether the observed value represents normal seasonal behavior, acute crop stress, or positive deviance where certain administrative units outperform regional benchmarks under identical weather conditions.

3. **Scale Mismatch in Decision Units**: Scientific satellite rasters are published on regular geometric grids (such as 250 m, 500 m, 1 km, or 9 km pixels), whereas governance interventions, financial resource allocations, and relief programs are executed along administrative boundaries (districts, mandals, blocks, gram panchayats) or specific farm boundaries. Computing zonal statistics across these irregular boundaries on demand is computationally intensive.

The primary problem addressed by DiCRA is the absence of a unified, lightweight system capable of dynamically aggregating multi-source Earth observation records, performing spatial and temporal querying across standard administrative boundaries and arbitrary user-drawn geometries, and presenting comparative climate resilience indicators in an interpretable format.

## 4. Objectives

### Primary Objective

The central objective of the DiCRA platform is to provide an accessible, browser-based geospatial system that integrates multi-source Earth observation, meteorological, socioeconomic, and agricultural datasets into unified spatial indicators and time-series analytics, supporting evidence-based planning for climate-resilient agriculture across India.

### Supporting Objectives

1. **Multi-Scale Spatial Processing**: Enable seamless switching between pixel-level raster exploration, vector-aggregated administrative evaluations (district and mandal levels), and user-drawn custom geometry zonal calculations.
2. **Standardization of Cloud-Native Geospatial Data**: Utilize Cloud Optimized GeoTIFF (COG) HTTP range requests and PMTiles vector archive streaming to eliminate server-heavy GIS rendering pipelines and support low-latency client visualization.
3. **Data Powered Positive Deviance (DPPD) Integration**: Implement analytical models that identify regions and communities demonstrating superior resilience over multi-year periods (for instance, lower crop residue burning, enhanced soil carbon retention, or stable vegetation indices) to inform targeted policy interventions.
4. **Comparative Spatiotemporal Analysis**: Provide a dual-viewport split-screen visualizer with dynamic divider curtain and linked camera navigation to evaluate two distinct layers or two distinct historical time steps simultaneously.
5. **Multi-State Extensibility**: Establish a standardized configuration architecture that covers all 36 Indian states and union territories, complete with localized coordinate bounds, center points, administrative shapefiles, and parameter mappings.

## 5. Domain and Theoretical Background

The scientific and analytical framework of DiCRA rests upon several interconnected concepts in remote sensing, agro-meteorology, spatial statistics, and positive deviance modeling.

### Optical Vegetation and Canopy Water Indices

Vegetation monitoring from space relies on the differential absorption and reflectance of solar radiation by plant canopies:

- **Normalized Difference Vegetation Index (NDVI)**: Chlorophyll absorbs red light (approx. 0.66 micrometers) for photosynthesis, while the mesophyll cell structure strongly scatters near-infrared (NIR) radiation (approx. 0.86 micrometers). The normalized ratio indicates relative green biomass, canopy density, and photosynthetic vigor.
- **Normalized Difference Water Index (NDWI)**: NDWI uses the NIR band and a shortwave infrared (SWIR, approx. 1.24 to 2.1 micrometers) band. Because SWIR reflectance is inversely related to liquid water absorption inside the leaf internal structure, NDWI monitors canopy moisture stress and open water bodies.
- **Leaf Area Index (LAI)**: A dimensionless biophysical ratio defining the one-sided green leaf area per unit ground surface area (m²/m²). LAI directly controls radiation interception, evapotranspiration, and photosynthetic carbon assimilation.

### Land Surface and Atmospheric Thermodynamics

- **Land Surface Temperature (LST)**: Derived from thermal infrared radiometry (such as MODIS MOD11A1), LST measures the radiometric surface skin temperature of the ground, vegetation, and built structures. It reflects the surface energy balance, sensible heat flux, and evaporative cooling.
- **Two-Meter Air Temperature and Total Precipitation**: Sourced from atmospheric reanalysis models (such as ERA5-Land), these variables describe continuous meteorological forcing. Total precipitation accounts for large-scale and convective atmospheric moisture fluxes deposited over monthly intervals.

### Atmospheric Chemistry and Agricultural Burning

- **Particulate Matter (PM2.5) and Nitrogen Dioxide (NO2)**: Sourced from the NASA GEOS composition forecast modeling system (GEOS-CF) and Copernicus Sentinel-5P TROPOMI tropospheric column observations. In agricultural landscapes, surges in tropospheric NO2 and surface PM2.5 frequently align with seasonal stubble burning cycles following paddy and wheat harvests.
- **Fire Radiative Power (FRP) and Active Fire Detection**: Thermal anomaly algorithms (such as MODIS MOD14/MYD14 and VIIRS active fire products) detect active combustion pixels and estimate the instantaneous radiative thermal energy output in megawatts, providing both spatial coordinates and fire intensity metrics.

### Soil and Hydrological Variables

- **Volumetric Soil Moisture (SOILM)**: Measured through microwave radiometry (such as NASA SMAP L-Band), capturing water volume within the top 5 cm of unsaturated soil pores. Soil moisture is a critical indicator of seedbed viability, crop water availability, and incipient drought.
- **Soil Organic Carbon (SOC)**: High-resolution pedometric machine-learning predictions (SoilGrids250m) estimating organic carbon mass fractions (dg/kg) across soil depths, directly linked to soil structure, cation exchange capacity, water-holding retention, and long-term carbon sequestration.

### Data Powered Positive Deviance (DPPD)

Positive deviance is an analytical methodology that identifies outliers within a population who achieve significantly better outcomes than their peers despite facing identical resource constraints and environmental stressors.

In DiCRA, DPPD uses Seasonal-Trend decomposition using LOESS (STL) and robust regression slope analysis across longitudinal satellite time series (2016 to present). By decomposing monthly observations into seasonal cycles, long-term trends, and residual anomalies, the system isolates true structural behavioral change from recurring seasonal variations. For example, a mandal exhibiting a negative DPPD fire trend score represents a positive deviant that has successfully curtailed crop residue burning relative to neighboring mandals under similar agro-climatic conditions.

## 6. System Concept

The conceptual architecture of DiCRA is structured as a sequential pipeline that ingests Earth observation data and transforms it into spatial representations and decision support metrics:

### Stage 1: Data Ingestion and Cataloging

Multi-sensor Earth observation datasets, global meteorological reanalysis grids, gridded demographic models, and state infrastructure databases are collected on recurring schedules.

### Stage 2: Processing and Cloud Optimization

Raw multi-band rasters are converted into tiled, pyramidal Cloud Optimized GeoTIFFs (COGs). Administrative boundary polygon datasets (districts, sub-districts/mandals) are combined with pre-computed summary statistics (mean, median, min, max, DPPD slope scores, categorical histograms) and packed into single-file vector tile archives (PMTiles).

### Stage 3: Dynamic Data Serving and Cryptographic Verification

An API layer manages catalog queries, available dates, and secure signed endpoints. API communication uses JSON Object Signing and Encryption (JOSE / JWE) tokens to ensure payload integrity.

### Stage 4: Browser-Based Execution and Spatial Filtering

The client application dynamically requests only the required spatial tiles using HTTP GET byte-range requests. Depending on user selection, the client runs vector attribute styling, raster pixel interpolation, or spatial geometry operations.

### Stage 5: Analytical Interpretation

The client displays choropleths, pixel inspectors, dynamic legends, multi-year trend line charts, and categorical area breakdowns.

## 7. Data Sources and Data Characteristics

The platform incorporates seventeen distinct primary layers, categorized into thematic groups. The table below outlines their provenances, spatial characteristics, resolutions, and units as established directly in the project configuration.

| Thematic Category     | Layer Identifier                       | Display Name                           | Underlying Source / Platform                  | Spatial Resolution | Temporal Window / Frequency              | Units / Data Format                                    | Data Role                            |
| :-------------------- | :------------------------------------- | :------------------------------------- | :-------------------------------------------- | :----------------- | :--------------------------------------- | :----------------------------------------------------- | :----------------------------------- |
| **Vegetation**        | `NDVI`                                 | Normalized Difference Vegetation Index | MODIS (MOD13Q1 v061 via LP DAAC / GEE)        | 250 m              | 16-day composite (Historical multi-year) | Unitless ratio ([-1, 1]) / COG & PMTiles               | Direct biophysical observation       |
| **Vegetation**        | `LAI`                                  | Leaf Area Index                        | MODIS (MOD15A2H v061 via LP DAAC / GEE)       | 500 m              | 8-day composite                          | m²/m² ([0, 10]) / COG & PMTiles                        | Direct biophysical observation       |
| **Vegetation**        | `NDWI`                                 | Normalized Difference Water Index      | MODIS (MOD09A1 v061 / MOD09GA)                | 500 m              | 8-day composite                          | Unitless ratio ([-1, 1]) / COG & PMTiles               | Canopy water observation             |
| **Crop**              | `crop_intensity`                       | Crop Intensity                         | ICRISAT / Landsat & MODIS Time Series         | 250 m              | Annual                                   | Categorical (Single, Double, Triple, Continuous) / COG | Derived classification               |
| **Crop**              | `crop_land`                            | Croplands Extent                       | ICRISAT / Landsat 30 m Random Forest          | 30 m               | Annual                                   | Binary (Crop vs Non-Crop) / COG                        | Derived classification               |
| **Crop**              | `crop_type`                            | Crop Type Classification               | ICRISAT / Landsat-8 & MODIS Spectral Matching | 30 m / 250 m       | Seasonal / Annual                        | Categorical (13 crop classes) / COG                    | Supervised ML classification         |
| **Crop**              | `crop_stress`                          | Crop Stress                            | ICRISAT Drought Remote Sensing                | 250 m              | Seasonal                                 | Categorical (Severe, Moderate, Mild) / COG             | Derived agronomic index              |
| **Crop**              | `flooded_paddy`                        | Flooded / Irrigated Paddy              | JADS / Sentinel-1 SAR VH Polarization         | 10 m / 30 m        | Seasonal                                 | Categorical (Floodwater, Paddy) / COG                  | SAR polarimetric modeling            |
| **Soil**              | `SOILM`                                | Volumetric Soil Moisture               | NASA SMAP (SPL3SMP_E v005/v006)               | 9 km               | Daily composite                          | m³/m³ ([0, 1]) / COG & PMTiles                         | Radiometric geophysical measurement  |
| **Soil**              | `SOC`                                  | Soil Organic Carbon                    | SoilGrids250m (ISRIC Machine Learning)        | 250 m              | Static baseline                          | dg/kg ([0, 500]) / COG & PMTiles                       | Machine learning pedometric model    |
| **Weather**           | `Temp - Monthly Avg.`                  | 2m Air Temperature                     | ERA5-Land (Copernicus C3S Reanalysis)         | 0.1° (~9 km)       | Monthly mean                             | °C ([1, 50]) / COG & PMTiles                           | Atmospheric model reanalysis         |
| **Weather**           | `Total Precipitation - Monthly`        | Total Monthly Precipitation            | ERA5-Land (Copernicus C3S Reanalysis)         | 0.1° (~9 km)       | Monthly accumulated                      | mm ([0, 10]) / COG & PMTiles                           | Atmospheric model reanalysis         |
| **Environmental**     | `PM25`                                 | Particulate Matter (PM2.5)             | NASA GEOS-CF v1.0 Modeling System             | ~25 km             | Hourly / Monthly aggregation             | μg/m³ ([1, 50]) / COG & PMTiles                        | Atmospheric chemical transport model |
| **Environmental**     | `NO2`                                  | Nitrogen Dioxide Total Column          | Sentinel-5P TROPOMI (ESA Copernicus)          | 3.5 × 5.5 km       | Monthly composite                        | mol/m² / COG & PMTiles                                 | Satellite spectrometer measurement   |
| **Environmental**     | `FIREEV`                               | Fire Events / Thermal Anomalies        | NASA LANCE FIRMS (MODIS MOD14/MYD14 Swath)    | 1 km center point  | Near-real-time daily / monthly           | Discrete point events with FRP (MW) / Vector GeoJSON   | Thermal anomaly detection            |
| **Socio-Economic**    | `POPULATION`                           | Gridded Population Count               | WorldPop Spatially Harmonised Dataset         | 100 m / 1 km       | Annual                                   | Count per grid cell / COG & PMTiles                    | Statistical demographic modeling     |
| **Socio-Economic**    | `RWI`                                  | Relative Wealth Index                  | Meta Data for Good / Microestimates           | 2.4 km             | Baseline cross-sectional                 | Relative standard deviation score / COG & PMTiles      | ML satellite/connectivity prediction |
| **Infrastructure**    | `WH`                                   | State Warehouses Geolocation           | Dept of Agriculture, Govt of Telangana        | Point coordinate   | Administrative updates                   | Capacity (MT), status, address / Vector GeoJSON        | Administrative government registry   |
| **Infrastructure**    | `COLD STORAGE`                         | Cold Storage Facilities                | State Horticulture / NABARD Records           | Point coordinate   | Administrative updates                   | Capacity, project name, location / Vector GeoJSON      | Administrative government registry   |
| **Analytical (DPPD)** | `DPPD` (Crop Fires)                    | Fire Positive Deviance                 | Tilburg Univ / NASA FIRMS STL Analysis        | Mandal / District  | Longitudinal multi-year                  | Slope score (relative trend) / PMTiles                 | Statistical LOESS decomposition      |
| **Analytical (DPPD)** | `NDVI_DPPD` / `LAI_DPPD` / `NDWI_DPPD` | Vegetation & Water DPPD Indices        | Tilburg Univ / UNDP Positive Deviance         | Mandal / District  | Longitudinal multi-year                  | Relative DPPD score / PMTiles & COG                    | Statistical baseline deviance        |
| **Analytical (DPPD)** | `SOIL_M_DEV`                           | Soil Moisture Deviance                 | UNDP / NASA SMAP Deviance Processing          | Mandal / District  | Monthly deviance                         | Relative deviance score / PMTiles & COG                | Anomaly calculation against mean     |

## 8. Methodology

The platform's methodology follows a structured operational lifecycle:

### Stage 1: Region and Parameter Initialization

- **Input**: User-selected state route parameter (for example, `/telangana`) or default root initialization.
- **Processing**: The system matches the state identifier against `validStates.ts`, loading localized configuration containing geographic center coordinates, bounding boxes, state-specific DPPD parameter thresholds, and district/sub-district GeoJSON indices.
- **Reason**: Agricultural administrative boundaries and baseline parameter thresholds vary across states.
- **Output**: Calibrated MapLibre viewport bounds and state configuration object.
- **Role**: Configures the spatial viewport and restricts subsequent catalog queries to the selected state.

### Stage 2: Layer Discovery and Date Availability

- **Input**: Active region ID, target category (such as Vegetation, Soil, or Weather), and mode (Raster or Vector).
- **Processing**: The client calls `/getlayerconfig` to obtain active layer metadata, followed by `/getblobdate` to retrieve valid observation timestamps.
- **Reason**: Remote sensing products operate on differing temporal cycles (daily, 8-day, 16-day, monthly, or annual).
- **Output**: Sorted chronological date list and default active date.
- **Role**: Prevents empty tile requests by constraining the time slider to valid data timestamps.

### Stage 3: Dynamic Cloud-Native Tile Streaming

- **Input**: Target layer identifier, date string, and layer type (`raster` or `vector`).
- **Processing**:
  - For raster layers, the system calls `/getcompairurl` to obtain the COG URL. The client fetches the smallest overview tier using `geotiff.js` to extract NoData values and compute true dynamic pixel minimum and maximum bounds. A custom MapLibre COG protocol expression is generated:
    ```
    cog://<URL>#color:[<HEX_PALETTE>],<MIN>,<MAX>,c
    ```
  - For vector layers, the system resolves the PMTiles archive URL and inspects archive headers to extract `vector_layers[0].id`. A MapLibre vector tile source is initialized with dynamic data-driven color stop expressions.
- **Reason**: COG and PMTiles architectures stream only visible viewport tiles over HTTP range requests, avoiding heavy server-side map rendering.
- **Output**: Hardware-accelerated map layers rendered on WebGL canvas.
- **Role**: Provides interactive pan-and-zoom rendering across wide spatial extents.

### Stage 4: Spatial Querying and Zonal Computation

- **Input**: User viewport clicks, search boundary selections, or custom polygon drawings.
- **Processing**:
  - In Vector Mode, the client queries vector tile feature properties (`mean`, `median`, `min`, `max`, `DPPD score`, `Slope Score`, `histogram`).
  - In Raster Mode, the client uses `locationValues()` to extract the raw pixel value at the clicked coordinate and runs reverse geocoding via OpenStreetMap Nominatim.
  - In Custom Shape Mode, the client calculates polygon area using `@mapbox/geojson-area`, projects coordinates to EPSG:3857, and either calls `/getzstat` or performs client-side spatial filtering on intersecting vector features.
- **Reason**: Translates visual map tiles into quantitative numbers for the specific spatial unit of interest.
- **Output**: Aggregated zonal statistics, categorical area percentages, and exact point measurements.
- **Role**: Populates the analysis drawer, rank cards, and info widgets.

### Stage 5: Time-Series Extraction and Comparative Analytics

- **Input**: Selected spatial feature (GeoJSON geometry or point coordinate) and user-selected time horizon (1, 3, 5, or 10 years).
- **Processing**: The client posts geometry coordinates and layer IDs to `/gettrendzarr` (for vector zones) or `/gettpointrendzarr` (for raster points). The server queries multi-dimensional Zarr stores and returns time-series arrays.
- **Reason**: Longitudinal analysis reveals seasonal trajectories, drought onset, recovery cycles, and multi-year deviations.
- **Output**: Time-series arrays rendered as interactive line charts with scientific unit formatting.
- **Role**: Enables historical trajectory inspection alongside spatial patterns.

## 9. Analytical and Computational Methods

### 1. Fast Raster Overview Min/Max Extraction

To render Cloud Optimized GeoTIFFs with balanced contrast, the platform avoids scanning millions of full-resolution pixels. Instead, it reads the coarse overview level embedded in the TIFF pyramid.

Let $I$ be the TIFF image at overview index $k = N-1$ (where $N$ is total overview count). Let $P = \{p_1, p_2, \dots, p_M\}$ be the array of downsampled pixel values, and let $v_{\text{nodata}}$ be the GDAL NoData value. The dynamic bounds are computed as:

$$P_{\text{valid}} = \{ p \in P \mid p \neq v_{\text{nodata}} \land \text{isFinite}(p) \}$$

$$\min_{\text{cog}} = \min(P_{\text{valid}}), \quad \max_{\text{cog}} = \max(P_{\text{valid}})$$

If $P_{\text{valid}} = \emptyset$, default bounds $\min_{\text{cog}} = 0, \max_{\text{cog}} = 1$ are assigned. This approach prevents extreme NoData values (such as -9999 or 65535) from distorting the color ramp.

### 2. Linear Continuous Color Stop Interpolation

For vector choropleths, attribute values are mapped to a chosen color ramp $C = [c_0, c_1, \dots, c_{K-1}]$ across domain bounds $[\text{min}, \text{max}]$. The step interval $\Delta s$ is defined as:

$$\Delta s = \frac{\text{max} - \text{min}}{K - 1}$$

The stop points $S_i$ for $i \in \{0, 1, \dots, K-1\}$ are:

$$S_i = \left( \text{min} + i \cdot \Delta s, \; c_i \right)$$

MapLibre evaluates these stops through a linear interpolation function:

$$\text{Color}(v) = \text{interpolate}\left(\text{linear}, \; \text{get}(\text{attribute}), \; S_0, S_1, \dots, S_{K-1}\right)$$

### 3. Client-Side Vector Feature Zonal Aggregation

When a user draws a custom polygon $G_{\text{custom}}$ over vector layers, the system performs client-side zonal aggregation over intersecting administrative units.

Let $F = \{f_1, f_2, \dots, f_m\}$ be the set of rendered vector features within the bounding box of $G_{\text{custom}}$. Each feature $f_j$ has properties including bounding box, centroid $(x_j, y_j)$, mean value $\mu_j$, median value $M_j$, and JSON histogram $H_j$.

A feature $f_j$ is included in the aggregation if its centroid falls within the bounding box of $G_{\text{custom}}$ or if the polygon center lies inside the feature geometry:

$$F_{\text{selected}} = \left\{ f_j \in F \mid (x_j, y_j) \in \text{BBox}(G_{\text{custom}}) \lor \text{PointInPolygon}(\text{Centroid}(G_{\text{custom}}), \text{Geom}(f_j)) \right\}$$

After deduplicating features by unique identifier, aggregated zonal metrics are calculated:

$$\mu_{\text{zonal}} = \frac{1}{|F_{\text{selected}}|} \sum_{f_j \in F_{\text{selected}}} \mu_j$$

$$\min_{\text{zonal}} = \min_{f_j \in F_{\text{selected}}} (\text{min}_j), \quad \max_{\text{zonal}} = \max_{f_j \in F_{\text{selected}}} (\text{max}_j)$$

$$H_{\text{zonal}}(k) = \sum_{f_j \in F_{\text{selected}}} H_j(k) \quad \forall \text{ category bins } k$$

### 4. Spherical Coordinate Projection (EPSG:4326 to EPSG:3857)

When transferring drawn geographic coordinates $(\lambda, \phi)$ in WGS84 (longitude, latitude in degrees) to backend zonal statistics endpoints requiring Web Mercator meters, the system applies forward spherical projection:

$$x = R \cdot \lambda_{\text{rad}} = 6378137 \cdot \left(\frac{\lambda \cdot \pi}{180}\right)$$

$$y = R \cdot \ln\left[\tan\left(\frac{\pi}{4} + \frac{\phi_{\text{rad}}}{2}\right)\right] = 6378137 \cdot \ln\left[\tan\left(\frac{\pi}{4} + \frac{\text{clamp}(\phi, -85.051, 85.051) \cdot \pi}{360}\right)\right]$$

### 5. Categorical Land Cover Area Share Computation

For categorical rasters (such as Sentinel-2 LULC, Crop Intensity, Crop Type, Crop Stress), raw pixel count distributions are transformed into percentage shares.

Let $C_k$ be the pixel count for class $k \in \{1, \dots, L\}$ retrieved from zonal statistics or vector histogram attributes. The percentage area share $A_k$ is:

$$A_k = \left( \frac{C_k}{\sum_{i=1}^L C_i} \right) \times 100$$

These percentages populate categorical donut charts and stacked trend visualizations, allowing direct comparison of crop types or land cover shifts across administrative units.

### 6. Relative Priority and Ranking Indexing

To rank administrative units within a state, all districts or mandals are ordered by their target metric value $V_j$ (such as mean NDVI, DPPD slope score, or soil moisture anomaly):

$$\text{Rank}(j) = 1 + \left| \{ i \in \text{Units} \mid V_i > V_j \} \right| \quad (\text{for descending rank priority})$$

The percentile rank marker position on normalized scorecards is calculated as:

$$\text{MarkerPercent}(j) = \left( \frac{\text{Rank}(j)}{N_{\text{total}}} \right) \times 100$$

A rank card preview selects a focused five-item comparison window (lowest two, current region, and highest two) to place the selected region in statewide context.

## 10. End-to-End Processing Pipeline

The step-by-step lifecycle of data through the DiCRA architecture is summarized below:

1. **Acquisition**: Raw satellite swaths, atmospheric reanalysis grids, and administrative records are pulled from providers (NASA LP DAAC, ESA Copernicus, C3S Climate Data Store, Meta Data for Good, state open data portals).
2. **Standardization and Cloud Optimization**: Continuous rasters are converted into Cloud Optimized GeoTIFFs (COGs) with internal tiling (typically 256x256 or 512x512 tile blocks) and multi-level overview decimation. Vector boundaries are joined with aggregated statistical properties and converted into PMTiles archives.
3. **Storage and Indexing**: COGs and PMTiles are hosted in high-throughput cloud storage supporting HTTP GET byte-range queries.
4. **Metadata Dispatch**: The client application requests state configurations, available dates, and secure resource URLs via REST endpoints.
5. **Client-Side Tile Streaming**: The MapLibre engine requests individual byte ranges corresponding to visible viewport tiles, rendering vector geometries and shader-colored raster pixels on a hardware-accelerated canvas.
6. **Interaction and Dynamic Computation**: Viewport mouse clicks, searches, or custom polygon sketches trigger local pixel sampling, vector property extraction, or client-side zonal aggregation.
7. **Longitudinal Analysis**: Clicking a spatial unit triggers asynchronous requests to multi-dimensional Zarr storage endpoints, returning historical time-series arrays for 1 to 10 year trend charting.
8. **Comparative Evaluation**: Users can switch to the dual-map split-screen interface to compare two different environmental variables or evaluate changes across two distinct historical dates.

## 11. Spatial and Geospatial Methodology

### Coordinate Reference Systems and Projections

The platform uses two standard Coordinate Reference Systems (CRS):

- **EPSG:4326 (WGS84)**: Used for source coordinate storage, GeoJSON interchange, raster point locations, and API payload definitions.
- **EPSG:3857 (Web Mercator)**: Used by MapLibre GL for viewport rendering, map tile indexing, and planar geometry area projections.

### Vector Tile Architecture (PMTiles)

Administrative boundaries (state outlines, districts, mandals) and pre-aggregated vector statistics are packaged as PMTiles archives. PMTiles is a single-file tile format based on Hilbert curve spatial indexing. The browser directly queries directory offsets within the remote PMTiles archive over HTTP range requests, eliminating the need for dynamic vector tile servers (such as Tegola or GeoServer).

Vector layers include embedded feature properties:

- `uid`, `district_name`, `subdistrict_name`: Administrative identifiers.
- `mean`, `median`, `min`, `max`: Statistical metrics of the underlying environmental raster across the polygon.
- `DPPD score`, `Slope Score`: Pre-computed longitudinal deviation trends.
- `histogram`: Serialized JSON strings containing pixel count distributions across bins.
- `centroid`: Geographic center coordinates $[x, y]$ used for label positioning and spatial containment checks.

### Raster Streaming (Cloud Optimized GeoTIFF)

Rasters are accessed through the MapLibre COG protocol extension. Instead of downloading complete GeoTIFF files, the browser requests header byte ranges to read image metadata and overview directories, and then fetches only the specific tile chunks visible at the current zoom level and bounding box.

Color mapping is applied on the client GPU using dynamic fragment shaders configured with hex color arrays and domain minimum/maximum thresholds.

### Spatial Containment and Clipping

For user-drawn custom shapes, spatial filtering combines bounding box checks with computational geometry:

- Bounding boxes are derived from vertex coordinates $[\min_{\text{lng}}, \min_{\text{lat}}, \max_{\text{lng}}, \max_{\text{lat}}]$.
- Centroid filtering checks whether administrative unit centers lie within the drawn bounding box.
- Ray-casting point-in-polygon verification (`@turf/boolean-point-in-polygon`) ensures accurate geometric containment for irregular polygon shapes.

## 12. Temporal Methodology

The platform handles diverse temporal cadences across its operational layers.

### Temporal Categorization of System Layers

1. **Near-Real-Time Observations**: Fire event points and daily soil moisture composites represent operational, near-real-time observations.
2. **Multi-Day Composites**: Optical satellite layers (NDVI, NDWI, LAI) use maximum-value or best-pixel composite algorithms over 8-day or 16-day windows to eliminate cloud contamination.
3. **Monthly Reanalysis and Atmospheric Averages**: Monthly ERA5-Land temperature and precipitation grids represent cumulative or averaged conditions.
4. **Annual and Seasonal Baselines**: Crop type classifications, crop intensity, and LULC represent annual or seasonal land use patterns.
5. **Multi-Year Longitudinal Trends**: The backend Zarr time-series databases maintain weekly and monthly historical records from 2016 onward. Users can select 1, 3, 5, or 10 year query windows to examine inter-annual variability and multi-year climate impacts.

### Temporal Comparison Workflow

In the split-screen comparison mode, users can lock the active layer (for example, NDVI) while selecting two different timestamps (for example, August 2020 vs August 2023). This visualizes spatial vegetation changes between drought and normal monsoon years.

## 13. Decision and Interpretation Layer

The platform translates raw physical observations into interpretable decision-support indicators:

### Layer Classification Rules

- **Direct Observations**: Pixel values directly reflect physical units (for example, temperature in °C, precipitation in mm, SOC in dg/kg, PM2.5 in μg/m³).
- **Categorical Land Classifications**: Discrete integer values represent land classes (for example, Sentinel-2 LULC: 1 = Water, 2 = Trees, 5 = Crops, 7 = Built Area; Crop Intensity: 1 = Single, 2 = Double, 3 = Triple; Flooded Paddy: 1 = Floodwater, 2/3 = Paddy).
- **Relative Deviance Scores**: DPPD values indicate relative change over time rather than absolute magnitude. Negative DPPD fire scores indicate favorable reductions in crop residue burning, while positive vegetation DPPD scores denote superior biomass accumulation relative to historical baselines.
- **Risk and Priority Rankings**: Districts and sub-districts are sorted into relative risk and priority brackets based on configured threshold matrices.

## 14. User Interaction With the System

The user workflow through DiCRA follows a consistent analytical progression:

1. **State Selection**: Users enter via direct URL (for example, `/telangana`, `/odisha`, `/maharashtra`) or select a state from the startup modal. The interface updates its viewport bounds and loads region-specific configuration.
2. **Layer and Date Selection**: Users explore thematic categories in the left panel, select an active indicator, toggle between Vector (administrative summary) and Raster (pixel-level inspection) views, and choose observation dates from a calendar slider.
3. **Map Interaction**:
   - In Vector Mode, clicking a district or mandal opens the right-hand inspection drawer, displaying administrative names, area, summary statistics, statewide ranking scorecards, and multi-year time-series trends.
   - In Raster Mode, clicking any point places a marker, retrieves exact pixel values, reverse-geocodes the location, and queries point-level historical time-series data.
   - In Custom Shape Mode, users draw arbitrary polygons on the canvas. The system computes the enclosed area and calculates zonal statistics or land-cover percentage breakdowns.
4. **Split-Screen Comparative Analysis**: Users can navigate to the `/analysis` route to open two synchronized map canvases with a draggable divider curtain. This supports side-by-side evaluation of two distinct layers (for example, NDVI vs Soil Moisture) or two historical time steps (for example, August 2021 vs August 2023).

## 15. Outputs and Results

The platform generates four primary categories of analytical outputs:

1. **Cartographic Visualizations**:
   - Continuous raster layers rendered via dynamic WebGL shader color ramps.
   - Administrative vector choropleths colored by pre-aggregated zonal means, DPPD scores, or slope indices.
   - Discrete point markers for thermal fire anomalies, state warehouses, and cold storage units.

2. **Quantitative Spatial Summaries**:
   - Zonal metrics table: mean, median, minimum, maximum, and standard deviance for selected boundaries.
   - Categorical distribution charts: percentage breakdowns of land cover, crop types, crop stress categories, and crop intensity levels within selected geometries.
   - Statewide ranking scorecards: relative position of a district or mandal compared to all administrative units in the state.

3. **Time-Series Analytics**:
   - Multi-year historical trend charts (1, 3, 5, or 10 years) showing monthly and seasonal trajectories for selected regions or geographic coordinates.

4. **Comparative Analysis Visualizations**:
   - Dual-viewport split-screen displays with synchronized panning, zoom, and coordinate crosshairs for comparative assessment.

## 16. Validation and Reliability

### Data Provenance and Upstream Quality

DiCRA integrates established public datasets that have undergone validation by their source agencies:

- NASA MODIS products (MOD13Q1, MOD15A2H, MOD11A1, MOD14) follow NASA Earth Science data quality standards and calibration algorithms.
- Copernicus Sentinel-5P TROPOMI trace gas observations are validated by the European Space Agency (ESA).
- ERA5-Land meteorological reanalysis is validated through the European Centre for Medium-Range Weather Forecasts (ECMWF) Copernicus Climate Change Service.
- SoilGrids250m uses cross-validated machine learning models developed by ISRIS Global Soil Information.
- ICRISAT crop products are based on peer-reviewed remote sensing methodologies for South Asian agricultural systems.

### Application Verification and Runtime Checks

Within the software repository, validation is focused on operational data integrity, protocol reliability, and client-side processing:

- **GDAL NoData Filtering**: Overview min/max parsing excludes designated GDAL NoData markers and non-finite values to prevent display distortion.
- **Cryptographic Payload Verification**: API communications use JOSE/JWE token decryption to verify payload structure before state injection.
- **Geometry Containment Checks**: Custom shape processing uses ray-casting containment algorithms (`@turf/boolean-point-in-polygon`) to verify spatial overlap before computing zonal statistics.
- **Fallback Mechanisms**: If dynamic layer configuration fails, default color scales, parameter limits, and fallback class mappings ensure consistent interface behavior.

The frontend application serves as an analytical visualizer and query engine; it does not perform independent ground-truth crop cutting experiments or physical sensor recalibrations in the browser.

## 17. Assumptions

The platform embeds several operational and methodological assumptions:

1. **Representativeness of Gridded Datasets**: Coarse-resolution datasets (such as ERA5-Land at ~9 km or NASA SMAP at 9 km) are assumed to provide meaningful agricultural guidance when averaged over administrative units, although sub-grid microclimatic variability may not be captured.
2. **Decoupling of Trend and Seasonality in DPPD**: The LOESS / STL seasonal decomposition assumes that multi-year systematic trends in vegetation vigor or fire counts reflect genuine structural changes rather than transient short-term weather fluctuations.
3. **NoData Value Consistency**: Overview min/max calculations assume that GDAL NoData metadata correctly identifies non-data pixels across all COG tiles.
4. **Boundary Realignment Stability**: Vector aggregation assumes that administrative district and mandal boundaries remain geographically consistent across historical comparison periods.
5. **Tile Attribute Homogeneity**: Vector PMTiles attributes (`mean`, `median`, `histogram`) assume pre-computed backend reductions accurately reflect the underlying raster pixel populations for each administrative polygon.

## 18. Technical Implementation Approach

The system architecture combines modern web standards with cloud-native geospatial protocols to deliver responsive performance without dedicated server-side GIS rendering engines.

### Client-Side Architecture

- **Single-Page Application**: Built with React, TypeScript, and Vite, state is managed through Redux Toolkit with specialized slices for raster layers, vector boundaries, drawer states, and multi-state configurations.
- **MapLibre GL Map Engine**: Renders interactive map viewports via WebGL. Custom protocol extensions (`maplibregl.addProtocol`) intercept tile requests:
  - `pmtiles://`: Routes vector tile requests through Hilbert-indexed byte-range readers.
  - `cog://`: Routes raster tile requests through `geotiff.js` decoders, applying GPU color shader expressions on the fly.
- **Draggable Split-Screen Visualizer**: The `/analysis` module synchronizes two independent MapLibre map instances. Dragging the central divider curtain adjusts CSS clip-path masks while mutual event listeners link map camera parameters (center, zoom, pitch, bearing).
- **Decoupled Overview Processing**: Raster overview min/max values are computed using web workers and asynchronous promises with GDAL NoData exclusions before layer styles are mounted.

## 19. Reproducibility

To reconstruct or deploy the DiCRA geospatial dashboard interface, the following components and configurations are required:

### 1. Data Preparation Requirements

- **Raster Layers**: Multi-band geospatial rasters must be formatted as Cloud Optimized GeoTIFFs (COGs) with internal tiling (256x256), deflation compression, and overviews generated at $2, 4, 8, 16, 32$ step intervals.
- **Vector Layers**: Administrative shapefiles must be joined with pre-computed statistics (`mean`, `median`, `min`, `max`, `DPPD score`, `histogram`) and packed into PMTiles format using `tippecanoe`.
- **Time-Series Stores**: Historical longitudinal data must be structured as multi-dimensional Zarr stores indexed by timestamp, parameter ID, and geographic coordinates.

### 2. Environment Configuration

The frontend application requires the following environment variables:

- `VITE_REACT_API_URL`: Base REST API endpoint for metadata, dates, layer configuration, and Zarr trends.
- `VITE_REACT_INDIA_BOUNDARY_URL`: Cloud storage URL hosting base national and state PMTiles boundaries.
- `VITE_REACT_JWE_SECRET`: Shared cryptographic key for JOSE JWE token decryption.

### 3. Build and Runtime Stack

- Node.js runtime environment (v18+) with npm or yarn package managers.
- Core dependencies: React 19, TypeScript, Vite, MapLibre GL (v6.9+), `@geomatico/maplibre-cog-protocol`, `pmtiles`, `geotiff.js`, `@reduxjs/toolkit`, `apexcharts`, `turf.js`.
- Standard build command: `npm run build` compiles the application into a static distribution bundle suitable for deployment on any standard web server or CDN (such as Nginx, Netlify, or Vercel).

## 20. Discussion

The Data in Climate Resilient Agriculture (DiCRA) platform demonstrates how cloud-native geospatial architectures can make complex Earth observation data accessible for regional planning.

By combining Cloud Optimized GeoTIFFs (COGs) and PMTiles vector tile archives, the system shifts raster decoding, color shader calculation, and geometry clipping directly into the client web browser. This design eliminates the need for expensive server-side GIS rendering infrastructure, enabling low-latency spatial exploration across all 36 Indian states and union territories.

A key methodological strength of the platform is its integration of Data Powered Positive Deviance (DPPD). Rather than presenting raw, isolated satellite measurements, DiCRA contextualizes environmental observations against longitudinal time series. By isolating structural multi-year trajectories from seasonal fluctuations, the platform enables policymakers to identify administrative units that maintain superior agricultural resilience despite climate stressors.

The platform also balances macro-scale administrative oversight with fine-grained local analysis. Planners can review statewide district and mandal choropleths, drill down to individual farm-scale raster pixels with pinpoint coordinate sampling, or draw custom polygons to calculate on-the-fly zonal metrics. Furthermore, the synchronized split-screen comparison interface provides an intuitive mechanism for evaluating land use changes across seasons and multi-year climate cycles.

Through these capabilities, DiCRA illustrates how open data, digital public goods, and modern browser technologies can work together to support evidence-based decision-making in climate-resilient agriculture.

## 21. Conclusion

The DiCRA platform addresses the challenge of making fragmented Earth observation and climate datasets practical and actionable for regional agriculture. By integrating satellite observations, meteorological reanalysis, pedological models, demographic grids, and infrastructure registries into a single cloud-native interface, the platform provides continuous spatial intelligence across multiple administrative levels in India.

The technical architecture demonstrates that complex geospatial workflows (including overview min/max extraction, dynamic GPU color shader application, vector tile attribute interpolation, client-side polygon clipping, and split-screen viewport synchronization) can be executed efficiently in standard web browsers. Supported by Data Powered Positive Deviance analytics and longitudinal Zarr time series, DiCRA offers decision-makers an accessible evidence base for identifying climate risks, studying resilient agricultural practices, and guiding sustainable land use planning.

## 22. Technical Glossary

- **Cloud Optimized GeoTIFF (COG)**: A standard GeoTIFF file structured with internal tiling and overviews, enabling clients to retrieve only the required spatial chunks via HTTP range requests without downloading the entire file.
- **Coordinate Reference System (CRS)**: A coordinate-based local, regional, or global system used to locate geographical entities on the Earth surface (such as EPSG:4326 for WGS84 latitude/longitude or EPSG:3857 for Web Mercator).
- **Data Powered Positive Deviance (DPPD)**: An analytical approach using longitudinal statistical decomposition (such as STL LOESS) to identify administrative units or communities performing significantly better than peers facing similar environmental constraints.
- **Fire Radiative Power (FRP)**: A measure of the instantaneous thermal energy output released by active fires, expressed in megawatts (MW), derived from thermal infrared satellite bands.
- **GDAL NoData Value**: A dedicated numerical flag assigned in raster headers to indicate pixels where valid data could not be collected (for example, cloud obstruction, missing swaths, or ocean areas).
- **Leaf Area Index (LAI)**: A dimensionless biophysical ratio defining the one-sided green leaf area per unit ground surface area (m²/m²), controlling canopy photosynthetic and transpiration capacity.
- **Land Surface Temperature (LST)**: The radiometric skin temperature of the land surface retrieved through satellite thermal infrared radiometry, expressed in degrees Celsius or Kelvin.
- **MapLibre GL**: An open-source, WebGL-based map rendering library for interactive vector and raster cartography.
- **Normalized Difference Vegetation Index (NDVI)**: A normalized spectral ratio of near-infrared and red reflectance, measuring photosynthetic greenness and vegetation canopy vigor.
- **Normalized Difference Water Index (NDWI)**: A normalized spectral ratio of near-infrared and shortwave-infrared reflectance, sensitive to liquid water content in plant canopies and open water bodies.
- **PMTiles**: A single-file archive format for vector and raster map tiles that allows random-access reading via HTTP range requests using Hilbert curve spatial indices.
- **Seasonal-Trend Decomposition using LOESS (STL)**: A statistical algorithm that decomposes time-series datasets into seasonal, trend, and remainder components using localized regression smoothing.
- **Soil Organic Carbon (SOC)**: The carbon component of organic compounds in soil, essential for soil structure, nutrient cycling, water retention, and carbon sequestration.
- **Volumetric Soil Moisture (SOILM)**: The ratio of water volume to total soil volume in unsaturated upper soil layers, measured in cubic meters of water per cubic meter of soil (m³/m³).
- **Zarr**: A cloud-native format for storing chunked, compressed, multi-dimensional numerical arrays, used for high-performance time-series queries.
- **Zonal Statistics**: The calculation of summary statistical metrics (such as mean, median, min, max, count distributions) of a raster surface over defined polygon boundaries.
