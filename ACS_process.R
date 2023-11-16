#!/usr/bin/env Rscript
install.packages(tidyverse)
install.packages(glue) 

library(glue)
library(tidyverse)

args <- commandArgs(trailingOnly=TRUE)
locACS <- arg[1]
strYear <- arg[2]

dfACD <- read.csv(locACS, skip = 1) %>% 
    select(Geography, starts_with("Estimate."))

lStringsToRemove <- c("Population.1.year.and.over..", "INDIVIDUAL.INCOME.IN.THE.PAST.12.MONTHS..IN.2021.INFLATION.ADJUSTED.DOLLARS...", 
                      "Moved..from.different.county..same.state..", "Moved..from.abroad..", "Moved..from.different..state..", "Moved..within.same.county..", "Total..")

dfSurveyResults <- dfACS %>% 
    separate(Geography, sep = "US", into = c(NA,"FIPSCode11"), extra = "merge") %>% 
    mutate(SurveyYear = strYear) %>% 
    # select(FIPSCode11, SurveyYear, Estimate..Total..Population.1.year.and.over) %>% 
    pivot_longer(names_to = "columns", cols = c(-FIPSCode11, -SurveyYear), values_to = "values", values_transform = as.numeric) %>% 
    mutate(columns = str_remove_all(columns, pattern = "Estimate..")) %>% 
    mutate(MigrationStatus = case_when(
                            startsWith(columns, "Moved..from.abroad..") ~ "Moved; from abroad", 
                            startsWith(columns, "Moved..from.different..state..") ~ 'Moved; from different state',
                            startsWith(columns, "Moved..from.different.county") ~ 'Moved; from different county', 
                            startsWith(columns, "Moved..within.same.county") ~ 'Moved; within same county',
                            startsWith(columns, "Total..") ~ 'Any'
                            )) %>% 
    mutate(columns  = str_remove_all(columns, regex(str_c("\\b",lStringsToRemove, "\\b", collapse = '|'), ignore_case = T))) %>% 
    mutate(columns = recode(columns,
        "Population.1.year.and.over" = "TotalPopulation",
        "AGE..Median.age..years." = "AgeMedian",
        "AGE..1.to.4.years" = "PopAge_1_4",
        "AGE..5.to.17.years" = "PopAge_5_17",
        "AGE..18.to.24.years" = "PopAge_18_24",
        "AGE..25.to.34.years" = "PopAge_25_34",
        "AGE..35.to.44.years" = "PopAge_35_44",
        "AGE..45.to.54.years" = "PopAge_45_54",
        "AGE..55.to.64.years" = "PopAge_55_64",
        "AGE..65.to.74.years" = "PopAge_65_74",
        "AGE..75.years.and.over" = "PopAge_75",
        "EDUCATIONAL.ATTAINMENT..Population.25.years.and.over" = "EducationMedian",
        "EDUCATIONAL.ATTAINMENT..Population.25.years.and.over..Less.than.high.school.graduate" = "PopEd_LessHigh",
        "EDUCATIONAL.ATTAINMENT..Population.25.years.and.over..High.school.graduate..includes.equivalency." = "PopEd_High",
        "EDUCATIONAL.ATTAINMENT..Population.25.years.and.over..Some.college.or.associate.s.degree" = "PopEd_SomeCol",
        "EDUCATIONAL.ATTAINMENT..Population.25.years.and.over..Bachelor.s.degree" = "PopEd_Bach",
        "EDUCATIONAL.ATTAINMENT..Population.25.years.and.over..Graduate.or.professional.degree" = "PopEd_GradCol",
        "Population.15.years.and.over..Median.income..dollars." = "IndividualIncomeMedian",
        "Population.15.years.and.over...1.to..9.999.or.loss" = "PopInc_9k",
        "Population.15.years.and.over...10.000.to..14.999" = "PopInc_10k_15k",
        "Population.15.years.and.over...15.000.to..24.999" = "PopInc_15k_25k",
        "Population.15.years.and.over...25.000.to..34.999" = "PopInc_25k_35k",
        "Population.15.years.and.over...35.000.to..49.999" = "PopInc_35k_50k",
        "Population.15.years.and.over...50.000.to..64.999" = "PopInc_50k_65k",
        "Population.15.years.and.over...65.000.to..74.999" = "PopInc_65k_75k",
        "Population.15.years.and.over...75.000.or.more" = "PopInc_75k",
        "HOUSING.TENURE..Population.1.year.and.over.in.housing.units..Householder.lived.in.owner.occupied.housing.units" = "PopOwner_1YearTenure",
    	"HOUSING.TENURE..Population.1.year.and.over.in.housing.units..Householder.lived.in.renter.occupied.housing.units" = "PopRenter_1YearTenure"
    )) %>% 
    pivot_wider(id_cols = c(FIPSCode11, SurveyYear, MigrationStatus), names_from = columns, values_from = values) %>% 
    mutate(SexRatio = as.numeric(SEX..Male) / as.numeric(SEX..Female)) %>% 
    select(SurveyYear, FIPSCode11, MigrationStatus, 
            TotalPopulation, SexRatio, AgeMedian,
            PopAge_1_4,PopAge_5_17,PopAge_18_24,PopAge_25_34,PopAge_35_44,PopAge_45_54,PopAge_55_64,PopAge_65_74,PopAge_75,
            EducationMedian,PopEd_LessHigh,PopEd_High,PopEd_SomeCol,PopEd_Bach,PopEd_GradCol,
            IndividualIncomeMedian,PopInc_9k,PopInc_10k_15k,PopInc_15k_25k,PopInc_25k_35k,PopInc_35k_50k,PopInc_50k_65k,PopInc_65k_75k,PopInc_75k,
            PopOwner_1YearTenure,PopRenter_1YearTenure)

dfSurveyResults %>% 
    write.csv(file = glue("IngestionReadyData/TBL_{year}_SurveyResults.csv"), row.names = FALSE)
