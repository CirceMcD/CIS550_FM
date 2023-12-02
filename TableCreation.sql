CREATE TABLE CTract
(
    FIPSCode11 INT(11) PRIMARY KEY,
    Name VARCHAR(20),
    Area DOUBLE,
    State VARCHAR(250),
    County VARCHAR(250),
    BuildingValue DOUBLE,
    AgriculturalValue DOUBLE,
    RiskScore DOUBLE,
    CommunityResilienceScore DOUBLE,
    SocialVulnerabilityScore DOUBLE
);

CREATE TABLE RiskProfile
(
    HazardType ENUM('Avalanche', 'Coastal Flooding', 'Cold Wave', 'Drought', 'Earthquake',
                   'Hail','Heat Wave','Hurricane','Ice Storm','Landslide',
                   'Lightning','Riverine Flooding','Strong Wind','Tornado',
                   'Tsunami','Volcanic Activity','Wildfire','Winter Weather'),
    FIPSCode11 INT(11),
    NumberOfEvents DOUBLE,
    AnnualLossBuildingValue DOUBLE,
    AnnualLossPopulation DOUBLE,
    AnnualLossTotal DOUBLE,
    AnnualLossScore DOUBLE,
    ExposureBuildingValue DOUBLE,
    ExposurePopulation DOUBLE,
    ExposureArea DOUBLE,
    ExposureTotal DOUBLE,
    PercentageLossPopulation DOUBLE,
    PercentageLossBuildings DOUBLE,
    PRIMARY KEY (HazardType, FIPSCode11),
    FOREIGN KEY (FIPSCode11) REFERENCES CTract(FIPSCode11)
);

CREATE TABLE SurveyResults
(
    SurveyYear YEAR,
    FIPSCode11 INT(11),
    MigrationStatus ENUM('Moved; from abroad', 'Moved; from different state',
                         'Moved; from different county', 'Moved; within same county', 'Any'),
    TotalPopulation DOUBLE,
    SexRatio DOUBLE,
    AgeMedian DOUBLE,
    PopAge_1_4 DOUBLE,
    PopAge_5_17 DOUBLE,
    PopAge_18_24 DOUBLE,
    PopAge_25_34 DOUBLE,
    PopAge_35_44 DOUBLE,
    PopAge_45_54 DOUBLE,
    PopAge_55_64 DOUBLE,
    PopAge_65_74 DOUBLE,
    PopAge_75 DOUBLE,
    EducationMedian DOUBLE,
    PopEd_LessHigh DOUBLE,
    PopEd_High DOUBLE,
    PopEd_SomeCol DOUBLE,
    PopEd_Bach DOUBLE,
    PopEd_GradCol DOUBLE,
    IndividualIncomeMedian DOUBLE,
    PopInc_9k DOUBLE,
    PopInc_10k_15k DOUBLE,
    PopInc_15k_25k DOUBLE,
    PopInc_25k_35k DOUBLE,
    PopInc_35k_50k DOUBLE,
    PopInc_50k_65k DOUBLE,
    PopInc_65k_75k DOUBLE,
    PopInc_75k DOUBLE,
    PopOwner_1YearTenure DOUBLE,
	  PopRenter_1YearTenure DOUBLE,
    PRIMARY KEY (SurveyYear, FIPSCode11),
    FOREIGN KEY (FIPSCode11) REFERENCES CTract(FIPSCode11)
);

CREATE TABLE CTractCord
(
    FIPSCode11 INT(11),
    LATITUDE DOUBLE,
    LONGITUDE DOUBLE,
    PRIMARY KEY (FIPSCode11),
    FOREIGN KEY (FIPSCode11) REFERENCES CTract(FIPSCode11)
);