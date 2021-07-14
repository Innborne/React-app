import { FiEdit3, FiSave, FiX } from "react-icons/fi";

import "./CardHeader.css";

function CardHeader(props) {
  const cardTitleEditMode = () => {
    return (
      <div className="card-header-container">
        <input
          type="text"
          className="card-header-edit-title"
          value={props.headerTitle}
          onChange={(event) => props.onTitleChange(event.target.value)}
        ></input>
        <div className="card-header-edit-buttons">
          <FiSave onClick={props.onSaveClick}></FiSave>
          <FiX onClick={props.onCancelClick}></FiX>
        </div>
      </div>
    );
  };

  const cardTitleReadMode = () => {
    return (
      <div className="card-header-container">
        <h2 className="card-header-title">{props.headerTitle}</h2>
        <div className="card-header-edit-buttons">
          {!props.readOnly && <FiEdit3 onClick={props.onEditClick}></FiEdit3>}
          <input
            className="card-header-checkbox"
            type="checkbox"
            checked={props.onCheck}
            onChange={props.handleClick}
          ></input>
        </div>
      </div>
    );
  };

  return <>{props.editMode ? cardTitleEditMode() : cardTitleReadMode()}</>;
}

export default CardHeader;
