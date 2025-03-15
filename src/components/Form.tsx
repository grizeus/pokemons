import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useEffect, useState } from "react";
import { fetchPokemons } from "../api/operations";
import Select from "./Select";

interface Pokemon {
  name: string;
  url: string;
}

const Form = () => {
  const [pokemons, setpokemons] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const { results } = await fetchPokemons();
      const names = results.map((el: Pokemon) => el.name);
      setpokemons(names);
    })();
  }, []);

  return (
    <form
      className="flex w-100 flex-col gap-2"
      onSubmit={handleSubmit(data => console.log(data))}>
      <Input
        register={register}
        placeholder="Name"
        name="firstName"
        validation={{ required: true }}
        errors={errors.firstName ? "First name is required" : null}
      />
      <Input
        register={register}
        validation={{ required: true }}
        placeholder="Surname"
        name="lastName"
        errors={errors.firstName ? "Last name is required" : null}
      />
      <Select
        options={pokemons}
        name="pokemons"
        register={register}
        label="Pokemons"
        validation={{ maxLength: 4, required: true }}
        placeholder="Choose pokemon"
        errors={errors.pokemons ? "Choose exactly 4 pokemons" : null}
      />
      <Button name="Submit" />
    </form>
  );
};

export default Form;
