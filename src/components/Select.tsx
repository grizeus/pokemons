import { useState, useRef, useEffect } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface SelectFieldProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  options: string[];
  label?: string;
  placeholder?: string;
  validation?: RegisterOptions;
  errors?: string | null;
}

const Select = ({
  name,
  register,
  options,
  label = "Label",
  placeholder = "Choose options",
  validation = {},
  errors = null,
}: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const maxLength = (validation?.maxLength as number) || 4; // Default to 4 if not specified
  const minLength = (validation?.minLength as number) || maxLength; // Default to maxLength if not specified

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    if (selectedOptions.length < maxLength) {
      setSelectedOptions(prev => {
        const newSelection = prev.includes(option)
          ? prev.filter(item => item !== option)
          : [...prev, option];

        if (register) {
          const event = {
            target: { value: newSelection, name },
          };
          register(name).onChange(event);
        }
        return newSelection;
      });
      setIsOpen(false);
    }
  };

  const removeBadge = (option: string) => {
    setSelectedOptions(prev => {
      const newSelection = prev.filter(item => item !== option);

      if (register) {
        const event = {
          target: { value: newSelection, name },
        };
        register(name).onChange(event);
      }

      return newSelection;
    });
  };

  const availableOptions = options.filter(
    option => !selectedOptions.includes(option)
  );

  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between">
        <label className="text-base text-slate-800">{label}</label>
      </div>
      <div ref={dropDownRef} className="relative cursor-pointer">
        <div
          className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-400 px-4 py-3 transition-colors duration-300 ease-in-out hover:border-indigo-600 focus:border-indigo-600 focus:outline-none"
          onClick={toggleDropdown}>
          {selectedOptions.length > 0 ? (
            selectedOptions.map(option => (
              <div
                key={option}
                className="flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs leading-3.5 text-slate-800">
                {option}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    removeBadge(option);
                  }}
                  className="ml-2 cursor-pointer text-xs leading-3.5">
                  &times;
                </button>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-400">{placeholder}</div>
          )}
          <div className="ml-auto">
            <svg
              className={`size-4 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""} stroke-slate-800`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {isOpen && availableOptions.length > 0 && (
          <div className="scrollbar scrollbar-thumb-slate-400 scrollbar-thumb-rounded-lg scrollbar-w-2 absolute top-full left-0 z-1 mt-1 h-40 w-full flex-col gap-1 overflow-y-auto rounded-lg border border-slate-400 bg-white px-3 py-2 shadow-[0_4px_36px_0_rgba(0,0,0,0.02)]">
            {availableOptions.map((option, i) => (
              <div
                key={i}
                onClick={e => {
                  e.stopPropagation();
                  handleOptionClick(option);
                }}
                className="cursor-pointer py-2 text-sm hover:bg-gray-50">
                {option}
              </div>
            ))}
          </div>
        )}
        <input
          type="hidden"
          {...register(name, {
            ...validation,
            validate: value => {
              let values: string[] = [];

              if (typeof value === "string") {
                values = value ? value.split(",").filter(Boolean) : [];
              } else if (Array.isArray(value)) {
                values = value;
              }
              console.log(values);
              if (values.length === 0) {
                return "This field is required";
              }
              if (values.length < minLength) {
                return `Please select at least ${minLength} options`;
              }
              if (values.length > maxLength) {
                return `Please select no more than ${maxLength} options`;
              }
              return true;
            },
          })}
          value={selectedOptions.join(",")}
        />
      </div>
      {errors && <span className="text-sm text-red-500">{errors}</span>}
    </div>
  );
};

export default Select;
