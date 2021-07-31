import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 } from "uuid";

const CardListContext = React.createContext({
  items: [],
  onChangeCard: () => {},
  onAddCard: () => {},
  onDeleteCard: () => {},
});

export const CardListContextProvider = (props) => {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    const response = await axios(
      "https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json"
    );

    setCards(
      response.data.slice(0, 15).map((cardData) => {
        return {
          id: v4(),
          title: cardData["Name"],
          text: cardData["About"],
          check: false,
        };
      })
    );
  };

  useEffect(() => {
    fetchCards();
  }, []);

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
