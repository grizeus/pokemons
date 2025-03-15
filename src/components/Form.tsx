import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { fetchPokemons } from "../api/operations";
import Button from "./Button";
import Select from "./Select";
import Input from "./Input";
import Modal from "./Modal";
import { Pokemon, TeamData } from "./types";

const Form = () => {
  const [pokemons, setpokemons] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [modalData, setData] = useState<TeamData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm();

  useEffect(() => {
    (async () => {
      const { results } = await fetchPokemons();
      const names = results.map((el: Pokemon) => el.name);
      setpokemons(names);
    })();
  }, []);

  useEffect(() => {
    setDisabled(isSubmitted && !isValid);
  }, [isValid, isSubmitted]);

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
      <Button label="Submit" disabled={isDisabled} />
    </form>
  );
};

export default Form;
