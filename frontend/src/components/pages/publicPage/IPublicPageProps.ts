import { IPageProps } from "../page/IPageProps";

export interface IPublicPageProps extends IPageProps {
  onAppLogoClick?: () => void;
}
