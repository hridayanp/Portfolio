## 1. Abstract

This case study examines the architecture, domain methodology, and analytical foundations of the Climate Decision Intelligence Meteorological Operations (CDI MetOps) system. Developed for high-consequence operational environments, particularly aerodrome management and defence aviation, the system addresses the operational challenge of detecting, tracking, and predicting localized convective weather hazards. The primary focus centres on two critical deliverables: short-range forecasting (0 to 24 hours) and high-resolution nowcasting (0 to 6 hours) of thunderstorm occurrence, storm cell movement vectors, storm intensity, and strong surface winds (SSW, defined at or above 25 knots).

To bridge the gap between observational telemetry and numerical model projections, the system implements a mathematical blending methodology that unifies observational nowcasts and numerical weather prediction runs into a single continuous 24-hour hybrid timeline. The platform combines client-side Cloud-Optimized GeoTIFF raster processing, dynamic normalization algorithms, WebGL-accelerated vector particle kinematics, and persistent dual-source double-buffering to achieve zero-blink spatiotemporal visual continuity. Operational state machines translate multi-variable atmospheric telemetry into actionable flight safety tiers (Operational, Caution, and Restricted). The resulting system demonstrates how diverse spatial and temporal meteorological streams can be integrated into an operational cockpit interface to support rapid tactical decision-making without cognitive clutter.

---

## 2. Introduction

Meteorological phenomena occurring at the mesoscale (2 to 2000 km) and microscale (less than 2 km), such as convective thunderstorms, microbursts, sudden wind shear, and rapid visibility degradation, present substantial hazards to aviation and ground safety. In aerodrome operations, atmospheric stability can deteriorate rapidly. A thunderstorm cell can form, intensify, and intersect an airfield within 30 to 60 minutes, disrupting approach corridors, altering runway crosswind components, and risking ground personnel safety.

Traditional meteorological systems often fail to serve tactical operational needs for several structural reasons. Macroscale numerical weather prediction (NWP) models provide regional guidance over multi-day horizons, but their coarse spatial grids (typically 9 to 25 km) and multi-hour update cycles fail to resolve localized storm cell initiation and short-lived peak gust dynamics. Conversely, observational systems such as Automatic Weather Stations (AWS), Doppler weather radars, and geostationary meteorological satellites offer immediate situational awareness, but their outputs remain fragmented across disparate screens and data formats. Station point readings, radar reflectivity scans, and satellite radiance channels are rarely unified into a single predictive operational picture.

Operational controllers and meteorology watch officers require a synchronized system that reconciles real-time telemetry with future projections. They need to understand not only what is currently happening across a terminal control area, but where convective cells will travel over the next 15 to 180 minutes, when surface wind thresholds will breach aircraft operating limits, and how model confidence shifts across the forecast horizon. This project establishes an operational decision intelligence system tailored to aerodromes across India, integrating real-time observational ingestion, high-cadence nowcasting, short-range numerical forecasts, and interactive spatiotemporal visualization.

---

## 3. Problem Statement

Aviation safety and aerodrome throughput depend on clear answers to four primary questions during adverse weather:

1. Will a convective thunderstorm occur at or near the aerodrome?
2. Where is the storm cell located, in which direction is it travelling, and at what speed?
3. What is the expected intensity of the storm and associated surface wind gusts?
4. When will hazardous conditions breach operational limits for active runways?

Conventional operational workflows face several critical friction points:

- **Disparate Temporal Horizons**: Real-time observational nowcasts (0 to 6 hours at 15-minute intervals) and numerical weather predictions (0 to 24 hours at 1-hour intervals) exist in separate silos. Switching between these systems creates cognitive friction and discontinuous mental models.
- **Point versus Field Mismatch**: Surface weather stations provide precise temporal readings at isolated physical coordinates, but offer zero direct spatial coverage between stations. Conversely, satellite imagery provides continuous 2D spatial fields, but lacks the point-level surface truth of an aerodrome runway.
- **Visual Obstruction and Interface Latency**: Standard web mapping solutions flicker or drop frames when scrubbing across high-resolution raster time series. In tactical situations, visual latency or map blinking degrades situational awareness.
- **Lack of Direct Flight-Rule Translation**: Presenting raw temperature, dew point, pressure, and wind speed forces operators to perform mental calculations to determine whether flight rules (VFR, MVFR, IFR, LIFR) or aerodrome operating statuses are breached.

The primary problem addressed by this system is the consolidation of heterogeneous meteorological observations and model outputs into a unified, continuous, 4-dimensional (space plus time) decision console that automatically categorizes operational risk and eliminates visual discontinuities during tactical analysis.

---

## 4. Objectives

### Primary Objective

To design and implement an end-to-end meteorological operations console that accurately ingests, synthesizes, and visualizes short-range forecasts (up to 24 hours) and nowcasts (0 to 6 hours) for localized thunderstorm occurrence, storm trajectory vectors, storm intensity, and strong surface winds across designated aerodromes.

### Supporting Objectives

