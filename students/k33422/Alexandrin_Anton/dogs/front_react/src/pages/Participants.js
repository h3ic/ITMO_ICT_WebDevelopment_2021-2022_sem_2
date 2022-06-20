import {observer} from "mobx-react";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import useController from "../store";
import styled from 'styled-components';
import {Checkbox, Input} from "@mui/material";
import {pagination} from "../utils";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const $ParticipantsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 250px;
  column-gap: 100px;
  
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
  
  a {
    padding: 10px;
    background: wheat;
    border-radius: 4px;
  }
`;

const $FiltersContainer = styled(Paper)`
  margin-top: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
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
          <TableContainer component={Paper} style={{marginBottom: 50}}>
        <Table>

          <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>age</TableCell>
            <TableCell>breed</TableCell>
            <TableCell>dismissed</TableCell>
            <TableCell>club</TableCell>
            <TableCell>previous_vaccination</TableCell>
            <TableCell>vaccinated</TableCell>
          </TableRow>
          </TableHead>

          <TableBody>
          {participants.results.map((item, index) =>
            <TableRow key={index}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <NavLink to={`/participant/${item.id}`}
                         onClick={() =>
                           controller.setCurrParticipantId(item.id)}>
                  {item.name}
                </NavLink>
              </TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>{item.breed}</TableCell>
              <TableCell>
                <Checkbox checked={item.dismissed}/>
              </TableCell>
              <TableCell>{item.club}</TableCell>
              <TableCell>{item.previous_vaccination || '-'}</TableCell>
              <TableCell>{item.vaccinated}</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
          </TableContainer>
        }

        {pagination(participants, handlePaginationClick)}
      </$TableContainer>

    </$ParticipantsContainer>
  )
}

export default observer(Participants);
