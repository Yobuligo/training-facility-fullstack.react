import { IUrlParamsExtender } from "../../../lib/urlParamsExtender/IUrlParamsExtender";
import { UrlSessionExtender } from "../../../lib/userSession/api/UrlSessionExtender";
import { UrlParamsExtender } from "./UrlParamsExtender";

/**
 * This list contains all UrlParamsExtenders instances that should extend REST call urls.
 */
export const UrlParamsExtenderRegistry: IUrlParamsExtender[] = [
  new UrlParamsExtender(),
  new UrlSessionExtender(),
];
