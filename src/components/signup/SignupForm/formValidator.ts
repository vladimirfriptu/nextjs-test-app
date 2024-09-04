import {
  IValidationErrors,
  PasswordValidationErrors,
} from "src/components/signup/signup.types";

export class ValidationErrors implements IValidationErrors {
  public email?: string;
  public password: Set<PasswordValidationErrors> = new Set();

  public constructor(email?: string, password?: PasswordValidationErrors[]) {
    this.email = email;

    if (password) this.password = new Set(password);
  }

  public get hasErrors(): boolean {
    return !!this.email || this.password.size > 0;
  }
}

export class SignupFormValidator {
  private static instance: SignupFormValidator;
  private readonly MIN_PASSWORD_LENGTH = 8;
  private readonly MAX_PASSWORD_LENGTH = 32;
  private readonly NUMBER_REGEX = /\d/;
  private readonly UPPERCASE_REGEX = /[A-Z]/;
  private readonly LOWERCASE_REGEX = /[a-z]/;
  private readonly EMAIL_REGEX = /\S+@\S+\.\S+/;

  private constructor() {}

  public static getInstance(): SignupFormValidator {
    if (!SignupFormValidator.instance) {
      SignupFormValidator.instance = new SignupFormValidator();
    }
    return SignupFormValidator.instance;
  }

  public validatePassword(password: string): Set<PasswordValidationErrors> {
    const errors: Set<PasswordValidationErrors> = new Set();

    if (password.length < this.MIN_PASSWORD_LENGTH) {
      errors.add(PasswordValidationErrors.MIN);
    }

    if (password.includes(" ")) {
      errors.add(PasswordValidationErrors.MIN);
    }

    if (password.length > this.MAX_PASSWORD_LENGTH) {
      errors.add(PasswordValidationErrors.MAX);
    }

    if (!this.NUMBER_REGEX.test(password)) {
      errors.add(PasswordValidationErrors.NUMBER);
    }

    if (!this.UPPERCASE_REGEX.test(password)) {
      errors.add(PasswordValidationErrors.REGISTERS);
    }

    if (!this.LOWERCASE_REGEX.test(password)) {
      errors.add(PasswordValidationErrors.REGISTERS);
    }

    return errors;
  }

  public validateEmail(email: string): string | null {
    if (!this.EMAIL_REGEX.test(email)) {
      return "Invalid email";
    }

    return null;
  }

  public validateForm(email: string, password: string): IValidationErrors {
    const errors: IValidationErrors = new ValidationErrors();

    const emailError = this.validateEmail(email);

    if (emailError) errors.email = emailError;

    if (!password) {
      errors.password = new Set([
        PasswordValidationErrors.MIN,
        PasswordValidationErrors.REGISTERS,
        PasswordValidationErrors.NUMBER,
      ]);
    } else {
      errors.password = this.validatePassword(password);
    }

    return errors;
  }
}
