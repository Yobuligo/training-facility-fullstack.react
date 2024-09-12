import { LanguageSelect } from "../../language/languageSelect/LanguageSelect";
import { Page } from "../page/Page";
import { PageHeader } from "../pageHeader/PageHeader";
import { IPublicPageProps } from "./IPublicPageProps";

export const PublicPage: React.FC<IPublicPageProps> = (props) => {
  return (
    <Page>
      <PageHeader onAppLogoClick={props.onAppLogoClick}>
        <LanguageSelect />
      </PageHeader>
      {props.children}
    </Page>
  );
};
