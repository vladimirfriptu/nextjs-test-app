export enum PasswordValidationErrors {
  MIN,
  MAX,
  NUMBER,
  REGISTERS,
}

export interface IValidationErrors {
  email?: string;
  password?: Set<PasswordValidationErrors>;

  hasErrors: boolean;
}
