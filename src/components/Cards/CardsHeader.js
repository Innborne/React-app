import "./CardsHeader.css";

function CardsHeader(props) {
  return <header className="cards-header">{props.children}</header>;
}

export default CardsHeader;
