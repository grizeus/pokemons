interface BtnProps {
  type?: "submit" | "button" | "reset" | undefined;
  name?: string;
  clickHandler?: () => void;
}

const Button = ({ type = "submit", name = "Click", clickHandler }: BtnProps) => {
  return (
    <button
      onClick={clickHandler}
      className="flex w-30 cursor-pointer justify-center self-end rounded-md bg-indigo-600 p-1 text-base font-medium text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-xl focus:shadow-xl focus:outline-none"
      type={type}>
      {name}
    </button>
  );
};

export default Button;
