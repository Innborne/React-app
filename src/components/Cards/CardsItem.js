import "./CardsItem.css";
import { useState, useEffect } from "react";
import { FiEdit3, FiSave, FiX } from "react-icons/fi";

function CardsItem({ card, onSaveCardData, readOnly }) {
  const [editMode, setEditMode] = useState(false);
  const [userInput, setUserInput] = useState({
    enteredTitle: card.title,
    enteredText: card.text,
  });
  const [checkedValue, setChecked] = useState(card.check);

  useEffect(() => {
    if (readOnly && editMode) {
      setEditMode(false);
    }
  }, [readOnly, editMode]);

  const handleClick = () => {
    setChecked(!checkedValue);
  };

  const onSaveClick = () => {
    setEditMode(false);
    onSaveCardData({
      id: card.id,
      title: userInput.enteredTitle,
      text: userInput.enteredText,
      check: checkedValue,
    });
  };

  const onEditClick = () => {
    setUserInput({
      enteredText: card.text,
      enteredTitle: card.title,
    });
    setEditMode(true);
    setChecked(false);
  };

  const onCancelClick = () => {
    setEditMode(false);
  };

  const cardEditMode = () => {
    return (
      <div>
        <div className="card-title-container">
          <input
            type="text"
            className="cards-edit-title"
            value={userInput.enteredTitle}
            onChange={titleChangeHandler}
          ></input>
          <div className="cards-edit">
            <FiSave onClick={onSaveClick}></FiSave>
            <FiX onClick={onCancelClick}></FiX>
          </div>
        </div>
        <textarea
          className="cards-edit-text"
          value={userInput.enteredText}
          onChange={textChangeHandler}
        ></textarea>
      </div>
    );
  };

  const cardReadMode = () => {
    return (
      <div>
        <div className="card-title-container">
          <h2 className="cards_title">{card.title}</h2>
          <div className="cards-edit">
            {!readOnly && <FiEdit3 onClick={onEditClick}></FiEdit3>}
            <input
              className="cards-checkbox"
              type="checkbox"
              checked={checkedValue}
              onChange={handleClick}
            ></input>
          </div>
        </div>
        <p className="cards_text">{card.text}</p>
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

  return (
    <div className={`cards-item ${checkedValue ? "checked" : ""}`}>
      {editMode ? cardEditMode() : cardReadMode()}
    </div>
  );
}

export default CardsItem;
