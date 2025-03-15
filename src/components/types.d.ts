import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string | null;
    front_female: string | null;
  };
}

export interface TeamData {
  firstName: string;
  lastName: string;
  pokemons: string[];
}

export interface InputFieldProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  placeholder: string;
  validation?: RegisterOptions;
  className?: string;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export interface SpritesMap {
  [pokemonName: string]: string | null;
}

type BtnType = "submit" | "button" | "reset" | undefined;

export interface BtnProps {
  type?: BtnType;
  name?: string;
  clickHandler?: () => void;
}

export interface SelectFieldProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  options: string[];
  label?: string;
  placeholder?: string;
  validation?: RegisterOptions;
  errors?: string | null;
}

export interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  data: TeamData | null;
}