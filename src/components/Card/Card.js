import { useState, useEffect } from "react";
import classNames from "classnames";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";
import WithLoadingDelay from "../withLoadingDelay/withLoadingDelay";
import styled from "styled-components";

import "./Card.css";

const CardDelayContainer = styled.div`
  display: flex;
  min-width: calc(100% / 3 - 1rem / 3 * 2);
  max-width: 100%;
  min-height: 10rem;
`;

const CardWithDelay = WithLoadingDelay(Card, CardDelayContainer);

function Card({ card, onSaveCardData, readOnly }) {
  const [editMode, setEditMode] = useState(false);
  const [userInput, setUserInput] = useState({
    enteredTitle: card.title,
    enteredText: card.text,
  });

  useEffect(() => {
    if (readOnly && editMode) {
      setUserInput({
        enteredText: card.text,
        enteredTitle: card.title,
      });
      setEditMode(false);
    }
  }, [readOnly, editMode, card]);

  const onHandle = () => {
    onSaveCardData({
      id: card.id,
      check: !card.check,
    });
  };

  const onSave = () => {
    setEditMode(false);
    onSaveCardData({
      id: card.id,
      title: userInput.enteredTitle,
      text: userInput.enteredText,
    });
  };

  const onEdit = () => {
    onSaveCardData({
      id: card.id,
      check: false,
    });
    setEditMode(true);
  };

  const onCancel = () => {
    setUserInput({
      enteredText: card.text,
      enteredTitle: card.title,
    });
    setEditMode(false);
  };

  const titleChangeHandler = (titleValue) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: titleValue };
    });
  };

  const textChangeHandler = (textValue) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredText: textValue };
    });
  };

  return (
    <div className={classNames("card-item", { checked: card.check })}>
      <CardHeader
        headerTitle={userInput.enteredTitle}
        onTitleChange={titleChangeHandler}
        onCheck={card.check}
        editMode={editMode}
        readOnly={readOnly}
        onSaveClick={onSave}
        onEditClick={onEdit}
        onCancelClick={onCancel}
        handleClick={onHandle}
      />
      <CardBody
        bodyText={userInput.enteredText}
        editMode={editMode}
        onTextChange={textChangeHandler}
      />
    </div>
  );
}

export default Card;
export { CardWithDelay };
