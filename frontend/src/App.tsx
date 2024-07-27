import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { AppRouter } from "./routes/AppRouter";

export const App: React.FC = () => {
  return (
    <AppContext.Provider
      value={{
        errorMessage: useState(""),
        session: useSessionStorage(),
      }}
    >
      <RouterProvider router={AppRouter} />
    </AppContext.Provider>
  );
};
