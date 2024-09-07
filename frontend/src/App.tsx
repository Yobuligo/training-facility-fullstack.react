import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useProfileDetailsSettingsStorage } from "./hooks/useProfileDetailsSettingsStorage";
import { ToastSection } from "./lib/toast/components/toastSection/ToastSection";
import { ToastContext } from "./lib/toast/context/ToastContext";
import { IToast } from "./lib/toast/model/IToast";
import { useSessionStorage } from "./lib/userSession/hooks/useSessionStorage";
import { IUserInternal } from "./model/IUserInternal";
import { AppRouter } from "./routes/AppRouter";

export const App: React.FC = () => {
  const [user, setUser] = useState<IUserInternal | undefined>(undefined);
  const [toasts, setToasts] = useState<IToast[]>([]);
  return (
    <AppContext.Provider
      value={{
        profileDetailsSettings: useProfileDetailsSettingsStorage(),
        user: [user, setUser],
        session: useSessionStorage(),
      }}
    >
      <ToastContext.Provider value={{ toasts: [toasts, setToasts] }}>
        <ToastSection />
        <RouterProvider router={AppRouter} />
      </ToastContext.Provider>
    </AppContext.Provider>
  );
};
