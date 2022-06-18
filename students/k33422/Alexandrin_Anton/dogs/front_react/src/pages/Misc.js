import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import useController from "../store";
import styled from 'styled-components';

const $Container = styled.div`
  table {
    margin: 100px auto;
    border-collapse: separate;

    td, th {
      padding: 5px 10px;
    }
  }

  margin: 100px auto;
  display: flex;
  justify-content: space-evenly;
`;

const Misc = () => {
  const {controller} = useController();
  const [breedExperts, setBreedExperts] = useState();
  const [breedsCount, setBreedsCount] = useState();

  useEffect(() => {
    controller.getBreedExperts()
      .then((data) => setBreedExperts(data));
    controller.getBreedsCount()
      .then((data) => setBreedsCount(data));
  }, []);

  return (
    <$Container>

      <div>
        <h3>Which experts judge breeds?</h3>
        <br/>
        <ul>
          {breedExperts?.results?.map((item, index) =>
            <li key={index}>
              {`${item.breed}: ${item.experts.map(exp => `${exp.name} ${exp.last_name}`).join(', ')}`}
            </li>
          )}
        </ul>

        <br/>
        <h3>How many dogs of each breed there is?</h3>
        <br/>
        <ul>
          {breedsCount?.breed_count?.map((item, index) =>
            <li key={index}>
              {`${item.breed}: ${item.count}`}
            </li>
          )}
        </ul>

      </div>
    </$Container>
  )
}

export default observer(Misc);
