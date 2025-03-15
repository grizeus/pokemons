import { BtnProps } from "./types";

const Button = ({
  type = "submit",
  name = "Click",
  className,
  clickHandler,
}: BtnProps) => {
  return (
    <button
      onClick={clickHandler}
      className={`flex w-30 cursor-pointer justify-center self-end rounded-md bg-indigo-600 p-1 text-base font-medium text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-xl focus:shadow-xl focus:outline-none ${className} `}
      type={type}>
      {name}
    </button>
  );
};

export default Button;
