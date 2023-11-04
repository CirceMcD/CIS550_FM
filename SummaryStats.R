# library(psych) 
# library(gtsummary)
# library(gapminder)
library(tidyverse)

## NRI Summary Stats 
NRI <- read.csv("/bioinfo/cmcdonald04/UPenn/NRI_Table_CensusTracts/NRI_Table_CensusTracts.csv")

NRIDict <- read.csv("/bioinfo/cmcdonald04/UPenn/NRI_Table_CensusTracts/NRIDataDictionary.csv") %>% 
    select(Field.Name, Field.Alias) %>% 
    rename(Measure = Field.Name, Label = Field.Alias)

NRI %>% 
    filter(STATE == "California") %>% 
    select(STATE, COUNTY, SOVI_SCORE, RISK_SCORE, EAL_VALT, CFLD_EALT, WFIR_EALT) %>% 
    pivot_longer(names_to = "Measure", values_to = "Value", cols = c(SOVI_SCORE, RISK_SCORE, EAL_VALT, CFLD_EALT, WFIR_EALT)) %>% 
    group_by(STATE, COUNTY, Measure) %>% 
    summarise(census_tracks = n(), 
                mean = mean(Value, na.rm = TRUE),
                sd   = sd(Value, na.rm = TRUE), 
                median = median(Value, na.rm = TRUE), 
                min = min(Value, na.rm = TRUE),
                max = max(Value, na.rm = TRUE)) %>% 
    left_join(NRIDict) %>% 
    write.csv("/bioinfo/cmcdonald04/UPenn/TBL_NRI_Summary_California.csv", row.names = FALSE)

## Census Summary Stats
Census <- read.csv("/bioinfo/cmcdonald04/UPenn/ACSST5Y2021.S0701_2023-09-30T193200/ACSST5Y2021.S0701-Data.csv") %>%
  filter(!row_number() %in% c(1))

CensusDict <- read.csv("/bioinfo/cmcdonald04/UPenn/ACSST5Y2021.S0701_2023-09-30T193200/ACSST5Y2021.S0701-Column-Metadata.csv") %>% 
    rename(Measure = Column.Name)

Census %>% 
    select(ends_with("E")) %>% 
    select(S0701_C01_001E, S0701_C02_001E, S0701_C03_001E, S0701_C04_001E, S0701_C05_001E, S0701_C03_048E) %>% 
    mutate_all(as.numeric) %>% 
    pivot_longer(names_to = "Measure", values_to = "Value", cols = c(S0701_C01_001E, S0701_C02_001E, S0701_C03_001E, S0701_C04_001E, S0701_C05_001E, S0701_C03_048E)) %>% 
    group_by(Measure) %>% 
    summarise(census_tracks = n(), 
                mean = mean(Value, na.rm = TRUE),
                sd   = sd(Value, na.rm = TRUE), 
                median = median(Value, na.rm = TRUE), 
                min = min(Value, na.rm = TRUE),
                max = max(Value, na.rm = TRUE)) %>% 
    left_join(CensusDict) %>% 
    mutate(Label = str_replace_all(Label, pattern = "!!", " ")) %>% 
    write.csv("/bioinfo/cmcdonald04/UPenn/TBL_Census_Summary_Pennsylvania.csv", row.names = FALSE)
    
