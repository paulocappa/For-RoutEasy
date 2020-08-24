import styled from 'styled-components';

export default styled.button.attrs((props) => ({
  type: 'button',
  width: `${10 + (props.pointCount / props.pointsLength) * 20}px`,
  height: `${10 + (props.pointCount / props.pointsLength) * 20}px`,
}))`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid #000;
`;
