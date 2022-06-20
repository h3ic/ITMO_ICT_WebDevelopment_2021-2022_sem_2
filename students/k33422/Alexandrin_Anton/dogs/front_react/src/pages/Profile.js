import {useEffect, useReducer, useState} from "react";
import styled from "styled-components";
import useController from "../store";
import Paper from '@mui/material/Paper'

const $FormContainer = styled.div`
  width: 400px;
  margin: 100px auto;
  padding: 50px 0;
  
  h2 {
    margin-bottom: 50px;
  }

  form, div {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
  }
`

const Profile = () => {
  const {controller} = useController();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    controller.getUser()
      .then((data) => setProfileData(data));
  }, []);

  return (
    <$FormContainer>
      <Paper style={{padding: '50px 20px'}}>
      <h2>Profile</h2>

      {profileData &&
      <div>
        <span>
          {`First name: ${profileData?.first_name}`}
        </span>
        <span>
          {`Last name: ${profileData?.last_name}`}
        </span>
        <span>
          {`Username: ${profileData?.username}`}
        </span>
      </div>
      }
      </Paper>

    </$FormContainer>
  )
}

export default Profile;
