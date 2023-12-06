import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_BEGIN,
  HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_SUCCESS,
  HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_FAILURE,
  HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_DISMISS_ERROR,
} from './constants';
import Axios from 'axios';

export function getClimateRiskInMostDenseCounties(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_BEGIN,
    });

    Axios.defaults.baseURL = 'http://127.0.0.1:8080';
    const url = `/climateRiskInMostDenseCounties`;
    return Axios(url, {
      method: 'get',
      responseType: 'json',
    })
      .then(res => {
        const { data, headers } = res;
        dispatch({
          type: HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_SUCCESS,
          data: data,
        });
      })
      .catch(err => {
        // dispatch({
        //   type: HOME_GET_LOWEST_RISK_CENSUS_TRACTS_FAILURE,
        //   data: mockData,
        // });
        // dispatch({
        //   type: HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_SUCCESS,
        //   data: mockData,
        // });
        // message.error("failed to download")
      });
  };
}

export function dismissGetClimateRiskInMostDenseCountiesError() {
  return {
    type: HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_DISMISS_ERROR,
  };
}

export function useGetClimateRiskInMostDenseCounties() {
  const dispatch = useDispatch();

  const { getClimateRiskInMostDenseCountiesPending, getClimateRiskInMostDenseCountiesError } = useSelector(
    state => ({
      getClimateRiskInMostDenseCountiesPending: state.home.getClimateRiskInMostDenseCountiesPending,
      getClimateRiskInMostDenseCountiesError: state.home.getClimateRiskInMostDenseCountiesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getClimateRiskInMostDenseCounties(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetClimateRiskInMostDenseCountiesError());
  }, [dispatch]);

  return {
    getClimateRiskInMostDenseCounties: boundAction,
    getClimateRiskInMostDenseCountiesPending,
    getClimateRiskInMostDenseCountiesError,
    dismissGetClimateRiskInMostDenseCountiesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getClimateRiskInMostDenseCountiesPending: true,
        getClimateRiskInMostDenseCountiesError: null,
      };

    case HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_SUCCESS:
      // The request is success
      return {
        ...state,
        climateRiskInMostDenseCountiesResults:action.data,
        getClimateRiskInMostDenseCountiesPending: false,
        getClimateRiskInMostDenseCountiesError: null,
      };

    case HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_FAILURE:
      // The request is failed
      return {
        ...state,
        getClimateRiskInMostDenseCountiesPending: false,
        getClimateRiskInMostDenseCountiesError: action.data.error,
      };

    case HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getClimateRiskInMostDenseCountiesError: null,
      };

    default:
      return state;
  }
}
