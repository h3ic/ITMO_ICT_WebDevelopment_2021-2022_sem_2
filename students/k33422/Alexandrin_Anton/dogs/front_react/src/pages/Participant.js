import {observer} from "mobx-react";
import {useEffect, useReducer, useState} from "react";
import useController from "../store";
import {useNavigate} from "react-router-dom";
import styled from 'styled-components';
import {Input} from "@mui/material";
import {formReducer, $Button} from "../utils";
import {Paper} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const $Container = styled(Paper)`
  margin: 100px 300px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;

  h2 {
    margin-bottom: 20px;
  }

  button {
    height: 36px;
  }

  form {
    display: grid;
    flex-direction: column;
    grid-template-columns: 1fr 1fr;
    justify-items: flex-start;
    width: 500px;
    gap: 20px;

    label {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
`;

const $InfoContainer = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-columns: 1fr 1fr;
  justify-items: flex-start;
  width: 500px;
`;

// const $InfoForm = styled.form`
//   display: grid;
//   flex-direction: column;
//   grid-template-columns: 1fr 1fr;
//   justify-items: flex-start;
//   width: 500px;
//   gap: 20px;
// `;

const Participant = () => {
  const navigate = useNavigate();
  const {controller} = useController();
  const [participantData, setParticipantData] = useState();
  // const [currPhoto, setCurrPhoto] = useState();
  const [isEditable, setEditable] = useState(false);

  useEffect(() => {
    controller.getParticipant(controller.currParticipantId)
      .then((data) => setParticipantData(data));
    // controller.getParticipantPhoto(controller.currParticipantId)
    //   .then(data => setCurrPhoto(data?.results.file));
  }, []);
  console.log('part', participantData);

  const [formData, setFormData] = useReducer(formReducer, {}, participantData);

  console.log('form', formData);

  const handleInputChange = (e) => {
    console.log(formData);
    console.log(e.target.name, e.target.value);
    setFormData({
      name: e.target.name,
      value: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    console.log(e);
    try {
      e.preventDefault();
      await controller.updateParticipant(
        controller.currParticipantId, formData);
      navigate('/participants');
    } catch (e) {
      alert('Invalid info');
    }
  }

  return (
    <$Container>
      <div style={{display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        gap: 20, marginBottom: 20, }}>
        <h2>{participantData?.name}</h2>
        <div style={{display: 'flex', columnGap: 20, justifySelf: 'flex-end',
        position: 'absolute', right: 20, top: 20}}>
          <$Button onClick={() => setEditable(prevState => !prevState)}>
            {/*{isEditable ? 'Close' : 'Edit'}*/}
            {isEditable ? <CancelIcon/> : <BorderColorIcon/>}
          </$Button>
          <$Button>
            <DeleteForeverIcon/>
          </$Button>
        </div>
      </div>
      {!isEditable
        ? <$InfoContainer>
          {participantData &&
          Object.entries(participantData).map((entry, index) =>
            <p key={index}>
              {`${entry[0]}: ${entry[1]}`}
            </p>
          )
          }
        </$InfoContainer>
        : <form onSubmit={handleSubmit}>
          {participantData && formData &&
          Object.entries(participantData).map((entry, index) =>
            <label key={index}>
              {entry[0]}
              <Input
                name={entry[0]}
                // placeholder={entry[1]}
                value={formData[entry[0]] || entry[1] || ''}
                onChange={handleInputChange}/>
            </label>
          )
          }
          <$Button type={'submit'}>Submit</$Button>
        </form>
      }
    </$Container>
  )
}

export default observer(Participant);
