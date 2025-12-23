import React from "react";
import { useController } from "react-hook-form";
import { BasicTextInput } from "../inputs/BasicTextInput";

export const InputField = ({
  type = "",
  name = "",
  placeholder = "",
  label = "",
  control,
  disabled = false,
  component: Component = BasicTextInput,
  // on change, value etc
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <>
      <Component
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        control={control}
        label={label}
        error={error?.message ?? ""}
        isError={Boolean(error?.message) ?? false}
        {...field}
        // also handles the extra props passed to the rendered component
        {...rest}
      />
    </>
  );
};
