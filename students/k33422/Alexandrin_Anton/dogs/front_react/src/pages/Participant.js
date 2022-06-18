import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import useController from "../store";
import styled from 'styled-components';

const $Container = styled.div`
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
`;

const $FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Participant = () => {
  const {controller} = useController();
  const [participantData, setParticipantData] = useState();
  const [currPhoto, setCurrPhoto] = useState();

  useEffect(() => {
    controller.getParticipant(controller.currParticipantId)
      .then((data) => setParticipantData(data));
    controller.getParticipantPhoto(controller.currParticipantId)
      .then(data => setCurrPhoto(data?.results.file));
  }, []);


  console.log(participantData);
  return (
    <$Container>
      <img src={currPhoto} alt={'doggo'} />
      <img src={`http://localhost:8000/participant_photo_6/taika.jpg`} alt={'doggo'} />
    </$Container>
  )
}

export default observer(Participant);
