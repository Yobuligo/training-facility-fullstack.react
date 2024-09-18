import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useProfileDetailsSettingsStorage } from "./hooks/useProfileDetailsSettingsStorage";
import "./index.scss";
import { useLanguageStorage } from "./lib/language/useLanguageStorage";
import { ToastSection } from "./lib/toast/components/toastSection/ToastSection";
import { ToastContext } from "./lib/toast/context/ToastContext";
import { IToast } from "./lib/toast/model/IToast";
import { IUserInternal } from "./model/IUserInternal";
import { AppRouter } from "./routes/AppRouter";

export const App: React.FC = () => {
  const [user, setUser] = useState<IUserInternal | undefined>(undefined);
  const [toasts, setToasts] = useState<IToast[]>([]);

  return (
    <AppContext.Provider
      value={{
        language: useLanguageStorage(),
        profileDetailsSettings: useProfileDetailsSettingsStorage(),
        user: [user, setUser],
      }}
    >
      <ToastContext.Provider value={{ toasts: [toasts, setToasts] }}>
        <ToastSection />
        <RouterProvider router={AppRouter} />
      </ToastContext.Provider>
    </AppContext.Provider>
  );
};
