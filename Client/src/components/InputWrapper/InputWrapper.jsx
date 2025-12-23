import React from "react";
import { Label } from "../ui/label";
import ShowError from "../ui/error";
import { capitalizeFirstChar } from "@/utils/helpers";
import clsx from "clsx";

export const InputWrapper = ({
  children,
  name,
  label,
  error,
  labelClassName,
  inputWrapperClassName,
  showAsterisk,
}) => {
  return (
    <div className={clsx("flex flex-col gap-2", inputWrapperClassName)}>
      <Label
        className={clsx("text-sm font-light", labelClassName)}
        htmlFor={name}
      >
        {label ? label : ""}
        {showAsterisk && <span className="text-red-500">&nbsp;*</span>}
      </Label>
      {children}
      {error && <ShowError message={error} />}
    </div>
  );
};
