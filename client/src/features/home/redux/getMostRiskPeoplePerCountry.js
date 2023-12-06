import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_BEGIN,
  HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_SUCCESS,
  HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_FAILURE,
  HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_DISMISS_ERROR,
} from './constants';

export function getMostRiskPeoplePerCountry(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetMostRiskPeoplePerCountryError() {
  return {
    type: HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_DISMISS_ERROR,
  };
}

export function useGetMostRiskPeoplePerCountry() {
  const dispatch = useDispatch();

  const { getMostRiskPeoplePerCountryPending, getMostRiskPeoplePerCountryError } = useSelector(
    state => ({
      getMostRiskPeoplePerCountryPending: state.home.getMostRiskPeoplePerCountryPending,
      getMostRiskPeoplePerCountryError: state.home.getMostRiskPeoplePerCountryError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getMostRiskPeoplePerCountry(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetMostRiskPeoplePerCountryError());
  }, [dispatch]);

  return {
    getMostRiskPeoplePerCountry: boundAction,
    getMostRiskPeoplePerCountryPending,
    getMostRiskPeoplePerCountryError,
    dismissGetMostRiskPeoplePerCountryError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getMostRiskPeoplePerCountryPending: true,
        getMostRiskPeoplePerCountryError: null,
      };

    case HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_SUCCESS:
      // The request is success
      return {
        ...state,
        getMostRiskPeoplePerCountryPending: false,
        getMostRiskPeoplePerCountryError: null,
      };

    case HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_FAILURE:
      // The request is failed
      return {
        ...state,
        getMostRiskPeoplePerCountryPending: false,
        getMostRiskPeoplePerCountryError: action.data.error,
      };

    case HOME_GET_MOST_RISK_PEOPLE_PER_COUNTRY_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getMostRiskPeoplePerCountryError: null,
      };

    default:
      return state;
  }
}
