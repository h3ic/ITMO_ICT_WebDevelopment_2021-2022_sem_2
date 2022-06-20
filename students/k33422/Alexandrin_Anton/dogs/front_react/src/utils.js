import styled from "styled-components";
import Button from '@mui/material/Button';

export const formReducer = (state, e) => {
  return {
    ...state,
    [e.name]: e.value
  }
}

// export const convertBreeds = (data) => {
// }

const $Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

export const $Button = styled(Button)`
  cursor: pointer;
  background-color: ${({isActive}) => isActive ? 'darkgray' : 'lightgray'} !important;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  color: black !important;
`;


export const pagination = (data, handlePaginationClick) => {
  const buttons = [];
  for (let i = 1; i <= data?.num_pages; i++) {
    buttons.push(
      <$Button
        variant={'contained'}
        key={i}
        onClick={() => handlePaginationClick(i)}
        isActive={data?.page_number === i}>
        {i}
      </$Button>
    );
  }
  return (
    <$Pagination>
      {buttons}
    </$Pagination>
  );
}
