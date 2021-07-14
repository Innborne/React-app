import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: flex;
  margin-left: 0.25rem;
  align-items: center;
  color: white;
  opacity: ${({ checked }) => (checked ? "100%" : "50%")};
`;

const CheckboxInput = styled.input`
  margin: 0.5rem;
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
