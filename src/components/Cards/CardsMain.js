import { useState } from "react";
import CardsItem from "./CardsItem";
import styled from "styled-components";
import "./CardsMain.css";

const CheckboxContainer = styled.div`
  display: flex;
  width: 100%;
  margin-left: 0.25rem;
  align-items: center;
  color: white;
  opacity: ${(props) => (props.passed ? "100%" : "50%")};

  & input {
    margin: 0.5rem;
    transform: scale(1.6);
  }
`;

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
      <CheckboxContainer passed={readOnlyMode}>
        <input
          type="checkbox"
          checked={readOnlyMode}
          onChange={readOnlyHandleClick}
        ></input>
        <label>Read only</label>
      </CheckboxContainer>
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
