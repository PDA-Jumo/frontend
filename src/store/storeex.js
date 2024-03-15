import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";

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
// store에서 상태관리를 한다.
//
const rootPersistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user"],
};

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드
// store 저장되는 리듀서는 오직 1개
const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    user: userReducer,
  })
);

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);
export { store, persistor };

export default store;
