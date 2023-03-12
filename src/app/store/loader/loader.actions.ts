export class ChangeLoader {
  static readonly type = '[Loader Change]';
  constructor(public payload: boolean) {}
}
