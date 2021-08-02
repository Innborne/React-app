import './CardBody.css';

function CardBody(props) {
  const cardTextEditMode = () => {
    return (
      <textarea
        className="card-body-edit"
        value={props.bodyText}
        onChange={(event) => props.onTextChange(event.target.value)}
      />
    );
  };

  const cardTextReadMode = () => {
    return <p className="card-body">{props.bodyText}</p>;
  };

  return props.editMode ? cardTextEditMode() : cardTextReadMode();
}

export default CardBody;
