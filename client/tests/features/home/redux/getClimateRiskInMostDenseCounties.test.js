import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_BEGIN,
  HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_SUCCESS,
  HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_FAILURE,
  HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getClimateRiskInMostDenseCounties,
  dismissGetClimateRiskInMostDenseCountiesError,
  reducer,
} from '../../../../src/features/home/redux/getClimateRiskInMostDenseCounties';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getClimateRiskInMostDenseCounties', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getClimateRiskInMostDenseCounties succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getClimateRiskInMostDenseCounties())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_SUCCESS);
      });
  });

  it('dispatches failure action when getClimateRiskInMostDenseCounties fails', () => {
    const store = mockStore({});

    return store.dispatch(getClimateRiskInMostDenseCounties({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetClimateRiskInMostDenseCountiesError', () => {
    const expectedAction = {
      type: HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_DISMISS_ERROR,
    };
    expect(dismissGetClimateRiskInMostDenseCountiesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_BEGIN correctly', () => {
    const prevState = { getClimateRiskInMostDenseCountiesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getClimateRiskInMostDenseCountiesPending).toBe(true);
  });

  it('handles action type HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_SUCCESS correctly', () => {
    const prevState = { getClimateRiskInMostDenseCountiesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getClimateRiskInMostDenseCountiesPending).toBe(false);
  });

  it('handles action type HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_FAILURE correctly', () => {
    const prevState = { getClimateRiskInMostDenseCountiesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getClimateRiskInMostDenseCountiesPending).toBe(false);
    expect(state.getClimateRiskInMostDenseCountiesError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_DISMISS_ERROR correctly', () => {
    const prevState = { getClimateRiskInMostDenseCountiesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLIMATE_RISK_IN_MOST_DENSE_COUNTIES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getClimateRiskInMostDenseCountiesError).toBe(null);
  });
});

