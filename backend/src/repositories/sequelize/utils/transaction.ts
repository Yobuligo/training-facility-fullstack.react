import { Transaction } from "sequelize";
import { db } from "../../../db/db";
import { findTransaction } from "./findTransaction";
import { TransactionStack } from "./TransactionStack";

/**
 * This function creates a Sequelize transaction and wraps the method calls of {@link block} with that transaction.
 * Within these blocks the transaction can be retrieved via {@link findTransaction}.
 *
 * Throws errors and rolls back changes.
 */
export const transaction = async (
  block: (transaction: Transaction) => Promise<void>
) => {
  try {
    await db.transaction(async (transaction) => {
      TransactionStack.instance.push(transaction);
      await block(transaction);
      TransactionStack.instance.pop();
    });
  } catch (error) {
    TransactionStack.instance.pop();
    throw error;
  }
};