- **Hybrid Temporal Blending**: Formulate a continuous transition function that merges 15-minute nowcasting data with 60-minute numerical weather forecasts into a single 24-step hybrid timeline without sharp step boundaries.
- **Client-Side Scientific Raster Processing**: Decode 32-bit floating-point and 16-bit Cloud-Optimized GeoTIFFs directly within the browser, applying dynamic mathematical normalization and customizable chromatic ramps in real time.
- **Zero-Blink 4D Map Playback**: Implement a GPU-accelerated dual-source double-buffering architecture inside a WebGL map engine to achieve smooth, instantaneous temporal scrubbing across multi-spectral raster layers.
- **Vector Kinematics and Particle Dynamics**: Construct dynamic particle animation layers on the GPU to visualize surface wind vector fields ($U, V$ components) derived from interpolated station feeds.
- **Rule-Based Operational State Classification**: Establish deterministic classification algorithms that evaluate thunderstorm proximity, cloud ceiling height, horizontal visibility, and runway crosswind components to classify aerodrome status into Operational, Caution, and Restricted tiers.
- **Model Validation and Skill Verification**: Provide an analytical evaluation suite computing Root Mean Square Error (RMSE), Mean Absolute Error (MAE), Bias, F1 scores, and Skill Scores against baseline persistence models.

---

## 5. Domain and Theoretical Background

Understanding the system methodology requires familiarity with specific meteorological, mathematical, and geospatial principles:

### Convective Thunderstorms and Mesoscale Hazards

Convective thunderstorms result from atmospheric instability, moisture availability, and convective lifting mechanisms. In aviation, thunderstorms represent the single greatest non-structural atmospheric hazard, producing severe turbulence, lightning, heavy precipitation, microbursts, and low-level wind shear. The system models thunderstorm severity through two specific criteria:

- **Thunderstorm Occurrence**: Binary classification (Yes or No) indicating convective activity within the aerodrome surveillance radius (typically 50 km to 200 km).
- **Thunderstorm Intensity**: Categorical rating where "Yes" designates high-intensity convective development (associated with cloud top cooling, high radar reflectivity, and severe gust fronts) and "No" designates moderate convective activity.

### Strong Surface Wind (SSW)

Surface wind velocity at an aerodrome is governed by horizontal pressure gradients, convective downdrafts, and surface boundary layer friction. In the operational context of this project, Strong Surface Wind (SSW) is defined as sustained wind velocity or convective gusts reaching or exceeding 25 knots ($12.86\text{ m/s}$) at 10 meters above ground level. Winds of this magnitude alter aircraft handling characteristics, exceed maximum demonstrated crosswind limits for specific airframes, and necessitate runway configuration changes.

### Atmospheric Sounding and Remote Sensing

The system design anticipates data inputs from multiple observation platforms:

- **Geostationary Satellite Imagery**: Multi-spectral radiance data from INSAT-3D, INSAT-3DR, and INSAT-3DS satellites. The Hydro-Estimator Model (HEM) uses infrared brightness temperatures ($10.8\,\mu\text{m}$) from satellite imagers to estimate instantaneous surface rainfall rates ($\text{mm/hr}$) based on cloud top cooling dynamics.
- **Radio Occultation (GPS-RO)**: Atmospheric profiling (such as COSMIC-2) that derives vertical temperature, pressure, and moisture profiles from the refractivity of GPS radio signals passing through the limb of the atmosphere.
- **Automatic Weather Stations (AWS)**: Ground-based sensor arrays measuring dry-bulb temperature, relative humidity, atmospheric pressure at mean sea level (QNH altimeter setting), horizontal visibility, and surface wind vector components.

### Cartesian Vector Decomposition of Wind

Wind direction is traditionally reported in polar coordinates: speed magnitude $S$ (knots or $\text{m/s}$) and compass direction $\theta$ (degrees from which the wind blows, where $0^\circ = \text{North}, 90^\circ = \text{East}$). Performing spatial interpolation or temporal averaging directly on polar angular degrees causes severe boundary errors (for example, the numerical average of $359^\circ$ and $1^\circ$ is $180^\circ$ South, whereas physically both vectors represent near-identical Northerly flow).

To ensure mathematical validity, the system converts polar wind coordinates into orthogonal Cartesian vector components ($U$ and $V$):
$$U = -S \cdot \sin\left(\theta \cdot \frac{\pi}{180}\right)$$
$$V = -S \cdot \cos\left(\theta \cdot \frac{\pi}{180}\right)$$
Here, $U$ represents the zonal velocity component (positive toward East), $V$ represents the meridional velocity component (positive toward North), and the negative signs invert the meteorological convention ("from") into mathematical vector trajectory ("towards").

---

## 6. System Concept

The conceptual architecture of the system models the progression of atmospheric data from raw observational ingestion through analytical transformation to tactical user interpretation:

1. **Acquisition Layer**: Continuously ingests point readings from surface weather stations, gridded satellite infrared radiance, and global/regional NWP model runs.
2. **Gridding and Asset Preparation Layer**: Normalizes non-uniform station points into continuous regular meshes using spatial interpolation, exports Cloud-Optimized GeoTIFFs, and generates UV-encoded vector texture maps.
3. **Analytical and Blending Engine**: Resolves temporal discrepancies by synthesizing observational nowcasts and numerical forecasts into a synchronized hybrid stream, computing closing velocity vectors, and deriving operational classifications.
4. **WebGL Geospatial Canvas**: Renders high-density raster and vector weather overlays over aerodrome runway geometry, ensuring zero-latency frame swaps during time-series exploration.
5. **Decision Synthesis Interface**: Presents multi-variable atmospheric telemetry through a heads-up display paradigm, mapping complex data into immediate operational tiers.

