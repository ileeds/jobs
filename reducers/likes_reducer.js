import _ from 'lodash';
import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants';
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.likedJobs || INITIAL_STATE;
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'id');
    case CLEAR_LIKED_JOBS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
