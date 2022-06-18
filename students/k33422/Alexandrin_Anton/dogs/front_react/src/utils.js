import styled from "styled-components";

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

export const $Button = styled.button`
  cursor: pointer;
  background: ${({isActive}) => isActive ? 'darkgray' : 'lightgray'};
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;


export const pagination = (data, handlePaginationClick) => {
  const buttons = [];
  for (let i = 1; i <= data?.num_pages; i++) {
    buttons.push(
      <$Button
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
