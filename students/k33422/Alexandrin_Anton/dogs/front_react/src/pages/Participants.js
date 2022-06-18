import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import useController from "../store";
import styled from 'styled-components';

const $ParticipantsContainer = styled.div`
  height: 100px;

  table {
    margin: 100px auto;
    height: 100%;
    border-collapse: separate;

    td, th {
      padding: 5px 10px;
    }
  }
`;

const $Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

const $Button = styled.button`
  cursor: pointer;
  background: ${({isActive}) => isActive ? 'darkgray' : 'lightgray'};
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

const Participants = () => {
  const {controller} = useController();
  const [participants, setParticipants] = useState();
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    controller.getParticipants(currPage)
      .then((data) => setParticipants(data));
  }, [currPage]);

  console.log('part', participants);

  const pagination = () => {
    const buttons = [];
    for (let i = 1; i <= participants?.num_pages; i++) {
      buttons.push(
        <$Button onClick={() => setCurrPage(i)}
                 isActive={participants?.page_number === i}>
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

  return (
    <$ParticipantsContainer>
      {participants &&
      <table>

        <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>age</th>
          <th>breed</th>
          <th>dismissed</th>
          <th>club</th>
          <th>previous_vaccination</th>
          <th>vaccinated</th>
        </tr>
        </thead>

        <tbody>
        {participants.results.map((item, index) =>
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.breed}</td>
            <td>
              <input type='checkbox' value={item.dismissed}/>
            </td>
            <td>{item.club}</td>
            <td>{item.previous_vaccination}</td>
            <td>{item.vaccinated}</td>
          </tr>
        )}
        </tbody>
      </table>
      }

      {pagination()}

    </$ParticipantsContainer>
  )
}

export default observer(Participants);
