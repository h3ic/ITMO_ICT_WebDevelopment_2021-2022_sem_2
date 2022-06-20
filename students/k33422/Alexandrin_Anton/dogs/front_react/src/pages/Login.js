import {useReducer} from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Button, Input, Paper} from "@mui/material";
import {formReducer} from '../utils';
import useController from "../store";

const $FormContainer = styled.div`
  width: 400px;
  margin: 100px auto;
  padding: 50px 0;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
  }
`

const Login = () => {
  const navigate = useNavigate();
  const {controller} = useController();

  const [formData, setFormData] = useReducer(formReducer, {});

  const handleInputChange = (e) => {
    setFormData({
      name: e.target.name,
      value: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await controller.login(formData)
    navigate('/profile');
  }

  return (
    <$FormContainer>
      <Paper style={{padding: '50px 20px'}}>
      <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name={'username'}
            value={formData.username || ''}
            onChange={handleInputChange}
          />
          <Input
            name={'password'}
            type={'password'}
            value={formData.password || ''}
            onChange={handleInputChange}
          />
          <Button disableFocusRipple variant={'contained'} type={'submit'}>
            Submit
          </Button>
      </form>
      </Paper>
    </$FormContainer>
  )
}

export default observer(Login);