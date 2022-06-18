import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import useController from "../store";
import styled from 'styled-components';

const $RingsContainer = styled.div`
  table {
    margin: 100px auto;
    border-collapse: separate;
    
    td, th {
      padding: 5px 10px;
    }
  }
`;

const Rings = () => {
  const {controller} = useController();
  const [ringsData, setRingsData] = useState();

  useEffect(() => {
    controller.getRings()
      .then((data) => setRingsData(data));
  }, []);

  return (
    <$RingsContainer>
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
    </$RingsContainer>
  )
}

export default observer(Rings);
