import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import useController from "../store";
import styled from 'styled-components';
import {pagination} from "../utils";

const $ExpertsContainer = styled.div`
  h2 {
    margin-top: 170px;
  }
  table {
    margin: 100px auto;
    border-collapse: separate;
    
    td, th {
      padding: 5px 10px;
    }
  }
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

  return (
    <$ExpertsContainer>
      <h2>Experts</h2>
      {experts &&
      <table>

        <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>last_name</th>
          <th>club</th>
          <th>ring</th>
        </tr>
        </thead>

        <tbody>
        {experts?.results.map((item, index) =>
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.last_name}</td>
            <td>{item.club}</td>
            <td>{item.ring || '-'}</td>
          </tr>
        )}
        </tbody>
      </table>
      }
      {experts && pagination(experts, handlePaginationClick)}
    </$ExpertsContainer>
  )
}

export default observer(Experts);
