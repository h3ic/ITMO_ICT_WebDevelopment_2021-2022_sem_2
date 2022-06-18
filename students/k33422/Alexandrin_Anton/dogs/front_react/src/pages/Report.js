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

  margin: 250px auto;
  display: flex;
  justify-content: space-evenly;
  
  h2 {
    position: absolute;
    top: 220px;
    left: 708px;
  }
`;

const $ShowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const $ReportContainer = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

const $Button = styled.button`
  cursor: pointer;
  background: ${({isActive}) => isActive ? 'darkgray' : 'lightgray'};
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

const Report = () => {
  const {controller} = useController();
  const [shows, setShows] = useState();
  const [reportData, setReportData] = useState();
  const [currYear, setCurrYear] = useState();

  useEffect(() => {
    controller.getShows()
      .then((data) => setShows(data));
    if (currYear) {
      controller.getReport(currYear)
        .then((data) => setReportData(data));
    }
  }, [currYear]);

  return (
    <$Container>
      <h2>Reports</h2>
      <$ShowsContainer>
        {shows?.results.map((item, index) =>
          <$Button
            key={index}
            isActive={item.year === currYear}
            onClick={() => setCurrYear(item.year)}>
            {item.year}
          </$Button>
        )}
      </$ShowsContainer>

      {reportData &&
      <$ReportContainer>
        <ul>
          <li>
            Participants count: {reportData.participant_count}
          </li>
          <li>
            {`Most popular breed: ${reportData.breeds[0]?.breed || 'Not clear yet'} ${reportData.breeds[0]?.count || ''}`}
          </li>
          <li>
            Best grades: {reportData.best_grades}
          </li>
          <li>
            {`Medals: ${reportData.medals[0]?.breed}, ${reportData.medals[0]?.medals_count}`}
          </li>
        </ul>
      </$ReportContainer>
      }
    </$Container>
  )
}

export default observer(Report);
