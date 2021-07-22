import { useState } from "react";
import { CardWithDelay } from "../Card/Card";
import CardListCheckbox from "./CardListCheckbox";
import CardAdding from "../CardAdding/CardAdding";

import "./CardList.css";

function CardList(props) {
  const deleteButtonText = "delete selected cards",
    addButtonText = "add card",
    readOnlyCheckboxText = "Read only";
  const [readOnlyMode, setReadOnlyMode] = useState(true);
  const [cardAddingMode, setCardAddingMode] = useState(false);

  const readOnlyHandleClick = () => {
    setReadOnlyMode((prevReadOnlyMode) => !prevReadOnlyMode);
  };

  const DeleteCardsHandler = () => {
    props.OnChangeCards(props.items.filter((card) => !card.check));
  };

  const saveCardDataHandler = (enteredCardsData) => {
    props.OnChangeCards(
      props.items.map((prevCard) =>
        prevCard.id === enteredCardsData.id
          ? { ...prevCard, ...enteredCardsData }
          : prevCard
      )
    );
  };

  const AddCardButtonHandler = () => {
    setCardAddingMode((prevCardAddingState) => !prevCardAddingState);
  };

  const addCardDataHandler = (enteredAddData) => {
    props.OnChangeCards([{ ...enteredAddData }, ...props.items]);
  };

  return (
    <div className="card-list">
      <div className="card-list-header">
        <button
          className="card-list-button"
          disabled={cardAddingMode}
          onClick={AddCardButtonHandler}
        >
          {addButtonText}
        </button>
        {props.items.find((card) => card.check) && (
          <button className="card-list-button" onClick={DeleteCardsHandler}>
            {deleteButtonText}
          </button>
        )}
        <CardListCheckbox
          type="checkbox"
          checked={readOnlyMode}
          onChange={readOnlyHandleClick}
        >
          {readOnlyCheckboxText}
        </CardListCheckbox>
      </div>
      {cardAddingMode && (
        <CardAdding
          disableCardMode={AddCardButtonHandler}
          onAddCard={addCardDataHandler}
        />
      )}
      {props.items.map((cardData) => (
        <CardWithDelay
          onSaveCardData={saveCardDataHandler}
          key={cardData.id}
          card={cardData}
          readOnly={readOnlyMode}
        />
      ))}
    </div>
  );
}

export default CardList;
