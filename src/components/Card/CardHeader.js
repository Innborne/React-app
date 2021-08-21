import { FiEdit3, FiSave, FiX } from 'react-icons/fi';

import './CardHeader.css';

function CardHeader(props) {
  const titlePlh = 'Title...';

  const cardTitleEditMode = () => {
    return (
      <div className="card-header-container">
        <input
          type="text"
          placeholder={titlePlh}
          value={props.headerTitle}
          onChange={(event) => props.onTitleChange(event.target.value)}
        />
        <div className="card-header-edit-buttons">
          <FiSave onClick={props.onSaveClick} />
          <FiX onClick={props.onCancelClick} />
        </div>
      </div>
    );
  };

  const cardTitleReadMode = () => {
    return (
      <div className="card-header-container">
        <h2 className="card-header-title">{props.headerTitle}</h2>
        {!props.readOnly && (
          <div className="card-header-edit-buttons">
            <FiEdit3 onClick={props.onEditClick} />
            <input
              type="checkbox"
              checked={props.onCheck}
              onChange={props.handleClick}
            />
          </div>
        )}
      </div>
    );
  };

  return props.editMode ? cardTitleEditMode() : cardTitleReadMode();
}

export default CardHeader;
