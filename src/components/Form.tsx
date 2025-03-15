import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useEffect, useState } from "react";
import { fetchPokemons } from "../api/operations";
import Select from "./Select";
import Modal from "./Modal";

interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string | null;
    front_female: string | null;
  };
}

interface TeamData {
  firstName: string;
  lastName: string;
  pokemons: string[];
}

const Form = () => {
  const [pokemons, setpokemons] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setData] = useState<TeamData | null>(null);
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
      onSubmit={handleSubmit(data => {
        setModalOpen(true);
        setData(data as TeamData);
      })}>
      {isModalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          isOpen={isModalOpen}
          data={modalData}
        />
      )}
      <Input
        register={register}
        placeholder="Name"
        name="firstName"
        validation={{ minLength: 2, maxLength: 12, required: true }}
        errors={errors.firstName}
      />
      <Input
        register={register}
        validation={{ minLength: 2, maxLength: 12, required: true }}
        placeholder="Surname"
        name="lastName"
        errors={errors.lastName}
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
