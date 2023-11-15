const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

// Route 1. Page 1 Drop Downs (DD1_1, DD1_2, DD1_3), States, Counties and FIPS_Names 
const communityResilienceSuggest = async function(req, res){
  connection.query(`
  SELECT DISTINCT c.State, c.County, c.FIPSCode11, Concat(c.State,' ',c.County,' ',RIGHT(c.FIPSCode11, 6)) AS Name
  FROM CTract c
  ORDER BY Name ASC
`, (err, data) => {
  if (err || data.length === 0) {
    console.log(err);
    res.json([]);
  } else {
    res.json([{
      state: data[0].State,
      county: data[0].County,
      fipsCode11: data[0].FIPSCode11,
      name: data[0].Name
    }]);
  }
  });
}

// Route 2. Page 1 Form, Submits the form on Page 1 with parameters for selectedState, selectedCounty and selectedFIPSCode11
const communityResiliencePost = async function(req, res){
  const selectedState = req.body.selectedState === 'PA';                   //TODO This default may not work
  const selectedCounty = req.body.selectedCounty === 'Philadelphia County';//TODO This default may not work
  const selectedFIPSCode11 = req.body.selectedFIPSCode11 === '37980';      //TODO This default may not work
  connection.query(`
  SELECT c.FIPSCode11, c.State, c.County, c.SocialVulnerabilityScore, c.CommunityResilienceScore
  FROM CTract c 
  WHERE c.State = ${selectedState} AND c.County = ${selectedCounty} AND c.FIPSCode11 = ${selectedFIPSCode11}
`, (err, data) => {
  if (err || data.length === 0) {
    console.log(err);
    res.json([]);
  } else {
    res.json([{
      fipsCode11: data[0].FIPSCode11,
      state: data[0].State,
      county: data[0].County,
      socialVulnerabilityScore: data[0].SocialVulnerabilityScore,
      communityResilienceScore: data[0].CommunityResilienceScore
    }]);
  }
  });
}

// Route 3. Page 2 Drop Downs, State, Counties and Climate Change Impact Categories
const censusTractFilterSuggest = async function(req, res){
  connection.query(`
  SELECT DISTINCT c.County, c.State, r.HazardType 
  FROM CTract c JOIN RiskProfile r ON c.FIPSCode11 = r.FIPSCode11 
`, (err, data) => {
  if (err || data.length === 0) {
    console.log(err);
    res.json([]);
  } else {
    res.json([{
      state: data[0].state,
      county: data[0].county,
      fipsCode11: data[0].FIPSCode11,
      Name: data[0].Name
    }]);
  }
  });
}

// Route 4. Page 2 Form, Census Tract Filter Set View
// TODO - This query needs to be redone so that filtering isn't done on the front end, but we are waiting on that so we can test performance in stages. 
// TODO - Redone query will be like HW2 #9 Search Songs
const censusTractFilterPost = async function(req, res){
  const selectedState = req.body.selectedState === 'PA';
  const selectedCounties = req.body.selectedCounties.split(',') === "['Philadelphia County']"; // TODO: This may not work, here or in query
  const selectedHazardTypes = req.body.selectedHazardTypes.split(',') === "['']";              // TODO: This may not work, here or in query
  connection.query(`
  SELECT  c.FIPSCode11, c.State, c.County, s.TotalPopulaton, c.RiskScore, c.SocialVulnerabilityScore, c.CommunityResilienceScore, s.IndividualIncomeMedian, s.SexRatio, s.PopAge_1_4, s.PopAge_5_17, s.PopAge_18_24, s.PopAge_25_34, s.PopAge_35_44, s.PopAge_45_54, s.PopAge_55_64, s.PopAge_65_74, s.PopAge_75, s.PopInc_9k, s.PopInc_10k_15k, s.PopInc_25k_35k, s.PopInc_35k_50k, s.PopInc_50k_65k, s.PopInc_65k_75k, s.PopInc_75k, s.PopEd_Bach, s.PopEd_GradCol, s.PopEd_High, s.PopEd_LessHigh, s.PopEd_SomeCol'
  FROM CTract c
  JOIN SurveyResults s ON c.FIPSCode11 = s.FIPSCode11
  WHERE c.State = ${selectedState} AND c.County IN ${selectedCounties} AND c.HazardTypes IN ${selectedHazardTypes}
`, (err, data) => {
  if (err || data.length === 0) {
    console.log(err);
    res.json([]);
  } else {
    res.json([{
      communityResilienceScore: data.CommunityResilienceScore,
      county: data.County,
      fIPSCode11: data.FIPSCode11,
      individualIncomeMedian: data.IndividualIncomeMedian,
      popAge_1_4: data.PopAge_1_4,
      popAge_18_24: data.PopAge_18_24,
      popAge_25_34: data.PopAge_25_34,
      popAge_35_44: data.PopAge_35_44,
      popAge_45_54: data.PopAge_45_54,
      popAge_5_17: data.PopAge_5_17,
      popAge_55_64: data.PopAge_55_64,
      popAge_65_74: data.PopAge_65_74,
      popAge_75: data.PopAge_75,
      popEd_Bach: data.PopEd_Bach,
      popEd_GradCol: data.PopEd_GradCol,
      popEd_High: data.PopEd_High,
      popEd_LessHigh: data.PopEd_LessHigh,
      popEd_SomeCol: data.PopEd_SomeCol,
      popInc_10k_15k: data.PopInc_10k_15k,
      popInc_25k_35k: data.PopInc_25k_35k,
      popInc_35k_50k: data.PopInc_35k_50k,
      popInc_50k_65k: data.PopInc_50k_65k,
      popInc_65k_75k: data.PopInc_65k_75k,
      popInc_75k: data.PopInc_75k,
      popInc_9k: data.PopInc_9k,
      riskScore: data.RiskScore,
      sexRatio: data.SexRatio,
      socialVulnerabilityScore: data.SocialVulnerabilityScore,
      state: data.State,
      totalPopulaton: data.TotalPopulaton
    }]);
  }
  });  
}

