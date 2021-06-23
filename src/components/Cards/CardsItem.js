import "./CardsItem.css";

function CardsItem(props) {
  return (
    <div className="cards-item">
      <div>
        <h2 className="cards_title">{props.title}</h2>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default CardsItem;
