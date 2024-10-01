import componentStyles from "../../../styles/components.module.scss";
import { Page } from "../page/Page";
import { PageFooter } from "../pageFooter/PageFooter";
import { PageHeader } from "../pageHeader/PageHeader";
import { IPublicPageProps } from "./IPublicPageProps";

export const PublicPage: React.FC<IPublicPageProps> = (props) => {
  return (
    <Page className={componentStyles.page}>
      <PageHeader onAppLogoClick={props.onAppLogoClick} />
      {props.children}
      <PageFooter />
    </Page>
  );
};
