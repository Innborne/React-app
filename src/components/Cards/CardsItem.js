import "./CardsItem.css";
import { useState } from "react";
import { FiEdit3, FiSave, FiX } from "react-icons/fi";

function CardsItem(props) {
  const [editMode, setEditMode] = useState(false);
  const [userInput, setUserInput] = useState({
    enteredTitle: props.card.title,
    enteredText: props.card.text,
  });
  const [checkedValue, setChecked] = useState(props.card.check);

  const handleClick = () => {
    setChecked(!checkedValue);
  };

  const onSaveClick = () => {
    setEditMode(false);
    props.onSaveCardData({
      id: props.card.id,
      title: userInput.enteredTitle,
      text: userInput.enteredText,
      check: checkedValue,
    });
  };

  const onEditClick = () => {
    setUserInput({
      enteredText: props.card.text,
      enteredTitle: props.card.title,
    });
    setEditMode(true);
    setChecked(false);
  };

  const onCancelClick = () => {
    setEditMode(false);
  };

  const editCards = () => {
    return editMode ? (
      <div className="cards-edit">
        <FiSave onClick={onSaveClick}></FiSave>
        <FiX onClick={onCancelClick}></FiX>
      </div>
    ) : (
      <div className="cards-edit">
        <FiEdit3 onClick={onEditClick}></FiEdit3>
        {!editMode && (
          <input
            className="cards-checkbox"
            type="checkbox"
            checked={checkedValue}
            onChange={handleClick}
          ></input>
        )}
      </div>
    );
  };

  const titleChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
  };

  const textChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredText: event.target.value };
    });
  };

  const cardCaption = () => {
    return editMode ? (
      <input
        type="text"
        className="cards-edit-title"
        value={userInput.enteredTitle}
        onChange={titleChangeHandler}
      ></input>
    ) : (
      <h2 className="cards_title">{props.card.title}</h2>
    );
  };

  const cardText = () => {
    return editMode ? (
      <textarea
        className="cards-edit-text"
        value={userInput.enteredText}
        onChange={textChangeHandler}
      ></textarea>
    ) : (
      <p className="cards_text">{props.card.text}</p>
    );
  };

  const cardChecked = checkedValue ? "cards-item-checked" : "";

  return (
    <div className={`cards-item ${cardChecked}`}>
      <div>
        <div className="card-title-container">
          {cardCaption()}
          {editCards()}
        </div>
        {cardText()}
      </div>
    </div>
  );
}

export default CardsItem;
