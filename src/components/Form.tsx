import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      <Button name="Submit"/>
    </form>
  );
};

export default Form;
