import { InputWrapper } from "@/components/InputWrapper/InputWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import React from "react";

export const SelectInput = ({
  name,
  label,
  error,
  placeholder = "Select an option",
  wrapperClassName = "",
  itemClassName = "",
  selectTriggerClassName = "",
  value,
  onChange,
  customItem,
  options = [],
  ...rest
}) => {
  return (
    <InputWrapper name={name} label={label} error={error} {...rest}>
      <Select
        className={clsx("w-36", wrapperClassName)}
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className={clsx(selectTriggerClassName)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={clsx(itemClassName)}
            >
              {customItem ? customItem(option) : option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </InputWrapper>
  );
};