---

## 7. Data Sources and Data Characteristics

The system is engineered to work with structured observational feeds, gridded satellite products, numerical prediction outputs, and vector GIS infrastructure. Within the current codebase, live data ingestion is modeled through validated Zod schema contracts and deterministic synthetic generators that mirror the exact physical distributions and data shapes specified for production deployment.

### 7.1 Detailed Data Inventory

| Dataset / Entity                            | Source Nature                              | Spatial Representation                                      | Temporal Horizon & Resolution                    | Variables & Units                                                                                                                                                                                            | Reference System / Format                                 | Intended System Purpose                                                                 |
| :------------------------------------------ | :----------------------------------------- | :---------------------------------------------------------- | :----------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| **Surface Station Obs (AWS / METAR)**       | Point Observation                          | Discrete coordinates per airfield (e.g., VIDP, VABB, VECC)  | 30-minute routine cadence (1-10 min for IAF AWS) | Temperature ($^\circ\text{C}$), Dewpoint ($^\circ\text{C}$), Pressure QNH ($\text{hPa}$), Visibility ($\text{km}$ or $\text{m}$), Ceiling ($\text{ft}$), Wind Speed ($\text{kt}$), Wind Direction ($^\circ$) | WGS84 (`EPSG:4326`), Encoded ASCII string / JSON Schema   | Ground truth baseline for aerodrome status, KPI cards, and error validation metrics.    |
| **Thunderstorm Nowcast Raster**             | Satellite Extrapolation (INSAT-3D/3DR/3DS) | Gridded 2D Raster matrix ($64\times 64$ to $300\times 300$) | 0 to 6 hours, 15-minute step intervals           | Thunderstorm probability index ($0.0$ to $1.0$ or $0\%$ to $100\%$)                                                                                                                                          | Cloud-Optimized GeoTIFF (`Float32` / `UInt16`), EPSG:4326 | Real-time convective cell detection and visual probability heatmap overlay.             |
| **Hydro-Estimator (HEM) Precipitation**     | Satellite IR Radiance Model                | Gridded 2D Raster                                           | 0 to 6 hours, 15-minute cadence                  | Instantaneous rainfall rate ($\text{mm/hr}$)                                                                                                                                                                 | Cloud-Optimized GeoTIFF, EPSG:4326                        | High-resolution precipitation intensity estimation over aerodrome approach paths.       |
| **Surface Wind (SSW) Field**                | Station Interpolation / NWP                | Gridded 2D Raster + UV Tensor                               | 0 to 6 hours (Nowcast) / 24 hours (Forecast)     | Zonal wind $U$ ($\text{m/s}$), Meridional wind $V$ ($\text{m/s}$), Scalar wind speed ($\text{kt}$)                                                                                                           | GeoTIFF + UV-encoded RGBA PNG texture                     | Powers scalar wind heatmap and GPU-accelerated animated particle flowlines.             |
| **Numerical Weather Prediction (Forecast)** | Short-Range NWP Post-processed             | Gridded and Point Extracted                                 | 0 to 24 hours, 1-hour step intervals             | 2m Temperature ($^\circ\text{C}$), Total Precipitation ($\text{mm}$), Mean Sea Level Pressure ($\text{hPa}$), Convective vs Non-Convective Rain ($\text{mm}$)                                                | Cloud-Optimized GeoTIFF + JSON timeline                   | Provides multi-hour lookahead for strategic aerodrome planning.                         |
| **Aerodrome Infrastructure**                | Survey / Aeronautical Database             | Vector geometries (Points, LineStrings, Polygons)           | Static spatial reference                         | Runway headings ($^\circ$), Runway lengths ($\text{m}$), Approach corridors, Range rings ($40, 80, 120, 200\text{ km}$)                                                                                      | Vector GeoJSON / MapLibre WebGL layers                    | Provides fixed spatial reference markers to anchor weather hazards to physical runways. |

---

## 8. Methodology

The core methodology of the CDI MetOps system governs how incoming observation and prediction streams are prepared, blended, spatially transformed, and rendered into an integrated operational display.

### Stage 1: Temporal Normalization and Hybrid Blending

- **Input**: Independent timelines from the Nowcast model ($0$ to $6$ hours at 15-minute resolution, comprising 24 steps) and Short-Range model ($0$ to $24$ hours at 60-minute resolution, comprising 24 steps).
- **Processing**: The system evaluates each hourly forecast step $t \in [0, 24]$. A dynamic weight coefficient $w(t)$ is computed. For hours $0$ through $3$, $w(t) = 1.0$ (complete nowcast reliance). Between hours $3$ and $6$, $w(t)$ decreases linearly from $1.0$ to $0.0$. Beyond hour $6$, $w(t) = 0.0$ (complete NWP reliance).
- **Reason**: Observational nowcasting (radar extrapolation and satellite advection) exhibits superior skill in the immediate 0 to 3 hour window but suffers rapid error growth beyond 3 to 4 hours due to non-linear convective initiation and dissipation. Conversely, NWP models capture large-scale atmospheric dynamics over 6 to 24 hours but struggle with exact convective initiation timing at $T+0$. Blending eliminates step-function jumps at the boundary.
- **Output**: A unified 24-step timeline where every timestep contains continuous numeric parameters, categorical classifications, and metadata indicating source provenance (`nowcast`, `mixed`, or `shortrange`).

