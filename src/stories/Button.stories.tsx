import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "../components/Button";

export const ActionsData = {
  clickHandler: fn(),
};

const meta = {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
  argTypes: {
    clickHandler: { description: "Function called when button is clicked" },
    label: { description: "Text content of the button" },
    type: {
      control: "select",
      options: ["submit", "button", "reset"],
      description: "HTML button type attribute",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Red: Story = {
  args: {
    className: "bg-red-500",
  },
};

export const Hovered: Story = {
  args: {
    className: "shadow-xl",
  },
};

export const LongLabeled: Story = {
  args: {
    label: "Really long label",
  },
};

export const WideLongLabeled: Story = {
  args: {
    label: "Really long label",
    className: "w-50",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};