import { DateTime } from "../core/services/date/DateTime";
import { IEventDefinition } from "../shared/model/IEventDefinition";

/**
 * Checks if {@link eventDefinition} is valid
 */
export const matchesDateTimeSpan = (
  from: Date,
  to: Date,
  eventDefinition: IEventDefinition
): boolean => {
  // From date must be in range, so
  const dateTimeSpanTo = DateTime.toDate(to);
  const eventDefinitionFrom = DateTime.toDate(eventDefinition.from);

  // if the range is from e.g. 1 - 5 and eventDefinitionFrom starts at 7, it doesn't match
  if (eventDefinitionFrom > dateTimeSpanTo) {
    return false;
  }

  // if from and to date of eventDefinition is equal, it means that the definition counts endless, this matches so return true
  const eventDefinitionTo = DateTime.toDate(eventDefinition.to);
  if (eventDefinitionFrom === eventDefinitionTo) {
    return true;
  }

  // if the range is from e.g. 5 - 10 and eventDefinitionTo ends at 4, it doesn't match
  const dateTimeSpanFrom = DateTime.toDate(from);
  if (eventDefinitionTo < dateTimeSpanFrom) {
    return false;
  }

  return true;
};