### Stage 2: Geodesic Spatial Projection of Convective Storm Cells

- **Input**: Airfield geographic coordinates $(\phi_{\text{site}}, \lambda_{\text{site}})$, storm cell bearing from airfield ($\theta_{\text{bearing}}$ in degrees), and storm cell distance ($d_{\text{km}}$).
- **Processing**: The system applies the great-circle geodesic forward projection to compute the exact latitude and longitude $(\phi_{\text{cell}}, \lambda_{\text{cell}})$ of the storm centroid.
- **Reason**: Meteorological feeds often report storm threats relative to the station (for example, "Thunderstorm observed 25 km South-West"). To render this threat accurately on an absolute coordinate map canvas, the polar vector must be translated into geographic coordinates on the WGS84 ellipsoid.
- **Output**: Exact spatial point coordinates enabling the generation of warning polygons, range-ring intersection checks, and spatial vector tracking.

### Stage 3: Client-Side GeoTIFF Raster Decoding and Dynamic Colorization

- **Input**: 32-bit floating-point or 16-bit integer Cloud-Optimized GeoTIFF binary buffers fetched via presigned URLs.
- **Processing**: The browser decodes the TIFF header, reads the raw raster array, identifies the GDAL `NoData` mask, calculates the minimum and maximum data bounds across valid pixels, normalizes the array into $[0.0, 1.0]$, maps normalized values through active color palettes using `chroma-js`, writes raw RGBA pixel data to an offscreen HTML5 canvas, and produces an in-memory base64 PNG data URL.
- **Reason**: Traditional web maps rely on server-rendered image tiles, which lock the visualization into a fixed color scale and prevent client-side threshold adjustment. In-browser raster decoding allows dynamic opacity tuning, palette switching (for dark/light tactical themes), and instant hover inspection of raw scientific values without round-trip network latency.
- **Output**: Georeferenced image overlays with precise bounding coordinates ready for WebGL texture binding.

---

## 9. Analytical and Computational Methods

This section documents the specific mathematical formulas and computational algorithms implemented within the system.

### 9.1 Hybrid Forecast Blending Formulation

For any continuous atmospheric variable $X$ (such as Temperature $T$, Pressure $P$, Visibility $V$, Wind Speed $S$, or Model Confidence $C$) at forecast hour $t \in [0, 24]$, the blended value $X_{\text{hybrid}}(t)$ is defined by:

$$
w(t) = \begin{cases}
1.0 & \text{for } t \le 3 \\
\frac{6 - t}{6 - 3} = \frac{6 - t}{3} & \text{for } 3 < t < 6 \\
0.0 & \text{for } t \ge 6
\end{cases}
$$

$$X_{\text{hybrid}}(t) = w(t) \cdot X_{\text{nowcast}}(t) + (1 - w(t)) \cdot X_{\text{shortrange}}(t)$$

For categorical and discrete variables (such as Thunderstorm Occurrence $O_{\text{TS}} \in \{\text{Yes}, \text{No}\}$, Storm Intensity $I_{\text{TS}} \in \{\text{Yes}, \text{No}\}$, and Cardinal Wind Direction $D_{\text{wind}}$), a majority-weight selection rule is enforced:

$$
O_{\text{hybrid}}(t) = \begin{cases}
O_{\text{nowcast}}(t) & \text{if } w(t) \ge 0.5 \\
O_{\text{shortrange}}(t) & \text{if } w(t) < 0.5
\end{cases}
$$

At the midpoint $t = 4.5$ hours ($w = 0.5$), the system intentionally prioritizes the observational nowcast, reflecting the operational doctrine that recent empirical observations outweigh numerical model initialization during near-term convective evolution.

### 9.2 Geodesic Forward Point Calculation

Given an aerodrome reference point with latitude $\phi_1$ and longitude $\lambda_1$ (in radians), a storm cell observed at bearing $\theta$ (radians clockwise from true North) and distance $d$ (kilometers), the destination point $(\phi_2, \lambda_2)$ on a spherical Earth of mean radius $R = 6371\text{ km}$ is calculated as:

$$\delta = \frac{d}{R}$$

$$\phi_2 = \arcsin\left(\sin \phi_1 \cos \delta + \cos \phi_1 \sin \delta \cos \theta\right)$$

$$\lambda_2 = \lambda_1 + \operatorname{atan2}\left(\sin \theta \sin \delta \cos \phi_1, \cos \delta - \sin \phi_1 \sin \phi_2\right)$$

The resulting radian coordinates are converted back to decimal degrees for rendering within the WebGL spatial coordinate system.

### 9.3 Storm Cell Closing Velocity and Estimated Time of Arrival (ETA)

To compute the expected time when a moving convective cell will intersect an aerodrome boundary, the system evaluates the geometric relationship between the cell position, its movement vector, and the airfield location:

