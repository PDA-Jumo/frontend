import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/mainRouter";
import "./App.css";
import AuthProvider from "./components/AuthProvider";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />;
      </AuthProvider>
    </Provider>
  );
}
export default App;
