import { Transaction } from "sequelize";
import { List } from "../../../core/services/list/List";
import { ITransactionStack } from "./ITransactionStack";

export class TransactionStack implements ITransactionStack {
  private static _instance: ITransactionStack;
  private stack: Transaction[] = [];

  private constructor() {}

  static get instance(): ITransactionStack {
    if (!this._instance) {
      this._instance = new TransactionStack();
    }
    return this._instance;
  }

  pop(): boolean {
    return List.deleteLast(this.stack);
  }

  push(transaction: Transaction): void {
    this.stack.push(transaction);
  }

  peek(): Transaction | undefined {
    return List.last(this.stack);
  }
}
