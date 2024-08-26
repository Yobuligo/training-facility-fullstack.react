import { Router } from "express";

export abstract class Controller {
  readonly router = Router();
}
