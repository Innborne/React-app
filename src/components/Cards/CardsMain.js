import { useState } from "react";
import CardsCheckbox from "./CardsCheckbox";
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
      <CardsCheckbox
        type="checkbox"
        checked={readOnlyMode}
        onChange={readOnlyHandleClick}
      >
        Read only
      </CardsCheckbox>
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