1. Let $\theta_{\text{bearing}}$ be the bearing of the storm cell from the airfield. The bearing from the cell back toward the airfield is:
   $$\theta_{\text{toward}} = (\theta_{\text{bearing}} + 180^\circ) \bmod 360^\circ$$
2. Let $\theta_{\text{movement}}$ be the heading toward which the storm cell is travelling, and $V_{\text{cell}}$ be the cell translation speed in knots. The angle difference between the cell trajectory and the airfield line of sight is:
   $$\Delta \theta = \theta_{\text{movement}} - \theta_{\text{toward}}$$
3. The closing velocity $V_{\text{closing}}$ directed toward the airfield is:
   $$V_{\text{closing}} = V_{\text{cell}} \cdot \cos(\Delta \theta)$$
4. If $V_{\text{closing}} \le 0$, the storm cell is moving tangential to or away from the airfield ($\text{receding} = \text{true}$).
5. If $V_{\text{closing}} > 0$, the closing velocity is converted to kilometers per hour ($1\text{ knot} = 1.852\text{ km/h}$), and the Estimated Time of Arrival ($\text{ETA}$) in minutes is calculated as:
   $$\text{ETA}_{\text{minutes}} = \frac{d_{\text{km}}}{V_{\text{closing}} \cdot 1.852} \times 60$$

### 9.4 Scientific Raster Normalization

When decoding raw floating-point values from GeoTIFF rasters, pixel values $v(x, y)$ are normalized into standard unit space $[0.0, 1.0]$:

$$\text{norm}(v) = \min\left(1.0, \max\left(0.0, \frac{v - v_{\min}}{v_{\max} - v_{\min}}\right)\right)$$

where $v_{\min}$ and $v_{\max}$ represent the operational scale bounds for the variable (e.g., $0.0$ to $1.0$ for probability, $0$ to $50\text{ mm/hr}$ for rainfall intensity, or $0$ to $60\text{ kt}$ for surface winds). The normalized scalar is then mapped directly to an RGBA lookup vector via piecewise cubic spline interpolation across the defined chromatic palette.

### 9.5 Model Evaluation and Skill Scoring Formulation

To verify model accuracy and detect systematic drift across forecast cycles, the system computes the following statistical verification metrics against observed ground truth:

- **Root Mean Square Error (RMSE)** for continuous variables:
  $$\text{RMSE} = \sqrt{\frac{1}{N} \sum_{i=1}^N \left(\hat{y}_i - y_i\right)^2}$$
- **Mean Error (Bias)** for detecting systematic overestimation or underestimation:
  $$\text{Bias} = \frac{1}{N} \sum_{i=1}^N \left(\hat{y}_i - y_i\right)$$
- **Mean Absolute Error (MAE)**:
  $$\text{MAE} = \frac{1}{N} \sum_{i=1}^N \left|\hat{y}_i - y_i\right|$$
- **F1 Score** for binary event classification (Thunderstorm and SSW occurrence):
  $$\text{F1} = \frac{2 \cdot \text{True Positives}}{2 \cdot \text{True Positives} + \text{False Positives} + \text{False Negatives}}$$
- **Forecast Skill Score** evaluated relative to a baseline persistence model (assuming weather at $T+k$ equals weather at $T+0$):
  $$\text{Skill Score} = 1 - \frac{\text{MSE}_{\text{model}}}{\text{MSE}_{\text{persistence}}}$$
  A score of $1.0$ indicates perfect forecasting skill, $0.0$ indicates skill equal to simple persistence, and negative values indicate performance inferior to persistence.

---

## 10. End-to-End Processing Pipeline

The execution flow of the system operates through a continuous, cyclic pipeline from raw data acquisition to tactical decision output:

### Detailed Pipeline Stages:

1. **Data Ingestion**: Ingests multi-source inputs across defined schedules (e.g., METAR every 30 minutes, satellite rasters every 15 minutes, IAF AWS every 1 to 10 minutes).
2. **Gridding and Tensor Generation**: Ingested AWS surface wind reports are converted to Cartesian $U$ and $V$ vector components, spatially interpolated across a $300\times 300$ mesh covering the subcontinent, and saved as UV-encoded RGBA textures.
3. **API Distribution**: Server endpoints deliver structured JSON schemas containing site metadata, runway orientations, and timeline predictions alongside presigned S3 URLs for raster assets.
4. **Hybrid Synthesis**: When the user selects the Hybrid model view, the client application executes the blending engine across the independent nowcast and short-range prediction streams, synthesizing continuous 24-hour trajectories.
5. **Decoupled Raster Pre-fetching**: As the user moves across the timeline, background workers prefetch the next timestep's GeoTIFF binary buffer into memory, decode the floating-point matrix, and prepare the offscreen canvas texture.
6. **Synchronized Display**: The WebGL map canvas swaps textures instantaneously while the bottom Meteogram chart, side diagnostic cards, and active threat matrices update their visual indicators in unison.

---

## 11. Spatial and Geospatial Methodology

The geospatial architecture of the system is designed to preserve spatial accuracy across multiple scales, from continental weather patterns to individual aerodrome runways.

### Coordinate Reference System (CRS)