// Route 5. TBL3_1, Returns a list of census tracts ordered descending by risk scores.
// Paginated
const highestRiskCensusTracts = async function(req, res){
  const page = (req.query.page > 0) ? req.query.page : 1;               // If no page is passed into the query, it defaults to 1
  const pageSize = (req.query.page_size > 0) ? req.query.page_size : 10;// If no page_size is passed into the query, it defaults to 10 
  // TODO - I redid this query, because what we had in the Milestone 3 doc didn't make sense. However, I have not tested it and it may need help.
  // TODO - What will the default value be in each _Score when there is no record for it?
  connection.query(`
  SELECT DISTINCT CTract.State, CTract.County, CTract.FIPSCode11, Concat(CTract.State,' ',CTract.County,' ',RIGHT(CTract.FIPSCode11, 6)) AS Name, RiskProfile.RiskScore, 
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Avalanche') AS 'Avalanche_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Coastal Flooding') AS 'Coastal_Flooding_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Cold Wave') AS 'Cold_Wave_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Drought') AS 'Drought_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Earthquake') AS 'Earthquake_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Hail') AS 'Hail_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Heat Wave') AS 'Heat_Wave_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Ice Storm') AS 'Ice_Storm_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Landslide') AS 'Landslide_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Lightning') AS 'Lightning_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Riverine Flooding') AS 'Riverine_Flooding_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Strong Wind') AS 'Strong_Wind_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Tornado') AS 'Tornado_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Tsunami') AS 'Tsunami_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Volcanic Actvity') AS 'Volcanic_Actvity_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Wildfire') AS 'Wildfire_Score',
  (SELECT AnnualLossScore FROM RiskProfile WHERE HazardType = 'Winter Weather') AS 'Winter_Weather_Score'
  FROM CTract 
    JOIN RiskProfile ON CTract.FIPSCode11 = RiskProfile.FIPSCode11
  ORDER BY RiskProfile.RiskScore DESC
  LIMIT ` + pageSize + ` OFFSET ` + ((page-1)*pageSize) // Where page will always be geq 1.
, (err, data) => {
  if (err || data.length === 0) {
    console.log(err);
    res.json([]);
  } else {
    res.json([{
      county: data[0].County,
      fipsCode11: data[0].FIPSCode11,
      name: data[0].Name,
      state: data[0].State,
      avalancheScore: data[0].AvalancheScore,
      coastalFloodingScore: data[0].CoastalFloodingScore,
      coldWaveScore: data[0].ColdWaveScore,
      droughtScore: data[0].DroughtScore,
      earthquakeScore: data[0].EarthquakeScore,
      hailScore: data[0].HailScore,
      heatWaveScore: data[0].HeatWaveScore,
      iceStormScore: data[0].IceStormScore,
      landslideScore: data[0].LandslideScore,
      lightningScore: data[0].LightningScore,
      riverineFloodingScore: data[0].RiverineFloodingScore,
      strongWindScore: data[0].StrongWindScore,
      tornadoScore: data[0].TornadoScore,
      tsunamiScore: data[0].TsunamiScore,
      volcanicActvityScore: data[0].VolcanicActvityScore,
      wildfireScore: data[0].WildfireScore,
      winterWeatherScore: data[0].WinterWeatherScore
    }]);
  }
  });
}

