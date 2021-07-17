import React, { useState } from "react";
import CardList from "./components/CardList/CardList";
import Header from "./components/Header/Header";

const initCards = [
  {
    id: "e1",
    title: "Caption",
    text: "New text...",
    check: false,
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
    check: false,
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
    check: false,
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

  const changeCardsHandler = (newCards) => {
    setCards(newCards);
  };

  return (
    <div>
      <Header>{header}</Header>
      <CardList items={cards} OnChangeCards={changeCardsHandler} />
    </div>
  );
}

export default App;
