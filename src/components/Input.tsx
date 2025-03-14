import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  placeholder: string;
  validation?: RegisterOptions;
  className?: string;
  errors?: string | null;
}

const Input = ({
  name,
  register,
  placeholder,
  validation = {},
  className = "",
  errors = null,
}: InputFieldProps) => {
  return (
    <>
      <input
        className={`rounded-lg border border-slate-400 px-4 py-3 text-xs leading-3.5 transition-colors duration-300 ease-in-out hover:border-indigo-600 focus:border-indigo-600 focus:outline-none ${className}`}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {errors && <span className="textsm text-red-500">{errors}</span>}
    </>
  );
};

export default Input;
