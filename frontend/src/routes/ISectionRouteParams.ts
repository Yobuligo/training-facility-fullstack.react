/**
 * This type represents route params for a specific section.
 * An section means e.g. users, trainings, profile etc.
 */
export type ISectionRouteParams = {
  /**
   * Represents the section itself like "users", "trainings" or "profile".
   */
  section: string;

  /**
   * Represents the {@link id} of an item of the section. E.g. a specific user or a specific training.
   */
  itemId?: string;
};
