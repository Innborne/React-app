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
          <h2 className="cards_title">{props.card.title}</h2>
          <div className="cards-edit">
            {!props.readOnly && <FiEdit3 onClick={onEditClick}></FiEdit3>}
            <input
              className="cards-checkbox"
              type="checkbox"
              checked={checkedValue}
              onChange={handleClick}
            ></input>
          </div>
        </div>
        <p className="cards_text">{props.card.text}</p>
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

  const cardChecked = checkedValue ? "cards-item-checked" : "";

  return (
    <div className={`cards-item ${cardChecked}`}>
      {editMode
        ? props.readOnly
          ? setEditMode(false)
          : cardEditMode()
        : cardReadMode()}
    </div>
  );
}

export default CardsItem;
