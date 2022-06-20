import * as React from 'react';
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import useController from "../store";
import styled from 'styled-components';
import {pagination} from "../utils";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const $ExpertsContainer = styled.div`
  h2 {
    margin-top: 170px;
  }
  width: 1094px;
`;

const Experts = () => {
  const {controller} = useController();
  const [experts, setExperts] = useState();
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    controller.getExperts(currPage)
      .then((data) => setExperts(data));
  }, [currPage]);

  const handlePaginationClick = (pageNum) => {
    setCurrPage(pageNum);
  }

  const $Cont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <$Cont>

    <$ExpertsContainer>
      <h2>Experts</h2>
      {experts &&
      <TableContainer component={Paper} style={{marginBottom: 50}}>
        <Table style={{margin: '50px 200px', width: '600px'}}>

          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>last_name</TableCell>
              <TableCell>club</TableCell>
              <TableCell>ring</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {experts?.results.map((item, index) =>
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.last_name}</TableCell>
                <TableCell>{item.club}</TableCell>
                <TableCell>{item.ring || '-'}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      }
      {experts && pagination(experts, handlePaginationClick)}
    </$ExpertsContainer>
    </$Cont>
  )
}

export default observer(Experts);
