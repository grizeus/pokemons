import axios from "axios";
import pokeInstance from "./api";

export const fetchPokemons = async () => {
  try {
    const { data } = await pokeInstance.get("/pokemon?limit=30");
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const fetchPokemonsSprites = async (pokemons: string[]) => {
  try {
    const res = Promise.all(
      pokemons.map(async name => {
        const { data } = await pokeInstance.get(`/pokemon/${name}`);
        return data;
      })
    );
    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
