import { configureStore, combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore(rootReducer);

export default store;
