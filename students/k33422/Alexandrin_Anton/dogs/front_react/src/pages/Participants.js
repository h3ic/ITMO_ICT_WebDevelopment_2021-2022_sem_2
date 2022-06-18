import {observer} from "mobx-react";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import useController from "../store";
import styled from 'styled-components';
import {Checkbox, Input} from "@mui/material";
import {pagination} from "../utils";

const $ParticipantsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 250px;
  
  h2 {
    position: absolute;
    top: 220px;
    left: 708px;
  }
`;

const $TableContainer = styled.div`
  min-height: 250px;
  width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  table {
    margin: 0 100px;
    height: 100%;
    border-collapse: separate;

    td, th {
      padding: 5px 10px;
    }
  }
`;

const $FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Participants = () => {
  const {controller} = useController();
  const [participants, setParticipants] = useState();
  const [currPage, setCurrPage] = useState(1);

  const [ageRange, setAgeRange] = useState({
    min: null,
    max: null
  });

  const [isOrdered, setOrdered] = useState(false);

  useEffect(() => {
    controller.getParticipants(
      currPage,
      ageRange.min,
      ageRange.max,
      isOrdered
    )
      .then((data) => setParticipants(data));
  }, [currPage, ageRange.min, ageRange.max, isOrdered]);

  const handleMinAgeChange = (e) => {
    setAgeRange(prevState => {
      return {
        ...prevState,
        min: e.target.value
      }
    })
  }

  const handleMaxAgeChange = (e) => {
    setAgeRange(prevState => {
      return {
        ...prevState,
        max: e.target.value
      }
    })
  }

  const handlePaginationClick = (pageNum) => {
    setCurrPage(pageNum);
  }

  return (
    <$ParticipantsContainer>
      <h2>Participants</h2>
      <$FiltersContainer>
        <p>Min age:</p>
        <Input type='number'
               onChange={handleMinAgeChange}/>
        <p>Max age:</p>
        <Input type='number'
               onChange={handleMaxAgeChange}/>

        <div style={{display: 'flex', marginTop: '10px'}}>
          <Checkbox value={isOrdered}
                    onChange={(e) => setOrdered(e.target.checked)}/>
          <p>Order by vaccination date?</p>
        </div>
      </$FiltersContainer>
      <$TableContainer>

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
              <td>
                <NavLink to={`/participant/${item.id}`}
                         onClick={() =>
                           controller.setCurrParticipantId(item.id)}>
                  {item.name}
                </NavLink>
              </td>
              <td>{item.age}</td>
              <td>{item.breed}</td>
              <td>
                <Checkbox checked={item.dismissed}/>
              </td>
              <td>{item.club}</td>
              <td>{item.previous_vaccination || '-'}</td>
              <td>{item.vaccinated}</td>
            </tr>
          )}
          </tbody>
        </table>
        }

        {pagination(participants, handlePaginationClick)}
      </$TableContainer>

    </$ParticipantsContainer>
  )
}

export default observer(Participants);
