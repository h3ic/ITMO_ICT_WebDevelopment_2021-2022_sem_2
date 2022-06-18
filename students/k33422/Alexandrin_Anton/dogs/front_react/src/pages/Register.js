import {useReducer} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Button, Input} from "@mui/material";
import {formReducer} from '../utils';

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

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useReducer(formReducer, {});

  const handleInputChange = (e) => {
    setFormData({
      name: e.target.name,
      value: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/profile');
  }

  return (
    <$FormContainer>
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
    </$FormContainer>
  )
}

export default Register;
