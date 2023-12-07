# C.L.I.M.A.T.E.R.I.S.K.

This application, Climate-Linked Internal Migration Analysis Tool for Environmental Risk Information for Societal Knowledge (C.L.I.M.A.T.E.R.I.S.K.), wishes to add additional depth to the National Risk Index (NRI) through the incorporation of additional migration data collected annually as part of the American Community Survey. This data will provide a unique lens through which users can explore how their communities may change in the future through the combined impacts of climate change and migration. It will provide much needed demographic details to allow users to answer questions such as:
* Are low income households moving to areas with greater climate risk?
* Will migration patterns increase the number of children or elderly impacted by severe weather events?
* How many people might be expected to move to areas where infrastructure or resources might be more heavily relied upon to mitigate climate change? 
* Are more people expected to move to drought prone areas?
* Are more people expected to move to areas where air conditioning is required?
* Are more people expected to move areas threatened by sea level rise?


# Installation Instructions 

**Node.js v15.14.0** 

1. git clone https://github.com/CirceMcD/CIS550_FM.git
2. cd CIS550_FM/client; npm install; npm start
3. cd CIS550_FM/server; npm install; npm start

# Dependencies: 
* @ant-design/charts: ^1.3.6  
* @ant-design/icons: ^4.7.0  
* @babel/core: ^7.4.3
* @babel/runtime: ^7.17.8
* @svgr/webpack: 2.4.1
* antd: ^4.19.3
* axios: ^0.18.0
* babel-core: 7.0.0-bridge.0
* babel-eslint: 9.0.0
* babel-jest: 23.6.0
* babel-loader: 8.0.4
* babel-plugin-named-asset-import: ^0.3.0
* babel-preset-react-app: 7.0.2
* bfj: 6.1.1
* case-sensitive-paths-webpack-plugin: 2.1.2
* chalk: 2.4.1
* connected-react-router: ^6.2.2
* cross-env: ^5.2.0
* css-loader: 1.0.0
* dotenv: 6.0.0
* dotenv-expand: 4.2.0
* enzyme: ^3.8.0
* enzyme-adapter-react-16: ^1.8.0
* eslint: ^5.13.0
* eslint-config-react-app: ^3.0.8
* eslint-loader: 2.1.1
* eslint-plugin-flowtype: 2.50.1
* eslint-plugin-import: 2.14.0
* eslint-plugin-jsx-a11y: 6.1.2
* eslint-plugin-react: 7.11.1
* eslint-plugin-react-hooks: ^2.0.1
* file-loader: 2.0.0
* fork-ts-checker-webpack-plugin-alt: 0.4.14
* fs-extra: 7.0.0
* history: ^4.7.2
* html-webpack-plugin: 4.0.0-alpha.2
* identity-obj-proxy: 3.0.0
* jest: 23.6.0
* jest-pnp-resolver: 1.0.1
* jest-resolve: 23.6.0
* less: ^3.9.0
* less-loader: ^4.1.0
* mini-css-extract-plugin: 0.4.3
* nock: ^10.0.6
* optimize-css-assets-webpack-plugin: 5.0.1
* pnp-webpack-plugin: 1.1.0
* postcss-flexbugs-fixes: 4.1.0
* postcss-loader: 3.0.0
* postcss-preset-env: 6.3.1
* postcss-safe-parser: 4.0.1
* prettier: ^1.16.3
* react: ^16.8.6
* react-app-polyfill: ^0.2.0
* react-dev-utils: ^7.0.1
* react-dom: ^16.8.6
* react-hot-loader: ^4.12.12
* react-redux: ^7.1.1
* react-router-dom: ^5.0.1
* redux: ^4.0.1
* redux-logger: ^3.0.6
* redux-mock-store: ^1.5.3
* redux-thunk: ^2.3.0
* resolve: 1.8.1
* style-loader: 0.23.0
* terser-webpack-plugin: 1.1.0
* url-loader: 1.1.1
* webpack: 4.19.1
* webpack-dev-server: 3.1.14
* webpack-manifest-plugin: 2.0.4
* workbox-webpack-plugin: 3.6.3

# Data Cleaning: 
Data was cleaned in R (v4.2.0). Please refer to [data preprocessing](DataPreprocessing.Rmd) and [summary statistics](SummaryStats.R) scripts. 

# Data Ingestion: 
Please refer to the [table creation](TableCreation.sql) amd [data ingestion](DataIngestion.sql) scripts. 
