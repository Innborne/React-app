import React, { useState } from "react";
import CardsMain from "./components/Cards/CardsMain";
import CardsHeader from "./components/Cards/CardsHeader";

const initCards = [
  {
    id: "e1",
    title: "Caption",
    text: "New text...",
    check: true,
  },
  {
    id: "e2",
    title: "Caption2",
    text: "New text2...",
    check: false,
  },
];

function App() {
  const header = "Header";
  const [cards, setCards] = useState(initCards);

  const changeCardsHandler = (newCard) => {
    setCards(
      cards.map((prevCard) =>
        prevCard.id === newCard.id ? { ...newCard } : prevCard
      )
    );
  };

  return (
    <div>
      <CardsHeader>{header}</CardsHeader>
      <CardsMain items={cards} OnChangeCards={changeCardsHandler}></CardsMain>
    </div>
  );
}

export default App;
