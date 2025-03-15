import { InputFieldProps } from "./types";

const Input = ({
  name,
  register,
  placeholder,
  validation = {},
  className = "",
  errors,
}: InputFieldProps) => {
  return (
    <>
      <input
        className={`rounded-lg border border-slate-400 px-4 py-3 text-xs leading-3.5 transition-colors duration-300 ease-in-out hover:border-indigo-600 focus:border-indigo-600 focus:outline-none ${className}`}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {errors && (
        <span className="text-sm text-red-500">
          {errors.type === "required" && "This field is required"}
          {errors.type === "minLength" && "Minimum length is 2 characters"}
          {errors.type === "maxLength" && "Maximum length is 12 characters"}
        </span>
      )}
    </>
  );
};

export default Input;
