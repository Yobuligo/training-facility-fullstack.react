import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { DateTime } from "./core/services/date/DateTime";
import { IDateTimeSpan } from "./core/services/date/IDateTimeSpan";
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
  const [dateTimeSpanFilter, setDateTimeSpanFilter] = useState<IDateTimeSpan>({
    from: DateTime.getWeekStartDate(new Date()),
    to: DateTime.getWeekEndDate(new Date()),
  });

  return (
    <AppContext.Provider
      value={{
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
