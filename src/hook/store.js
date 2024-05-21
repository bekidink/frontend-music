import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slice';
import userSaga  from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({serializableCheck: false, // Disable SerializableStateInvariantMiddleware
  immutableCheck: false,}).concat(sagaMiddleware),
});

sagaMiddleware.run(userSaga);
// Run other sagas here if needed

export default store;
