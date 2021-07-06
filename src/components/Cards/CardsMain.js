import CardsItem from "./CardsItem";
import "./CardsMain.css";

function CardsMain(props) {
  const saveCardDataHandler = (enteredCardsData) => {
    props.OnChangeCards({ ...enteredCardsData });
  };
  return (
    <div className="cards-main">
      {props.items.map((cardData) => (
        <CardsItem
          onSaveCardData={saveCardDataHandler}
          key={cardData.id}
          card={cardData}
        ></CardsItem>
      ))}
    </div>
  );
}

export default CardsMain;
