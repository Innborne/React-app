import { useState } from "react";
import CardsItem from "./CardsItem";
import "./CardsMain.css";

function CardsMain(props) {
  const [readOnlyMode, setReadOnlyMode] = useState(true);

  const readOnlyHandleClick = () => {
    setReadOnlyMode(!readOnlyMode);
  };

  const saveCardDataHandler = (enteredCardsData) => {
    props.OnChangeCards({ ...enteredCardsData });
  };

  return (
    <div className="cards-main">
      <div className="cards-checkbox-container">
        <input
          type="checkbox"
          className="cards-read-checkbox"
          checked={readOnlyMode}
          onChange={readOnlyHandleClick}
        ></input>
        <label>Read only</label>
      </div>
      {props.items.map((cardData) => (
        <CardsItem
          onSaveCardData={saveCardDataHandler}
          key={cardData.id}
          card={cardData}
          readOnly={readOnlyMode}
        ></CardsItem>
      ))}
    </div>
  );
}

export default CardsMain;
