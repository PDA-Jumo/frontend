// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
//import userReducer from "./reducers/user";
import UserReducer from "./reducers/user";
//import userReducer from "./reducers/user";
import SearchReducer from "./reducers/recentsearch";

// export const rootReducer = combineReducers({
//   search: SearchReducer
// })

// const store = createStore(rootReducer);

// export const rootReducer = combineReducers({
//   search: SearchReducer
// })

// const store = createStore(rootReducer);

import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

const rootPersistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["search", "user"],
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    user: UserReducer,
    search: SearchReducer,
  })
);

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);
export { store, persistor };

export default store;
