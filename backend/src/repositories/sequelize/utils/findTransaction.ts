import { Transaction } from "sequelize";
import { TransactionStack } from "./TransactionStack";

/**
 * This function finds a Sequelize transaction or returns undefined if no transaction was found
 */
export const findTransaction = (): Transaction | undefined =>
  TransactionStack.instance.peek();
