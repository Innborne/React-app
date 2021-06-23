import "./CardsItem.css";
import { useState } from "react";

function CardsItem(props) {
  const [checkedValue, setChecked] = useState(props.check);
  const handleClick = () => setChecked(!checkedValue);
  const cardChecked = checkedValue ? "cards-item-checked" : "";

  return (
    <div className={`cards-item ${cardChecked}`}>
      <div>
        <h2 className="cards_title">{props.title}</h2>
        <input
          className="cards-checkbox"
          type="checkbox"
          checked={checkedValue}
          onChange={handleClick}
        ></input>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default CardsItem;
