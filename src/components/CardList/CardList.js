import { useState } from "react";
import Card from "../Card/Card";
import CardListCheckbox from "./CardListCheckbox";

import "./CardList.css";

function CardList(props) {
  const deleteButtonText = "delete selected cards",
    readOnlyCheckboxText = "Read only";
  const [readOnlyMode, setReadOnlyMode] = useState(true);

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

  return (
    <div className="card-list">
      <div className="card-list-header">
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
      {props.items.map((cardData) => (
        <Card
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
