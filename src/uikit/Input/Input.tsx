import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

import clsx from "clsx";

import css from "./input.module.css";

export enum InputStatus {
  VALID = "VALID",
  INVALID = "INVALID",
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: InputStatus | null;
  errorMessage?: string;
  suffixIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function CustomInput({ status, errorMessage, suffixIcon, ...props }, ref) {
    return (
      <div className={css.container}>
        <input
          ref={ref}
          className={clsx(css.input, {
            [css.error]: status === InputStatus.INVALID,
            [css.valid]: status === InputStatus.VALID,
            [css.inputWithSuffixIcon]: !!suffixIcon,
          })}
          {...props}
        />

        {!!suffixIcon && (
          <div className={css.suffixIconContainer}>{suffixIcon}</div>
        )}

        <span
          className={clsx(css.errorMessage, {
            [css.errorMessageActive]:
              status === InputStatus.INVALID && errorMessage,
          })}
        >
          {errorMessage}
        </span>
      </div>
    );
  },
);
