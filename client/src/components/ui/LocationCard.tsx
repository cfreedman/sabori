import React from "react";

interface LocationCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  description,
  imageUrl,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-4 h-96">
      <img src={imageUrl} alt={name} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default LocationCard;
