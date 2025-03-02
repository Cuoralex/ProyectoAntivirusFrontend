// app/components/OpportunityCard.tsx
import React from 'react';

interface Opportunity {
  id: number;
  name: string;
  // Agrega más propiedades según sea necesario
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

interface OpportunityCardProps {
  title: string;
  description: string;
  link: string;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ title, description, link }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <a href={link} className="text-blue-500 hover:underline">
        Más información
      </a>
    </div>
  );
};

export default OpportunityCard;
