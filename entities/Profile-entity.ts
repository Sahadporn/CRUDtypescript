export class ProfileEntity {
  constructor(
    public name: string,
    public age: number,
    public address: string[],
    private _createdAt: Date,
    public updatedAt: Date,
    private _id?: string
  ) {}

  public get id(): string {
    if (!this._id) throw new Error("ID is unassigned");

    return this._id;
  }

  public set id(value: string) {
    if (this._id) throw new Error("ID can only be assogn once");

    this._id = value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
}
