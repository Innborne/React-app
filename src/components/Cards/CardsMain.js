import CardsItem from "./CardsItem";
import './CardsMain.css';

function CardsMain(props) {
  return (
    <div className="cards-main">
      <CardsItem
        title={props.items[0].title}
        text={props.items[0].text}
      ></CardsItem>
    </div>
  );
}

export default CardsMain;
