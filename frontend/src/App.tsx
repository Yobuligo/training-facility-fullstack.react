import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useProfileDetailsSettingsStorage } from "./hooks/useProfileDetailsSettingsStorage";
import { useSessionStorage } from "./lib/userSession/hooks/useSessionStorage";
import { AppRouter } from "./routes/AppRouter";
import { IUserProfile } from "./shared/model/IUserProfile";

export const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<IUserProfile | undefined>(
    undefined
  );
  return (
    <AppContext.Provider
      value={{
        errorMessage: useState(""),
        profileDetailsSettings: useProfileDetailsSettingsStorage(),
        userProfile: [userProfile, setUserProfile],
        session: useSessionStorage(),
      }}
    >
      <RouterProvider router={AppRouter} />
    </AppContext.Provider>
  );
};
