import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import useController from "../store";
import styled from 'styled-components';
import {pagination} from "../utils";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Radio, RadioGroup} from "@mui/material";

const $RingsContainer = styled.div`
  margin: 250px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  h2 {
    position: absolute;
    top: 220px;
    left: 708px;
  }
`;

const $TableContainer = styled.div`
  min-height: 200px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const $FiltersContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin: 20px;
  padding: 30px;
  
  fieldset div label {
    display: flex;
    align-items: center;
  }
`;

const Rings = () => {
  const {controller} = useController();
  const [ringsData, setRingsData] = useState();
  const [currPage, setCurrPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    showType: null,
    breed: null
  })

  useEffect(() => {
    controller.getRings(searchParams, currPage)
      .then((data) => setRingsData(data));
  }, [searchParams, currPage]);

  const handleShowTypeChange = (e) => {
    setSearchParams(prevState => {
      return {
        ...prevState,
        showType: e.target.value
      }
    })
  }

  const handleBreedChange = (e) => {
    setSearchParams(prevState => {
      return {
        ...prevState,
        breed: e.target.value
      }
    })
  }

  const handlePaginationClick = (pageNum) => {
    setCurrPage(pageNum);
  }

  return (
    <$RingsContainer>
      <h2>Rings</h2>
      <$FiltersContainer>
        <fieldset>
          <RadioGroup>
            <legend>Type of shows</legend>
            <label>
              <Radio type='radio' name={'showType'} value={'mono'} onChange={handleShowTypeChange}/>
              Mono
            </label>
            <label>
              <Radio type='radio' name={'showType'} value={'poly'} onChange={handleShowTypeChange}/>
              Poly
            </label>
          </RadioGroup>
        </fieldset>

        <fieldset>
          <RadioGroup>
            <legend>Breed of rings</legend>
            <label>

              <Radio type='radio' name={'breed'} value={'b'} onChange={handleBreedChange}/>
              Bulldog
            </label>
            <label>
              <Radio type='radio' name={'breed'} value={'r'} onChange={handleBreedChange}/>
              Retriever
            </label>
            <label>
              <Radio type='radio' name={'breed'} value={'p'} onChange={handleBreedChange}/>
              Poodle
            </label>
          </RadioGroup>
        </fieldset>
      </$FiltersContainer>

      <$TableContainer>

        {ringsData &&
        <TableContainer component={Paper} style={{marginBottom: 50}}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>breed</TableCell>
                <TableCell>show</TableCell>
                <TableCell>experts</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ringsData.results.map((item, index) =>
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.breed}</TableCell>
                  <TableCell>{item.show}</TableCell>
                  <TableCell>{item.experts.join(', ')}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        }

        {pagination(ringsData, handlePaginationClick)}
      </$TableContainer>
    </$RingsContainer>
  )
}

export default observer(Rings);
