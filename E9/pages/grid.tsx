// pages/grid.tsx
import React from 'react';

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const Grid: React.FC = () => {
  const cards: CardProps[] = [
    {
      id: 1,
      title: "Paris",
      description: "Paris is the capital city of France, known for its art, fashion, and landmarks like the Eiffel Tower.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/800px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg" 
    },
    {
      id: 2,
      title: "Beijing",
      description: "Beijing is the capital city of China, with great history and beautiful natural view",
      imageUrl: "https://content.r9cdn.net/rimg/dimg/62/28/22c46ab3-city-3286-164700d5d0b.jpg?width=1366&height=768&xhint=1506&yhint=1211&crop=true" 
    },
    {
      id: 3,
      title: "New York",
      description: "New York City is an iconic city in the USA, known for Times Square, Central Park, and the Statue of Liberty.",
      imageUrl: "https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty.jpg" 
    },
    
    {
      id: 4,
      title: "London",
      description: "London is the capital of England, famous for its history, the British Museum, and Buckingham Palace.",
      imageUrl: "https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg" 
    },
    {
      id: 5,
      title: "Sydney",
      description: "Sydney is known for its Opera House, beautiful harbor, and iconic beaches like Bondi Beach.",
      imageUrl: "https://cdn.britannica.com/71/188471-050-CF188A6B/Sydney-Opera-House-Port-Jackson.jpg" 
    },
    {
      id: 6,
      title: "Rome",
      description: "Rome is Italy's historic capital, famous for its ancient ruins such as the Colosseum and the Roman Forum.",
      imageUrl: "https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122_3x2.jpg" 
    },
    {
      id: 7,
      title: "Berlin",
      description: "Berlin is the capital of Germany, known for its modern art scene and historic sites like the Berlin Wall.",
      imageUrl: "https://cdn.britannica.com/39/6839-050-27891400/Brandenburg-Gate-Berlin.jpg" 
    },
    {
      id: 8,
      title: "Toronto",
      description: "Where we are.",
      imageUrl: "https://cdn.britannica.com/35/100235-050-CE3936EE/view-CN-Tower-Toronto-skyline-observation-deck.jpg" 
    }
  ];

  return (
    <div id="grid" className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto px-4 py-8">
      {cards.map((card) => (
        <div
          key={card.id}
          className="card bg-white border-2 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
        >
          <img
            src={card.imageUrl}
            alt={`Image of ${card.title}`}
            className="card-image w-full h-40 object-cover rounded-md mb-4"
          />
          <h2 className="card-title text-xl font-semibold mb-2">
            {card.title}
          </h2>
          <p className="card-description text-gray-700">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Grid;
