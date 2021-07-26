import React, { useState } from "react";

const CardListContext = React.createContext({
  items: {},
  onChangeCard: () => {},
  onAddCard: () => {},
  onDeleteCard: () => {},
});

export const CardListContextProvider = (props) => {
  const [cards, setCards] = useState(props.initCards);

  const addCard = (enteredAddData) => {
    setCards([{ ...enteredAddData }, ...cards]);
  };

  const changeCard = (enteredCardsData) => {
    setCards(
      cards.map((prevCard) =>
        prevCard.id === enteredCardsData.id
          ? { ...prevCard, ...enteredCardsData }
          : prevCard
      )
    );
  };

  const deleteCard = () => {
    setCards(cards.filter((card) => !card.check));
  };

  return (
    <CardListContext.Provider
      value={{
        items: cards,
        onChangeCard: changeCard,
        onAddCard: addCard,
        onDeleteCard: deleteCard,
      }}
    >
      {props.children}
    </CardListContext.Provider>
  );
};

export default CardListContext;
