import { db } from "../../../db/db";
import { findTransaction } from "./findTransaction";
import { TransactionStack } from "./TransactionStack";

/**
 * This function creates a Sequelize transaction and wraps the method calls of {@link block} with that transaction.
 *
 * Within these blocks the transaction can be retrieved via {@link findTransaction}
 */
export const transaction = async (block: () => void) => {
  const transaction = await db.transaction();
  TransactionStack.instance.push(transaction);
  block();
  TransactionStack.instance.pop();
};
