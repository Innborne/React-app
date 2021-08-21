import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  color: white;
  opacity: ${({ checked }) => (checked ? '100%' : '50%')};
  transition: all 0.4s cubic-bezier(0.05, 0, 0, 1);
`;

const CheckboxInput = styled.input`
  transform: scale(1.6);
`;

function CardListCheckbox(props) {
  return (
    <CheckboxContainer checked={props.checked}>
      <CheckboxInput
        type={props.type}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label>{props.children}</label>
    </CheckboxContainer>
  );
}

export default CardListCheckbox;
