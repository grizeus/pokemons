import { BtnProps } from "./types";

const Button = ({
  type = "submit",
  label = "Submit",
  className,
  clickHandler,
  disabled,
}: BtnProps) => {
  return (
    <button
      onClick={clickHandler}
      aria-label={label}
      disabled={disabled}
      className={`flex w-30 cursor-pointer justify-center self-end rounded-md bg-indigo-600 p-1 text-base font-medium text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-xl focus:shadow-xl focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-500 disabled:shadow-none ${className} `}
      type={type}>
      {label}
    </button>
  );
};

export default Button;
