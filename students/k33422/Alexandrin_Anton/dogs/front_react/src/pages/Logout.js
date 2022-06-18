import {observer} from "mobx-react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useController from "../store";

const Logout = () => {
  const navigate = useNavigate();
  const {controller} = useController();

  useEffect(() => {
    controller.logout();
    localStorage.removeItem('authToken');
    navigate('/login');
  }, []);
}

export default observer(Logout);
