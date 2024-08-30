import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useProfileDetailsSettingsStorage } from "./hooks/useProfileDetailsSettingsStorage";
import { useSessionStorage } from "./lib/userSession/hooks/useSessionStorage";
import { IUserInternal } from "./model/IUserInternal";
import { AppRouter } from "./routes/AppRouter";

export const App: React.FC = () => {
  const [user, setUser] = useState<IUserInternal | undefined>(undefined);
  return (
    <AppContext.Provider
      value={{
        errorMessage: useState(""),
        profileDetailsSettings: useProfileDetailsSettingsStorage(),
        user: [user, setUser],
        session: useSessionStorage(),
      }}
    >
      <RouterProvider router={AppRouter} />
    </AppContext.Provider>
  );
};
