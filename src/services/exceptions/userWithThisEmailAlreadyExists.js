export class EmailAlreadyExistsError extends Error {
  constructor(message) {
    super(message || "E-mail already exists");
    this.name = "EmailAlreadyExistsError";
  }
}
