import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: flex;
  width: 100%;
  margin-left: 0.25rem;
  align-items: center;
  color: white;
  opacity: ${({ passed }) => (passed ? "100%" : "50%")};
`;

const CheckboxInput = styled.input`
  margin: 0.5rem;
  transform: scale(1.6);
`;

function CardsCheckbox(props) {
  return (
    <CheckboxContainer passed={props.checked}>
      <CheckboxInput
        type={props.type}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label>{props.children}</label>
    </CheckboxContainer>
  );
}

export default CardsCheckbox;
