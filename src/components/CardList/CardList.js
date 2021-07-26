import { useState, useContext } from "react";
import { CardWithDelay } from "../Card/Card";
import CardListCheckbox from "./CardListCheckbox";
import CardAdding from "../CardAdding/CardAdding";
import CardListContext from "../CardListContext/CardListContext";

import "./CardList.css";

function CardList() {
  const deleteButtonText = "delete selected cards",
    addButtonText = "add card",
    readOnlyCheckboxText = "Read only";
  const [readOnlyMode, setReadOnlyMode] = useState(true);
  const [cardAddingMode, setCardAddingMode] = useState(false);
  const cardListCtx = useContext(CardListContext);

  const readOnlyHandleClick = () => {
    setReadOnlyMode((prevReadOnlyMode) => !prevReadOnlyMode);
  };

  const addCardButtonHandler = () => {
    setCardAddingMode((prevCardAddingState) => !prevCardAddingState);
  };

  return (
    <div className="card-list">
      <div className="card-list-header">
        <button
          className="card-list-button"
          disabled={cardAddingMode}
          onClick={addCardButtonHandler}
        >
          {addButtonText}
        </button>
        {cardListCtx.items.find((card) => card.check) && (
          <button
            className="card-list-button"
            onClick={cardListCtx.onDeleteCard}
          >
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
          disableCardMode={addCardButtonHandler}
          onAddCard={cardListCtx.onAddCard}
        />
      )}
      {cardListCtx.items.map((cardData) => (
        <CardWithDelay
          onSaveCardData={cardListCtx.onChangeCard}
          key={cardData.id}
          card={cardData}
          readOnly={readOnlyMode}
        />
      ))}
    </div>
  );
}

export default CardList;
