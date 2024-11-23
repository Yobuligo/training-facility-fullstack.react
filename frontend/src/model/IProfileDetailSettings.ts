/**
 * This interface represents all profile details settings,
 * which are used to persist, load and set the e.g. the collapsible state of sections in the user profile.
 */
export interface IProfileDetailsSettings {
  collapsePersonalInformation?: boolean;
  collapseAddress?: boolean;
  collapseBank?: boolean;
  collapseGradings?: boolean;
  collapseTechnicalInformation?: boolean;
}
