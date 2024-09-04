import { ChangeEvent, FormEvent, useEffect, useState, FocusEvent } from "react";

import { IValidationErrors } from "src/components/signup/signup.types";

import { Input, InputStatus } from "src/uikit/Input";
import { PasswordInput } from "../PasswordInput";

import { SignupFormValidator } from "./formValidator";

import css from "./signupForm.module.css";

export const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [touchedFields, setTouchedFields] = useState<string[]>([]);

  const [errors, setErrors] = useState<IValidationErrors>(
    SignupFormValidator.getInstance().validateForm("", ""),
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (errors.hasErrors) {
      setTouchedFields(["email", "password"]);

      return;
    }

    alert("success");
  };

  const buildEmailFieldStatus = (): InputStatus | null => {
    if (!touchedFields.includes("email")) {
      return null;
    }

    if (errors.email) {
      return InputStatus.INVALID;
    }

    return InputStatus.VALID;
  };

  const handleBlurField = (event: FocusEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;

    if (!touchedFields.includes(fieldName)) {
      setTouchedFields([...touchedFields, fieldName]);
    }
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  useEffect(() => {
    const _errors = SignupFormValidator.getInstance().validateForm(
      email,
      password,
    );

    if (_errors.hasErrors || errors.hasErrors) {
      setErrors(_errors);
    }
  }, [email, password]);

  const disabledSubmitButton = touchedFields.length === 2 && errors.hasErrors;

  return (
    <div className={css.container}>
      <div className={css.stars} />

      <div className={css.content}>
        <h1 className={css.title}>Sign up</h1>

        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.field}>
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="Type your email"
              errorMessage={errors.email}
              onBlur={handleBlurField}
              onChange={handleFieldChange}
              status={buildEmailFieldStatus()}
            />
          </div>
          <div className={css.field}>
            <PasswordInput
              name="password"
              onBlur={handleBlurField}
              value={password}
              errors={errors.password}
              onChange={handleFieldChange}
              isTouched={touchedFields.includes("password")}
            />
          </div>

          <button
            className={css.submitButton}
            type="submit"
            disabled={disabledSubmitButton}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
