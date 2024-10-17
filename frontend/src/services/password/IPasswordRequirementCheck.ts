/**
 * An implementation of this interface is responsible for checking a specific requirement which must be fulfilled for a given password.
 */
export interface IPasswordRequirementCheck {
  /**
   * Returns true if the given {@link password} fulfills this requirement otherwise false.
   */
  isValid(password: string): boolean;
}