All spatial calculations, GeoTIFF bounding extents, and vector geometries operate strictly in the standard **WGS84** geographic coordinate system (`EPSG:4326`), utilizing decimal degree coordinates ($+\text{North}, +\text{East}$). Map display rendering projects these coordinates into Web Mercator (`EPSG:3857`) via MapLibre GL.

### Preservation of Infrastructure Features via Layer Ordering

Meteorological raster heatmaps are semi-opaque color fields that could obscure ground features if rendered carelessly. The system enforces strict layer hierarchy:

- Weather heatmaps are inserted beneath geographical boundary lines and airfield runways using dynamic `beforeId` layer indexing.
- Runway centerlines, approach extensions, and concentric range rings ($40\text{ km}, 80\text{ km}, 120\text{ km}, 200\text{ km}$) are anchored to the top of the WebGL canvas. Runways remain visible even beneath high-intensity thunderstorm radar reflections.

### Zero-Blink Dual-Source Double-Buffering

Standard web mapping engines experience a visual flash (exposing the basemap for 1 to 2 frames) when updating image sources during timeline playback. To eliminate this issue, the system maintains two permanent image sources (`layer-src-a` and `layer-src-b`) mounted in the MapLibre style tree:

1. While Buffer A renders at full opacity ($\text{opacity} = 1.0$), Buffer B is loaded offscreen with the incoming frame at opacity zero ($\text{opacity} = 0.0$).
2. Once Buffer B is fully decoded and bound to the GPU, the system executes an atomic swap: Buffer B snaps to full opacity while Buffer A drops to zero.
3. Setting `'raster-fade-duration': 0` disables default cross-fade transitions, producing continuous frame updates without basemap flashing.

---

## 12. Temporal Methodology

Time in meteorological forecasting is a critical independent variable. The system manages three distinct operational time regimes:

### Temporal Regimes

1. **Past Historical Observations ($T - 24\text{h}$ to $T+0$)**: Ingested surface station logs and satellite captures utilized for sparkline trends, baseline calibration, and error validation metrics.
2. **Nowcasting Horizon ($T+0$ to $T+6\text{h}$)**: High-resolution projections at 15-minute intervals refreshed every 5 minutes, driven by satellite feature tracking and surface AWS assimilation.
3. **Short-Range Forecast Horizon ($T+0$ to $T+24\text{h}$)**: 24-hour lookahead at 1-hour intervals refreshed every 30 minutes, driven by numerical weather prediction boundary conditions post-processed via Model Output Statistics (MOS).

### Temporal Synchronization

All temporal controls across the console are synchronized through a global timeline index (`tStep`). Advancing the scrubber on the bottom Meteogram instantly updates the active timestamp across the Status Strip, shifts the WebGL raster frames, recalculates the active storm cell closing vectors, and refreshes the KPI cards, ensuring complete temporal alignment across the interface.

---

## 13. Decision and Interpretation Layer

The system transforms raw physical observations into clear operational decision tiers. Operational controllers do not merely inspect raw numbers; they evaluate operational status through standardized flight safety rules.

### Deterministic Aerodrome Operational Status

The operational state machine evaluates atmospheric telemetry against pre-defined safety bounds:

- **RESTRICTED**: Triggered when a high-intensity thunderstorm cell is detected within $10\text{ km}$ of the aerodrome centroid ($d_{\text{storm}} < 10\text{ km} \land I_{\text{TS}} = \text{"Yes"}$). Aerodrome operations are severely curtailed, approach corridors are suspended, and ground movements are halted.
- **CAUTION**: Triggered when surface wind speed exceeds the Strong Surface Wind threshold ($S_{\text{wind}} \ge 25\text{ kt}$), horizontal visibility drops below $5\text{ km}$ ($V_{\text{vis}} < 5\text{ km}$), or any thunderstorm cell is detected within $25\text{ km}$ ($d_{\text{storm}} < 25\text{ km}$). Operators prepare for runway changes and potential holding patterns.
- **OPERATIONAL**: Baseline operating condition when all parameters remain within normal safety envelopes.

### Flight Rules Derivation

The system continuously evaluates horizontal visibility and cloud ceiling base height against standard aviation flight rule categories:

- **VFR (Visual Flight Rules)**: Visibility $\ge 5\text{ km}$ and Ceiling $\ge 3000\text{ ft}$. Normal visual operations permitted.
- **MVFR (Marginal Visual Flight Rules)**: Visibility $5\text{ km}$ to $3\text{ km}$ or Ceiling $1000\text{ ft}$ to $3000\text{ ft}$. Visual operations permitted with caution.
- **IFR (Instrument Flight Rules)**: Visibility $3\text{ km}$ to $800\text{ m}$ or Ceiling $200\text{ ft}$ to $1000\text{ ft}$. Operations restricted to instrument approaches.
- **LIFR (Low Instrument Flight Rules)**: Visibility $< 800\text{ m}$ or Ceiling $< 200\text{ ft}$. Precision Category II/III instrument approaches required.

---

## 14. User Interaction With the System

The console organizes user workflows through a peripheral Heads-Up Display (HUD) architecture, keeping the geospatial map canvas visible at all times.

### Operational Workflow Stages:

