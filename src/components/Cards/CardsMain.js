import CardsItem from "./CardsItem";
import './CardsMain.css';

function CardsMain(props) {
  return (
    <div className="cards-main">
      <CardsItem
        title={props.items[0].title}
        text={props.items[0].text}
        check={props.items[0].check}
      ></CardsItem>
      <CardsItem
        title={props.items[1].title}
        text={props.items[1].text}
        check={props.items[1].check}
      ></CardsItem>
    </div>
  );
}

export default CardsMain;
