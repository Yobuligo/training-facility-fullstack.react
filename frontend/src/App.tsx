import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { IDateTimeSpan } from "./core/services/date/IDateTimeSpan";
import { useAdminSettingsStorage } from "./hooks/useAdminSettingsStorage";
import { useProfileDetailsSettingsStorage } from "./hooks/useProfileDetailsSettingsStorage";
import "./index.scss";
import { useLanguageStorage } from "./lib/language/useLanguageStorage";
import { SP } from "./lib/serviceProvider/ServiceProvider";
import { ToastSection } from "./lib/toast/components/toastSection/ToastSection";
import { ToastContext } from "./lib/toast/context/ToastContext";
import { IToast } from "./lib/toast/model/IToast";
import { IUserInternal } from "./model/IUserInternal";
import { AppRouter } from "./routes/AppRouter";
import { DateTimeSpanFilter } from "./services/DateTimeSpanFilter";

export const App: React.FC = () => {
  const [user, setUser] = useState<IUserInternal | undefined>(undefined);
  const [toasts, setToasts] = useState<IToast[]>([]);
  const [dateTimeSpanFilter, setDateTimeSpanFilter] = useState<IDateTimeSpan>({
    from: SP.fetch(DateTimeSpanFilter).from,
    to: SP.fetch(DateTimeSpanFilter).to,
  });

  return (
    <AppContext.Provider
      value={{
        adminSettings: useAdminSettingsStorage(),
        dateTimeSpanFilter: [dateTimeSpanFilter, setDateTimeSpanFilter],
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
