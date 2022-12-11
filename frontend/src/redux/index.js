import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "sagas";
import * as UserRedux from "./user.redux";
import * as ErrorRedux from "./error.redux";

/* ------------- Assemble The Reducers ------------- */
export const appReducer = combineReducers({
  userRedux: UserRedux.reducer,
  errorRedux: ErrorRedux.reducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};

/* ------------- Redux Configuration ------------- */

/* ------------- Saga Middleware ------------- */
const sagaMiddleware = createSagaMiddleware();

// Create store
const store =
  process.env.NODE_ENV === "production"
    ? createStore(rootReducer, applyMiddleware(sagaMiddleware))
    : createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

// kick off root saga
sagaMiddleware.run(rootSaga);

export default store;
