import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Select from "../components/Select";
import { useForm, FieldValues, RegisterOptions } from "react-hook-form";
import { SelectFieldProps } from "../components/types";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

interface FormData extends FieldValues {
  favoriteColors: string;
}

// Basic usage with React Hook Form
const SelectWithForm = (args: Partial<SelectFieldProps>) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-80">
      <Select
        {...args}
        register={register}
        name={args.name || "favoriteColors"}
        options={args.options || []}
        errors={errors[args.name || "favoriteColors"]?.message as string}
      />
    </div>
  );
};

export const Default: Story = {
  render: args => <SelectWithForm {...args} />,
  args: {
    name: "favoriteColors",
    label: "Favorite Colors",
    placeholder: "Select colors",
    options: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"],
    validation: {
      required: true,
    } as RegisterOptions,
  },
};

export const WithCustomValidation: Story = {
  render: args => <SelectWithForm {...args} />,
  args: {
    name: "favoriteColors",
    label: "Favorite Colors (2-3)",
    placeholder: "Select 2-3 colors",
    options: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"],
    validation: {
      required: true,
      minLength: 2,
      maxLength: 3,
    } as RegisterOptions,
  },
};

export const WithManyOptions: Story = {
  render: args => <SelectWithForm {...args} />,
  args: {
    name: "favoriteColors",
    label: "Favorite Colors",
    placeholder: "Select colors",
    options: [
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "Purple",
      "Orange",
      "Pink",
      "Brown",
      "Black",
      "White",
      "Gray",
      "Cyan",
      "Magenta",
      "Lime",
      "Teal",
      "Indigo",
      "Violet",
      "Amber",
    ],
    validation: {
      required: true,
    } as RegisterOptions,
  },
};

export const Disabled: Story = {
  render: args => {
    const {
      register,
      formState: { errors },
    } = useForm();

    return (
      <div className="w-80 ">
        <Select
          {...args}
          register={register}
          name={args.name || "disabledSelect"}
          options={args.options || []}
          errors={errors[args.name || "disabledSelect"]?.message as string}
          disabled={true} // Add this prop to your component if needed
        />
      </div>
    );
  },
  args: {
    name: "disabledSelect",
    label: "Disabled Select",
    placeholder: "Cannot select options",
    options: ["Option 1", "Option 2", "Option 3"],
  },
};