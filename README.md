# htx air explorer
## visualizing air quality in houston, texas
![htxae-preview](https://user-images.githubusercontent.com/28833281/115839228-0d88c100-a3e0-11eb-8b02-201f817429af.png)

### Domain Description
Houston is the hub of chemical manufacturing and energy production in the nation
with many refineries and chemical facilities which are under regulation to comply with air
quality laws. To monitor the air quality and potential emissions across the state, the Texas
Commission on Environmental Quality's (TCEQ) has automated gas chromatograph (AutoGC)
monitoring sites to monitor several compounds such as benzene, toluene, ethyl benzene,
xylenes, and 1,3-butadiene. Additionally, these sites record meteorological data such as wind
that can impact air quality and distribution of any emissions and can be used to calculate
Air Quality Index (AQI).

However, to an ordinary citizen, these readings may be difficult to understand and any
regulations can be difficult to understand. To address this, a visualization tool would be
useful to visualize the air quality data in comprehensible format to understand trends of air
quality over time and areas of high concentration of chemical compounds. My target user
would be citizens who are interested in understanding more about air quality in Texas with
limited technical knowledge about emissions and environmental compliance.

### Brief overview of the dataset
My core dataset is from the Kinder Urban Data Portal which is a collection of data from TCEQ
monitoring sites. The data format is a .csv file that spans data from 24 years (1997-2020) with >50 compounds. I plan to potentially extend the dataset with EPA AirNow data from their API and compliance data from TCEQ to understand where citations have occurred. I
could also compare with national emissions levels/averages.

### Dataset Sources
- Core Dataset: https://www.kinderudp.org/#/datasetCatalog/qrrmeybylzpq
- AirNow: https://docs.airnowapi.org/
- TCEQ AQI: https://www.tceq.texas.gov/cgi-bin/compliance/monops/aqi_rpt.pl
- TCEQ AutoGC:
https://www.tceq.texas.gov/cgi-bin/compliance/monops/agc_yearly_summary.pl
- EPA Emissions Trends:
https://www.epa.gov/air-emissions-inventories/air-pollutant-emissions-trends-data
