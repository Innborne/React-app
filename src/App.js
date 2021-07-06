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
  {
    id: "e3",
    title: "Caption3",
    text: "New text3...",
    check: false,
  },
  {
    id: "e4",
    title: "Caption4",
    text: "New text4...",
    check: true,
  },
  {
    id: "e5",
    title: "Caption5",
    text: "New text5...",
    check: false,
  },
  {
    id: "e6",
    title: "Caption6",
    text: "New text6...",
    check: true,
  },
  {
    id: "e7",
    title: "Caption7",
    text: "New text7...",
    check: false,
  },
  {
    id: "e8",
    title: "Caption8",
    text: "New text8...",
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
