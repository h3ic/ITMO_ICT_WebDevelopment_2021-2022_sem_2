import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import useController from "../store";
import styled from 'styled-components';
import {pagination} from "../utils";

const $RingsContainer = styled.div`
  margin: 100px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const $TableContainer = styled.div`
  min-height: 200px;
  width: 600px;
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
      <$FiltersContainer>
        <fieldset>
          <legend>Type of shows</legend>
          <label>
            <input type='radio' name={'showType'} value={'mono'} onChange={handleShowTypeChange}/>
            Mono
          </label>
          <label>
            <input type='radio' name={'showType'} value={'poly'} onChange={handleShowTypeChange}/>
            Poly
          </label>
        </fieldset>

        <fieldset>
          <legend>Breed of rings</legend>
          <label>
            <input type='radio' name={'breed'} value={'b'} onChange={handleBreedChange}/>
            Bulldog
          </label>
          <label>
            <input type='radio' name={'breed'} value={'r'} onChange={handleBreedChange}/>
            Retriever
          </label>
          <label>
            <input type='radio' name={'breed'} value={'p'} onChange={handleBreedChange}/>
            Poodle
          </label>
        </fieldset>
      </$FiltersContainer>

      <$TableContainer>

        {ringsData &&
        <table>

          <thead>
          <tr>
            <th>id</th>
            <th>breed</th>
            <th>show</th>
            <th>experts</th>
          </tr>
          </thead>

          <tbody>
          {ringsData.results.map((item, index) =>
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.breed}</td>
              <td>{item.show}</td>
              <td>{item.experts.join(', ')}</td>
            </tr>
          )}
          </tbody>
        </table>
        }

        {pagination(ringsData, handlePaginationClick)}
      </$TableContainer>
    </$RingsContainer>
  )
}

export default observer(Rings);
