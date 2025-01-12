import { ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { AppRoutes } from "../../../routes/AppRoutes";
import { ISectionRouteParams } from "../../../routes/ISectionRouteParams";
import { useDashboardContent } from "../dashboardContentItem/useDashboardContent";

export const useDashboardContentViewModel = () => {
  const dashboardContent = useDashboardContent();
  const params = useParams<ISectionRouteParams>();
  const auth = useAuth();

  const getContent = (): ReactNode => {
    const path = params.section ? `/${params.section}` : "/";

    const dashboardContentItem = dashboardContent.items.find(
      (dashboardItem) => dashboardItem.path === path
    );

    // Navigate to error page if an unknown path was entered or the user has not sufficient authorities
    // otherwise displayed content.
    if (
      dashboardContentItem === undefined ||
      (dashboardContentItem.needsAdmin && !auth.isAdmin())
    ) {
      return <Navigate to={AppRoutes.error.toPath()} />;
    } else {
      return dashboardContentItem.content;
    }
  };

  return {
    getContent,
  };
};
