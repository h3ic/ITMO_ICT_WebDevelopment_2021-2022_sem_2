import {observer} from "mobx-react";
import {useEffect} from "react";
import useController from "../store";
import styled from 'styled-components';

const $ExpertsContainer = styled.div`
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

  useEffect(() => {
    controller.getExperts();
  }, []);

  const experts = controller.expertsData?.results;

  return (
    <$ExpertsContainer>
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
        {experts.map((item, index) =>
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
    </$ExpertsContainer>
  )
}

export default observer(Experts);
