interface BtnProps {
  type?: "submit" | "button" | "reset" | undefined;
  name?: string;
}

const Button = ({ type = "submit", name = "Click" }: BtnProps) => {
  return (
    <button
      className="flex w-30 cursor-pointer justify-center self-end rounded-md bg-indigo-600 p-1 text-base font-medium text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-xl focus:shadow-xl focus:outline-none"
      type={type}>
      {name}
    </button>
  );
};

export default Button;
