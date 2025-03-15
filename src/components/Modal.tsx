import { useEffect, useState } from "react";
import Button from "./Button";
import { fetchPokemonsSprites } from "../api/operations";

interface TeamData {
  firstName: string;
  lastName: string;
  pokemons: string[];
}

interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string | null;
    front_female: string | null;
  };
}

interface SpritesMap {
  [pokemonName: string]: string | null;
}

const Modal = ({
  onClose,
  isOpen,
  data,
}: {
  onClose: () => void;
  isOpen: boolean;
  data: TeamData | null;
}) => {
  const [sprites, setSprites] = useState<SpritesMap | null>(null);
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    (async () => {
      if (!data) return;

      const res = await fetchPokemonsSprites(data.pokemons);
      if (!res) return;

      const sprites: SpritesMap = {};
      res.forEach((el: Pokemon) => {
        sprites[el.name] =
          el.sprites?.front_default || el.sprites?.front_female;
      });
      setSprites(sprites);
    })();
  }, []);
  return (
    <div
      className="fixed inset-0 z-10 h-full w-full bg-[rgb(0,0,0,0.5)]"
      onClick={onClose}>
      <div
        className="absolute top-1/2 left-1/2 z-20 flex w-150 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl bg-zinc-200 p-3 text-slate-900"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium">Your team is ready!</p>
          <button
            className="cursor-pointer text-2xl font-semibold"
            onClick={onClose}>
            &times;
          </button>
        </div>
        <p className="text-lg leading-6 font-medium">Trainer:</p>
        <ul className="flex w-fit gap-1.5 rounded-md bg-neutral-50 p-2 text-sm leading-4 font-medium">
          <li>{data ? data.firstName : "Kasumi"}</li>
          <li>{data ? data.lastName : "Misty"}</li>
        </ul>
        <p className="text-lg leading-6 font-medium">Team:</p>
        <ul className="flex gap-2 p-1">
          {data?.pokemons.map(el => {
            return (
              <li className="flex flex-col items-center rounded-md bg-neutral-50 p-1">
                <span className="text-sm leading-4 font-medium">{el}</span>
                <img className="w-24" src={sprites?.[el] || ""} alt={el} />
              </li>
            );
          })}
        </ul>
        <Button clickHandler={onClose} name="To battle!" />
      </div>
    </div>
  );
};

export default Modal;
