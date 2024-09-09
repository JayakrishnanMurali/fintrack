"use client";

import { useMemo } from "react";
import type { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type SelectProps = {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export const Select = ({
  value,
  onChange,
  onCreate,
  options = [],
  disabled,
  placeholder,
}: SelectProps) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreatableSelect
      placeholder={placeholder}
      className="h-10 text-sm"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#01273b",
          backgroundColor: "#000f17",
          color: "#fff",
          ":hover": {
            borderColor: "#01273b",
          },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#01273b",
          color: "#fff",
        }),
        menuList: (base) => ({
          ...base,
          backgroundColor: "#001f3f", // Ensure the menu list background color matches
        }),
        singleValue: (base) => ({
          ...base,
          color: "#ffffff", // Color of the selected item in the select box
        }),
        option: (base, { isSelected, isFocused }) => ({
          ...base,
          backgroundColor: isSelected
            ? "#003a6b"
            : isFocused
              ? "#002a4a"
              : "#001f3f", // Background color for selected and focused options
          color: isSelected ? "#ffffff" : "#ffffff", // Color of text for selected options
          ":active": {
            ...base[":active"],
            backgroundColor: isSelected ? "#003a6b" : "#002a4a",
          },
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  );
};
