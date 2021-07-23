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
  const CardListCtx = useContext(CardListContext);

  const readOnlyHandleClick = () => {
    setReadOnlyMode((prevReadOnlyMode) => !prevReadOnlyMode);
  };

  const AddCardButtonHandler = () => {
    setCardAddingMode((prevCardAddingState) => !prevCardAddingState);
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
        {CardListCtx.items.find((card) => card.check) && (
          <button
            className="card-list-button"
            onClick={CardListCtx.onDeleteCard}
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
          disableCardMode={AddCardButtonHandler}
          onAddCard={CardListCtx.onAddCard}
        />
      )}
      {CardListCtx.items.map((cardData) => (
        <CardWithDelay
          onSaveCardData={CardListCtx.onChangeCard}
          key={cardData.id}
          card={cardData}
          readOnly={readOnlyMode}
        />
      ))}
    </div>
  );
}

export default CardList;
