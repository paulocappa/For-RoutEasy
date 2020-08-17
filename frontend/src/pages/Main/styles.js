import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  display: flex;
  background: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  @media (max-width: 1100px) {
    flex-direction: column;
    margin: 0 auto;
  }
`;

export const Form = styled.form`
  max-height: 500px;
  width: 400px;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #999;
  background: #eee;
  display: flex;
  flex-direction: column;

  > input {
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #999;
  }

  > input + input {
    margin-top: 20px;
  }

  > button {
    margin-top: 80px;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #999;
    background: #32cd32;
    color: #fff;
    font-weight: bold;
    letter-spacing: 2px;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 1100px) {
    width: 100%;

    > button {
      margin-top: 40px;
    }
  }
`;

export const SearchAddress = styled.div`
  display: flex;
  margin-top: 20px;
  position: relative;

  input {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #999;
    padding-right: 80px;
  }

  button {
    border: 0;
    background: none;
    position: absolute;
    top: 12px;
    right: 15px;
    text-decoration: underline;
  }
`;

export const GeoInputs = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    flex: 1;
    padding: 10px 0;
    background: #d3d3d3;
    border: 1px solid #999;
    text-align: center;
  }

  input::placeholder {
    text-align: center;
    color: #999;
    font-weight: bold;
    font-size: 16px;
    letter-spacing: 1px;
  }

  input + input {
    margin-left: 10px;
  }

  @media (max-width: 460px) {
    flex-direction: column;
    margin-top: 30px;

    input {
      width: 100%;
      margin-top: 10px;
    }

    input + input {
      margin-left: 0;
    }
  }
`;

export const Reset = styled.div`
  display: flex;

  margin-top: 50px;

  button {
    flex: 1;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #999;
    background: #ff0000;
    color: #fff;
    font-weight: bold;
    letter-spacing: 2px;
  }

  @media (max-width: 460px) {
    margin-top: 20px;
  }
`;

export const MapAndTable = styled.div`
  flex: 1;
  margin-left: 30px;

  p {
    margin-top: 20px;
  }

  @media (max-width: 1100px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 5px;

  thead {
    background: #999;
  }

  thead th {
    color: #eee;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    text-align: left;
  }

  .dark td {
    background: #c0c0c0;
  }

  .light td {
    background: #dcdcdc;
  }

  @media (max-width: 680px) {
    display: none;
  }
`;
