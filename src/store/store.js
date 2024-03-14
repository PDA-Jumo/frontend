import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
//import userReducer from "./reducers/user";
import SearchReducer from "./reducers/recentsearch";

// export const rootReducer = combineReducers({
//   search: SearchReducer
// })

// const store = createStore(rootReducer);


import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

const rootPersistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["search"],
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    search: SearchReducer,
  })
);

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);
export { store, persistor };

export default store;