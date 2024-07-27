import { Page } from "../page/Page";
import { IPublicPageProps } from "./IPublicPageProps";

export const PublicPage: React.FC<IPublicPageProps> = (props) => {
  return <Page>{props.children}</Page>;
};
