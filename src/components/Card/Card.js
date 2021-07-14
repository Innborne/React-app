import { useState, useEffect } from "react";
import classNames from "classnames";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";

import "./Card.css";

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
      ></CardHeader>
      <CardBody
        bodyText={userInput.enteredText}
        editMode={editMode}
        onTextChange={textChangeHandler}
      ></CardBody>
    </div>
  );
}

export default Card;
