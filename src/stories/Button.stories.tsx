import Button from "../components/Button";

export default {
  title: "Button",
  component: Button,
};

export const Red = () => (
  <Button name="Click!" className="bg-red-400 text-gray-700" />
);
