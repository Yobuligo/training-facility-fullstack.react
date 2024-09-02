import { Transaction } from "sequelize";

export interface ITransactionStack {
  pop(): boolean;
  push(transaction: Transaction): void;
  peek(): Transaction | undefined;
}