1. **Initial Assessment**: The operator observes the North Status Strip, verifying active aerodrome identity (ICAO code), dual UTC/Local operational clocks, and overall aerodrome status (e.g., `OPERATIONAL` in green, `CAUTION` in amber, or `RESTRICTED` in red).
2. **Model Selection**: The operator switches between `Nowcast` (0 to 6 hours), `Short-Range` (24 hours), or `Hybrid` modes via the masthead selector.
3. **Spatiotemporal Exploration**: The operator scrubs the southern timeline or clicks playback. As time advances, the map animates weather rasters, wind particle streamlines, and storm cell positions.
4. **Threat Inspection**: If a storm cell enters the surveillance perimeter, the operator inspects the eastern Threat Matrix to review the cell bearing, closing velocity, and calculated ETA.
5. **Detailed Aerodrome Diagnostics**: Expanding the western parameters panel provides granular readouts of pressure trends, cloud base heights, temperature sparklines, and active runway crosswind components.

---

## 15. Outputs and Results

The system generates structured analytical and visual outputs designed for operational use.

### Interpretation of Results

- **Demonstration Environment**: The current frontend implementation renders synthetic datasets generated by seeded pseudo-random distributions conforming to valid Zod API schemas. These outputs demonstrate the functional workflow, layout geometry, blending mechanics, and rendering performance of the system.
- **Operational Meaning**: In live deployment, outputs represent certified meteorological assessments. A reported ETA of 28 minutes for a severe convective cell with a 32-knot closing velocity provides air traffic management with sufficient lead time to re-sequence arrival flows or hold departures before severe weather impacts the airfield.

---

## 16. Validation and Reliability

The system incorporates a dedicated Model Validation suite that continuously audits forecasting performance against ground truth observations.

### Validation Mechanisms Implemented in the System:

- **Continuous Error Metrics**: Computes RMSE, MAE, and Bias for temperature ($^\circ\text{C}$), atmospheric pressure ($\text{hPa}$), and visibility ($\text{km}$) over a rolling 24-hour evaluation window.
- **Binary Classification Auditing**: Constructs a $2\times 2$ confusion matrix (True Positives, False Positives, False Negatives, True Negatives) for thunderstorm and SSW occurrence, deriving precision, recall, and F1 scores.
- **Skill Score Benchmarking**: Evaluates model performance against persistence baselines to ensure model guidance provides measurable value over static assumptions.
- **Ingestion Health Monitoring**: Tracks per-feed arrival latencies, schedule offsets, and percentage success rates across all data sources, alerting operators to delayed or offline feeds.

---

## 17. Assumptions

The interpretation of the system relies on several baseline operational assumptions:

- **Observation Reliability**: Ground truth station sensors (AWS) are assumed to be calibrated according to World Meteorological Organization (WMO) standards, with bad sensor readings filtered during ingestion.
- **Linear Advection in Nowcasting**: The nowcasting extrapolation assumes convective storm cell translation vectors maintain approximate linear motion over 15 to 45 minute intervals.
- **Transition Boundary Continuity**: The hybrid blending formulation assumes that a linear ramp between hours 3 and 6 sufficiently smooths differences between nowcasting and numerical model states without introducing physically unrealistic gradients.
- **Spatial Resolution Limits**: Global and regional numerical models are assumed to provide background synoptic guidance, while localized convective initiation requires observational satellite and radar verification.
- **Synthetic Demonstration Data**: In the prototype implementation, data values are generated via seeded algorithms to demonstrate data contracts, component rendering, and user interactions.

---

## 18. Technical Implementation Approach

The technical architecture prioritizes client-side rendering performance, type-safe API contracts, and modular state management.

### High-Level Architectural Highlights:

- **Client-Side GeoTIFF Decoding**: Binary Cloud-Optimized GeoTIFFs are decoded directly in the browser using `geotiff.js`, eliminating the need for server-side raster tile slicing.
- **WebGL Map Acceleration**: MapLibre GL provides high-performance hardware-accelerated vector and raster rendering, while Deck.gl handles GPU particle systems.
- **Strict Type Safety**: All internal data models are inferred directly from Zod schema definitions (`z.infer<typeof Schema>`), ensuring strict contract enforcement between API responses and UI components.
- **Dynamic Layout Engine**: Floating HUD panels measure DOM bounding boxes dynamically, interpolating positions via Framer Motion spring physics to prevent panel overlap across screen resolutions.

---

## 19. Reproducibility

To inspect, run, or reproduce the processing workflows and interface rendering:

### Runtime Requirements

- **Node.js**: Version 20.x or higher
- **Package Manager**: `npm` (version 9.x or higher)
- **Modern Web Browser**: Chromium-based, Firefox, or Safari with WebGL 2.0 support enabled

### Reproduction Steps

1. Clone the repository and navigate to the project root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Execute the local development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in a WebGL-compatible browser.
5. To execute the static build and type validation check:
   ```bash
   npm run build
   ```

### Configuration and Parameters

