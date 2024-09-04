import { forwardRef, useState } from "react";

import clsx from "clsx";

import { Input, InputProps, InputStatus } from "src/uikit/Input";
import { PasswordValidationErrors } from "src/components/signup/signup.types";

import HidePasswordIcon from "./hidePassword.svg";
import ShowPasswordIcon from "./showPassword.svg";

import css from "./passwordInput.module.css";

interface PasswordInputProps extends InputProps {
  errors?: Set<PasswordValidationErrors>;
  isTouched: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function CustomPasswordInput({ isTouched, errors, ...props }, ref) {
    const [isSecureEnabled, setIsSecureEnabled] = useState<boolean>(true);

    const toggleSecure = () => setIsSecureEnabled((prev) => !prev);

    const buildClassNames = (errorType: PasswordValidationErrors) => {
      return clsx(css.rule, {
        [css.ruleSuccess]: !errors?.has(errorType),
        [css.ruleError]: isTouched && errors?.has(errorType),
      });
    };

    const buildInputErrorMessage = (
      errors?: Set<PasswordValidationErrors>,
    ): string | undefined => {
      if (errors?.has(PasswordValidationErrors.MAX)) {
        return "Password must be 32 characters or less";
      }

      return undefined;
    };

    const buildInputStatus = (): InputStatus | null => {
      if (!isTouched) return null;

      if (errors?.size) return InputStatus.INVALID;

      return InputStatus.VALID;
    };

    return (
      <div>
        <Input
          ref={ref}
          {...props}
          type={isSecureEnabled ? "password" : "text"}
          placeholder="Create your password"
          value={props.value || ""}
          errorMessage={buildInputErrorMessage(errors)}
          status={buildInputStatus()}
          suffixIcon={
            <div role="button" tabIndex={0} onClick={toggleSecure}>
              {isSecureEnabled ? <HidePasswordIcon /> : <ShowPasswordIcon />}
            </div>
          }
        />

        <div className={css.rules}>
          <p className={buildClassNames(PasswordValidationErrors.MIN)}>
            8 characters or more (no spaces)
          </p>
          <p className={buildClassNames(PasswordValidationErrors.REGISTERS)}>
            Uppercase and lowercase letters
          </p>
          <p className={buildClassNames(PasswordValidationErrors.NUMBER)}>
            At least one digit
          </p>
        </div>
      </div>
    );
  },
);
