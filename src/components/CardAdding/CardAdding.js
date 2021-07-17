import { useState } from "react";
import { v4 } from "uuid";

import "./CardAdding.css";

function CardAdding(props) {
  const addCardButtonText = "OK",
    cancelButtonText = "Cancel",
    cardTitle = "Title...",
    cardText = "Text...";
  const [newCardData, setnewCardData] = useState({
    enteredTitle: "",
    enteredText: "",
  });

  const newCardTitleHandler = (event) => {
    setnewCardData((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
  };

  const newCardTextHandler = (event) => {
    setnewCardData((prevState) => {
      return { ...prevState, enteredText: event.target.value };
    });
  };

  const onCardAddingClick = () => {
    props.onAddCard({
      id: v4(),
      title: newCardData.enteredTitle,
      text: newCardData.enteredText,
      check: false,
    });
    props.addCardMode(false);
  };

  const onCancelClick = () => {
    setnewCardData({ enteredTitle: "", enteredText: "" });
    props.addCardMode(false);
  };

  return (
    <div className="card-adding-item">
      <input
        className="card-adding-edit-title"
        type="text"
        placeholder={cardTitle}
        value={newCardData.enteredTitle}
        onChange={newCardTitleHandler}
      />
      <textarea
        className="card-adding-edit-text"
        placeholder={cardText}
        value={newCardData.enteredText}
        onChange={newCardTextHandler}
      />
      <div className="card-adding-button-conteiner">
        <button className="card-adding-button" onClick={onCardAddingClick}>
          {addCardButtonText}
        </button>
        <button className="card-adding-button" onClick={onCancelClick}>
          {cancelButtonText}
        </button>
      </div>
    </div>
  );
}

export default CardAdding;
