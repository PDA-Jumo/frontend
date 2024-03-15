import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/mainRouter";
import "./App.css";
import AuthProvider from "./components/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}
export default App;
