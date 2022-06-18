import React from "react";

import controller from "./Controller";

const storeContext = React.createContext({
  controller
})

const useController = () => React.useContext(storeContext);

export default useController;