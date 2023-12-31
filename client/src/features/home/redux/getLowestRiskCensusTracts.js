import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_GET_LOWEST_RISK_CENSUS_TRACTS_BEGIN,
  HOME_GET_LOWEST_RISK_CENSUS_TRACTS_SUCCESS,
  HOME_GET_LOWEST_RISK_CENSUS_TRACTS_FAILURE,
  HOME_GET_LOWEST_RISK_CENSUS_TRACTS_DISMISS_ERROR,
} from './constants';
import Axios from 'axios';

export function getLowestRiskCensusTracts(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_LOWEST_RISK_CENSUS_TRACTS_BEGIN,
    });

    // const mockData = [
    //   {
    //     "State": "string",
    //     "County": "string",
    //     "Risk_Score": 0,
    //     "Avalanche_Score": 0,
    //     "Coastal_Flooding_Score": 0,
    //     "Cold_Wave_Score": 0,
    //     "Drought_Score": 0,
    //     "Earthquake_Score": 0,
    //     "Hail_Score": 0,
    //     "Heat_Wave_Score": 0,
    //     "Ice_Storm_Score": 0,
    //     "Landslide_Score": 0,
    //     "Lightning_Score": 0,
    //     "Riverine_Flooding_Score": 0,
    //     "Strong_Wind_Score": 0,
    //     "Tornado_Score": 0,
    //     "Tsunami_Score": 0,
    //     "Volcanic_Activity_Score": 0,
    //     "Wildfire_Score": 0,
    //     "Winter_Weather_Score": 0
    //   },
    //   {
    //     "State": "string",
    //     "County": "string",
    //     "Risk_Score": 0,
    //     "Avalanche_Score": 0,
    //     "Coastal_Flooding_Score": 0,
    //     "Cold_Wave_Score": 0,
    //     "Drought_Score": 0,
    //     "Earthquake_Score": 0,
    //     "Hail_Score": 0,
    //     "Heat_Wave_Score": 0,
    //     "Ice_Storm_Score": 0,
    //     "Landslide_Score": 0,
    //     "Lightning_Score": 0,
    //     "Riverine_Flooding_Score": 0,
    //     "Strong_Wind_Score": 0,
    //     "Tornado_Score": 0,
    //     "Tsunami_Score": 0,
    //     "Volcanic_Activity_Score": 0,
    //     "Wildfire_Score": 0,
    //     "Winter_Weather_Score": 0
    //   }
    // ]
    
    Axios.defaults.baseURL = 'http://127.0.0.1:8080';
    const url = `/lowestRiskCensusTracts`;
    return Axios(url, {
      method: 'get',
      responseType: 'json',
    })
      .then(res => {
        const { data, headers } = res;
        dispatch({
          type: HOME_GET_LOWEST_RISK_CENSUS_TRACTS_SUCCESS,
          data: data,
        });
      })
      .catch(err => {
        // dispatch({
        //   type: HOME_GET_LOWEST_RISK_CENSUS_TRACTS_FAILURE,
        //   data: mockData,
        // });
        // dispatch({
        //   type: HOME_GET_LOWEST_RISK_CENSUS_TRACTS_SUCCESS,
        //   data: mockData,
        // });
        // message.error("failed to download")
      });
  };
}

export function dismissGetLowestRiskCensusTractsError() {
  return {
    type: HOME_GET_LOWEST_RISK_CENSUS_TRACTS_DISMISS_ERROR,
  };
}

export function useGetLowestRiskCensusTracts() {
  const dispatch = useDispatch();

  const { getLowestRiskCensusTractsPending, getLowestRiskCensusTractsError } = useSelector(
    state => ({
      getLowestRiskCensusTractsPending: state.home.getLowestRiskCensusTractsPending,
      getLowestRiskCensusTractsError: state.home.getLowestRiskCensusTractsError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getLowestRiskCensusTracts(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetLowestRiskCensusTractsError());
  }, [dispatch]);

  return {
    getLowestRiskCensusTracts: boundAction,
    getLowestRiskCensusTractsPending,
    getLowestRiskCensusTractsError,
    dismissGetLowestRiskCensusTractsError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_LOWEST_RISK_CENSUS_TRACTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getLowestRiskCensusTractsPending: true,
        getLowestRiskCensusTractsError: null,
      };

    case HOME_GET_LOWEST_RISK_CENSUS_TRACTS_SUCCESS:
      // The request is success
      return {
        ...state,
        lowestRiskCensusTractsResult: action.data,
        getLowestRiskCensusTractsPending: false,
        getLowestRiskCensusTractsError: null,
      };

    case HOME_GET_LOWEST_RISK_CENSUS_TRACTS_FAILURE:
      // The request is failed
      return {
        ...state,
        getLowestRiskCensusTractsPending: false,
        getLowestRiskCensusTractsError: action.data.error,
      };

    case HOME_GET_LOWEST_RISK_CENSUS_TRACTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getLowestRiskCensusTractsError: null,
      };

    default:
      return state;
  }
}
