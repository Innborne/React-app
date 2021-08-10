import { useState } from 'react';
import { CardWithDelay } from '../Card/Card';
import CardListCheckbox from './CardListCheckbox';
import CardAdding from '../CardAdding/CardAdding';

import './CardList.css';
import { useDispatch, useSelector } from 'react-redux';
import { cardListActions } from '../../store/cards';

function CardList() {
  const deleteButtonText = 'delete selected cards',
    addButtonText = 'add card',
    readOnlyCheckboxText = 'Read only';
  const [readOnlyMode, setReadOnlyMode] = useState(true);
  const [cardAddingMode, setCardAddingMode] = useState(false);
  const cards = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const readOnlyHandleClick = () => {
    setReadOnlyMode((prevReadOnlyMode) => !prevReadOnlyMode);
  };

  const addCardButtonHandler = () => {
    setCardAddingMode((prevCardAddingState) => !prevCardAddingState);
  };

  const addCardHandler = (enteredData) => {
    dispatch(cardListActions.onAddCard(enteredData));
  };

  const changeCardHandler = (enteredData) => {
    dispatch(cardListActions.onChangeCard(enteredData));
  };

  const deleteCardHandler = () => {
    dispatch(cardListActions.onDeleteCard());
  };

  return (
    <div className="card-list">
      <div className="card-list-header">
        <button
          className="card-list-button"
          disabled={cardAddingMode}
          onClick={addCardButtonHandler}
        >
          {addButtonText}
        </button>
        {cards.find((card) => card.check) && (
          <button className="card-list-button" onClick={deleteCardHandler}>
            {deleteButtonText}
          </button>
        )}
        <CardListCheckbox
          type="checkbox"
          checked={readOnlyMode}
          onChange={readOnlyHandleClick}
        >
          {readOnlyCheckboxText}
        </CardListCheckbox>
      </div>
      {cardAddingMode && (
        <CardAdding
          disableCardMode={addCardButtonHandler}
          onAddCard={addCardHandler}
        />
      )}
      {cards.map((cardData) => (
        <CardWithDelay
          onSaveCardData={changeCardHandler}
          key={cardData.id}
          card={cardData}
          readOnly={readOnlyMode}
        />
      ))}
    </div>
  );
}

export default CardList;
