export abstract class Dummy {
  private _isPersisted = false;

  get isPersisted() {
    return this._isPersisted;
  }

  setIsPersisted() {
    this._isPersisted = true;
  }
}