- **Model Blending Constants**: Blending start and end parameters are defined in `src/lib/hybridForecast.ts` (`TRANSITION_START = 3`, `TRANSITION_END = 6`).
- **Wind Vector Normalization**: Speed scaling limits are configured in `src/pages/GeoCommand/components/WindParticleLayer.tsx` (`WIND_SPEED_SCALE_MAX_KT = 100`).
- **Operational Thresholds**: Safety boundaries are configured in `src/lib/status.ts` (`computeOpStatus`).

---

## 20. Discussion

The CDI MetOps system demonstrates how complex, heterogeneous meteorological datasets can be organized into a focused, human-centered decision cockpit. By moving away from conventional multi-window dashboard layouts and establishing the spatial map as the primary workspace, the system maintains continuous situational awareness.

The implementation resolves key friction points in operational meteorology:

- **Bridging the Temporal Gap**: The hybrid blending engine demonstrates a practical method for joining observation-driven nowcasts and physics-driven numerical forecasts. Operators interact with a single continuous timeline rather than consulting separate systems.
- **Eliminating Visual Latency**: The dual-source double-buffering architecture proves that rich raster heatmaps can be explored across time without the flashing and blank frames that plague standard web GIS implementations.
- **Contextual Risk Extraction**: Translating raw variables into direct operational tiers (Operational, Caution, Restricted) ensures that meteorological data immediately informs tactical aviation decisions.

The design establishes a clear path for operational weather consoles, showing that scientific precision, visual clarity, and rendering performance can be unified within a modern web architecture.

---

## 21. Conclusion

The Climate Decision Intelligence Meteorological Operations console addresses the challenge of managing localized mesoscale weather hazards across aerodromes. By integrating short-range numerical forecasts, high-resolution satellite nowcasts, ground-based station observations, and vector GIS infrastructure, the platform establishes a unified operational picture.

Through its mathematical blending engine, geodesic storm trajectory calculations, client-side raster normalization, and GPU-accelerated double-buffering, the system bridges the gap between complex raw atmospheric telemetry and actionable flight safety decisions. The resulting architecture provides aerodrome operators and meteorology officers with a coherent, zero-latency tool for monitoring, understanding, and responding to rapidly evolving atmospheric threats.

---

## 22. Technical Glossary

- **AWS (Automatic Weather Station)**: An automated surface observation station measuring temperature, pressure, humidity, wind, and precipitation.
- **Bias (Mean Error)**: The average difference between forecast values and observed truth, indicating systematic model over- or under-prediction.
- **BUFR (Binary Universal Form for the Representation of meteorological data)**: A standard WMO binary data format used for point and upper-air observations.
- **CAVOK (Ceiling and Visibility OK)**: Aviation code indicating visibility $\ge 10\text{ km}$, no clouds below $5000\text{ ft}$, and no significant weather phenomena.
- **Ceiling**: The height above ground level of the base of the lowest layer of clouds covering more than half the sky (broken or overcast).
- **COG (Cloud-Optimized GeoTIFF)**: A GeoTIFF file structured to allow HTTP range requests, enabling efficient streaming and client-side extraction of raster subsets.
- **CRS (Coordinate Reference System)**: A coordinate-based system used to locate geographical entities on the Earth's surface (e.g., EPSG:4326 WGS84).
- **F1 Score**: The harmonic mean of precision and recall for binary event prediction.
- **GeoJSON**: An open standard geospatial data interchange format based on JSON.
- **GPS-RO (GPS Radio Occultation)**: A remote sensing technique using GPS satellite signals to measure atmospheric temperature and moisture profiles.
- **HEM (Hydro-Estimator Model)**: A satellite-based algorithm estimating rainfall rates from infrared cloud top temperatures.
- **ICAO**: International Civil Aviation Organization, whose four-letter identifiers designate international and military airfields.
- **IFR (Instrument Flight Rules)**: Operational regulations governing flight when meteorological conditions fall below visual minima.
- **MAE (Mean Absolute Error)**: A statistical measure of forecast error magnitude without considering error direction.
- **METAR**: An aviation routine weather report issued at regular half-hourly or hourly intervals.
- **MOS (Model Output Statistics)**: A post-processing technique using statistical regression to correct systematic biases in raw numerical weather prediction output.
- **MSLP / QNH**: Mean Sea Level Pressure, representing atmospheric barometric pressure adjusted to sea level.
- **Nowcasting**: Meteorological forecasting over short time horizons (typically 0 to 6 hours) based on extrapolation of observational telemetry.
- **NWP (Numerical Weather Prediction)**: Mathematical models of the atmosphere solved using supercomputing infrastructure.
- **Radiosonde**: A balloon-borne instrument package measuring vertical profiles of pressure, temperature, humidity, and wind.
- **RMSE (Root Mean Square Error)**: The square root of the mean squared differences between forecast predictions and ground truth observations.
- **Skill Score**: A comparative metric evaluating forecast accuracy against a reference benchmark, such as persistence.
- **SSW (Strong Surface Wind)**: Sustained wind velocity or gusts reaching or exceeding 25 knots at 10 meters above ground level.
- **SYNOP**: Surface synoptic weather observation report transmitted at fixed synoptic hours.
- **VFR (Visual Flight Rules)**: Operational regulations governing flight under visual meteorological conditions.
- **Zonal and Meridional Wind ($U, V$)**: Orthogonal Cartesian wind vector components representing East-West ($U$) and North-South ($V$) flow.
