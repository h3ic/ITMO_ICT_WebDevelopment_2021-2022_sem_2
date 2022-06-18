import {useReducer} from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Button, Input} from "@mui/material";
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

    label {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
`

const Register = () => {
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
    try {
      await controller.register(formData);
      navigate('/login');
    }
    catch (e) {
      alert('Invalid info')
    }
  }

  return (
    <$FormContainer>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <Input
            name={'email'}
            value={formData.email || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          First name
          <Input
            name={'first_name'}
            value={formData.first_name || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last name
          <Input
            name={'last_name'}
            value={formData.last_name || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Username
          <Input
            name={'username'}
            value={formData.username || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password
          <Input
            name={'password'}
            type={'password'}
            value={formData.password || ''}
            onChange={handleInputChange}
          />
        </label>
        <Button disableFocusRipple variant={'contained'} type={'submit'}>
          Submit
        </Button>
      </form>
    </$FormContainer>
  )
}

export default observer(Register);
