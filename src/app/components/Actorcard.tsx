import Image from "next/image";

const ActorCard = ({ actor }: { actor: any }) => {
    if (!actor) return null;
  
    return (
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden">

        <Image
        width={100}
        height={100}
          src={actor.pictureUrl}
          alt={actor.name}
          className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
        />
  
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900">{actor.name}</h3>
  
          <p className="text-gray-700 mt-1">Age: {actor.age}</p>
  
          <p className="text-gray-600 mt-2 text-sm">{actor.bio}</p>
        </div>
      </div>
    );
  };
  
  export default ActorCard;
  