import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { cardListActions } from '../../store/cards';

import './CardDetail.css';

const CardDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const card = useSelector((state) =>
    state.items.find((card) => card.id === params.id)
  );
  const history = useHistory();

  if (card === undefined) {
    history.push('/notfound');
  }

  const [titleValue, setTitleValue] = useState(
    card !== undefined ? card.title : ''
  );
  const [textValue, setTextValue] = useState(
    card !== undefined ? card.text : ''
  );

  const titlePlh = 'Title...',
    textPlh = 'Text...',
    changeCardButtonText = 'OK',
    cancelButtonText = 'Cancel';

  const changeTitleHandler = (event) => {
    setTitleValue(event.target.value);
  };

  const changeTextHandler = (event) => {
    setTextValue(event.target.value);
  };

  const saveCardHandler = () => {
    dispatch(
      cardListActions.onChangeCard({
        id: card.id,
        title: titleValue,
        text: textValue,
      })
    );
    history.push('/');
  };

  const cancelCardHandler = () => {
    history.push('/');
  };

  return (
    <div className="card-detail-container">
      <div className="card-edit-container">
        <input
          placeholder={titlePlh}
          value={titleValue}
          onChange={changeTitleHandler}
        />
        <textarea
          placeholder={textPlh}
          value={textValue}
          onChange={changeTextHandler}
        />
        <div className="card-idit-button-container">
          <button onClick={saveCardHandler}>{changeCardButtonText}</button>
          <button onClick={cancelCardHandler}>{cancelButtonText}</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
