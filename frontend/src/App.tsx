import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useProfileDetailsSettingsStorage } from "./hooks/useProfileDetailsSettingsStorage";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { AppRouter } from "./routes/AppRouter";

import { DateTimeIterator } from "./core/services/date/DateTimeIterator";
const test = () => {
  // Mon Sep 30 2024 00:00:00 GMT+0200
  // Sun Nov 03 2024 23:59:59 GMT+0100

  const start = new Date(2024, 9, 30, 0, 0, 0);
  const end = new Date(2024, 11, 3, 23, 59, 59);

  DateTimeIterator.iterate(start, end, (current) => {
    console.log(current.toString());
  });
};

test()

export const App: React.FC = () => {
  return (
    <AppContext.Provider
      value={{
        errorMessage: useState(""),
        profileDetailsSettings: useProfileDetailsSettingsStorage(),
        session: useSessionStorage(),
      }}
    >
      <RouterProvider router={AppRouter} />
    </AppContext.Provider>
  );
};
