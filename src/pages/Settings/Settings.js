import { useDispatch, useSelector } from 'react-redux';
import { cardListActions } from '../../store/cards';
import CardListCheckbox from '../../components/CardListCheckbox/CardListCheckbox';
import './Settings.css';

function Settings() {
  const dispatch = useDispatch();
  const readOnlyMode = useSelector((state) => state.cards.readOnly);
  const readOnlyModeText = 'Read-only mode',
    settingTitle = 'Settings';
  const readOnlyHandleClick = () => {
    dispatch(cardListActions.setReadOnlyMode(!readOnlyMode));
  };

  return (
    <div className="settings-container">
      <div className="checkbox-container">
        <span>{settingTitle}</span>
        <CardListCheckbox
          type="checkbox"
          checked={readOnlyMode}
          onChange={readOnlyHandleClick}
        >
          {readOnlyModeText}
        </CardListCheckbox>
      </div>
    </div>
  );
}

export default Settings;