// Route 6. TBL3_2, Returns a list of census tracts ordered descending by migration levels.
// Paginated
const highestMigrationCensusTracts = async function(req, res){
  const page = (req.query.page > 0) ? req.query.page : 1;               // If no page is passed into the query, it defaults to 1
  const pageSize = (req.query.page_size > 0) ? req.query.page_size : 10;// If no page_size is passed into the query, it defaults to 10 
  connection.query(`
  WITH TotalMigration AS (SELECT SUM(TotalPopulation) AS MigrationLevel, FIPSCode11 
                          FROM SurveyResults 
                          WHERE MigrayionStatus = 'Moved; from abroad' OR MigrationStatus = 'Moved; from different state' OR MigrationStatus = 'Moved; from different county' 
                          GROUP BY FIPSCode11)
  SELECT c.State, c.County, t.MigrationLevel, Concat(c.State,' ',c.County,' ',RIGHT(c.FIPSCode11, 6)) AS Name
  FROM TotalMigration t
  LEFT JOIN CTract c ON c.FIPSCode11 = t.FIPSCode11 
  LIMIT ` + pageSize + ` OFFSET ` + ((page-1)*pageSize) // Where page will always be geq 1.
, (err, data) => {
  if (err || data.length === 0) {
    console.log(err);
    res.json([]);
  } else {
    res.json([{
      county: data[0].County,
      migrationLevel: data[0].MigrationLevel, 
      name: data[0].Name,    
      state: data[0].State,
      totalMigration: data[0].TotalMigration
    }]);
  }
  });
}

// Route 7. TBL4_1, Average Climate Resilience Score by Population Weighted Census Tract, Grouped by State
// Paginated
const averageClimateRiskByIncome = async function(req, res){ 
  const page = (req.query.page > 0) ? req.query.page : 1;               // If no page is passed into the query, it defaults to 1
  const pageSize = (req.query.page_size > 0) ? req.query.page_size : 10;// If no page_size is passed into the query, it defaults to 10  
  // TODO: Is this calculating what it says it needs to in the description, above? Is it weighting by population?
  connection.query(`
  SELECT State, AVG(RiskScore) AS 'AverageClimateRiskScore' 
  FROM CTract
  GROUP BY State
  HAVING AverageClimateRiskScore IS NOT NULL
  ORDER BY AverageClimateRiskScore ASC
  LIMIT ` + pageSize + ` OFFSET ` + ((page-1)*pageSize) // Where page will always be geq 1.
, (err, data) => {
  if (err || data.length === 0) {
    console.log(err);
    res.json([]);
  } else {
    res.json([{
      averageClimateRiskScore: data[0].AverageClimateRiskScore,
      state: data[0].State
    }]);
  }
  });  
}

// Route 8. TBL4_2, Returns data related to average climate risk scores by income groups for all states.
// Paginated
const averageClimateRiskByState = async function(req, res){
  const page = (req.query.page > 0) ? req.query.page : 1;               // If no page is passed into the query, it defaults to 1
  const pageSize = (req.query.page_size > 0) ? req.query.page_size : 10;// If no page_size is passed into the query, it defaults to 10
  connection.query(`
  WITH Anys AS
  (SELECT FIPSCode11, TotalPopulation, PopInc_9k, PopInc_10k_15k, PopInc_15k_25k, PopInc_25k_35k, PopInc_35k_50k, PopInc_50k_65k, PopInc_65k_75k, PopInc_75k
  FROM SurveyResults
  WHERE MigrationStatus = 'Any'),
  FIPs_Risk AS
  (SELECT FIPSCode11, RiskScore, State FROM CTract)
  SELECT * FROM Anys LEFT JOIN FIPs_Risk ON Anys.FIPSCode11 = FIPs_Risk.FIPSCode11
  LIMIT ` + pageSize + ` OFFSET ` + ((page-1)*pageSize) // Where page will always be geq 1.
, (err, data) => {
  if (err || data.length === 0) {
    console.log(err);
    res.json([]);
  } else {
    res.json([{
      fipsCode11: data[0].FIPSCode11,
      popInc_10k_15k: data[0].PopInc_10k_15k,
      popInc_15k_25k: data[0].PopInc_15k_25k,
      popInc_25k_35k: data[0].PopInc_25k_35k,
      popInc_35k_50k: data[0].PopInc_35k_50k,
      popInc_50k_65k: data[0].PopInc_50k_65k,
      popInc_65k_75k: data[0].PopInc_65k_75k,
      popInc_75k: data[0].PopInc_75k,
      popInc_9k: data[0].PopInc_9k,
      riskScore: data[0].RiskScore,
      state: data[0].State,
      totalPopulation: data[0].TotalPopulation
    }]);
  }
  });
}

module.exports = {
  communityResilienceSuggest,   
  communityResiliencePost,      // Takes params: selectedState, selectedCounty, selectedFIPSCode11
  censusTractFilterSuggest,
  censusTractFilterPost,        // Takes params: selectedState, selectedCounties, selectedHazardTypes
  highestRiskCensusTracts,      // Takes params: page, pageSize
  highestMigrationCensusTracts, // Takes params: page, pageSize
  averageClimateRiskByIncome,   // Takes params: page, pageSize
  averageClimateRiskByState     // Takes params: page, pageSize
}
