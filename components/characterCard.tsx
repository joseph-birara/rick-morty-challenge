type Props = {
  character: {
    id: string;
    name: string;
    image: string;
    species: string;
    origin: { name: string };
    funFact?: string;
  };
};

export const CharacterCard = ({ character }: Props) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col items-center text-center">
      <img
        src={character.image}
        alt={character.name}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold">{character.name}</h2>
      <p className="text-gray-400">{character.species}</p>
      <p className="text-gray-400">Origin: {character.origin.name}</p>
      {character.funFact && (
        <p className="mt-3 text-green-400 italic">💡 {character.funFact}</p>
      )}
    </div>
  );
};
