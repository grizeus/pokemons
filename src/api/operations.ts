import axios from "axios";
import pokeInstance from "./api";

export const fetchPokemons = async () => {
  try {
    const { data } = await pokeInstance.get("/pokemon?limit=20");
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
