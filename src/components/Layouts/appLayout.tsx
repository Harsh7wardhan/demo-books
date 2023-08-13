import React from "react";
import Header from "../Header";

interface ILayout {
  children : any
}

const appLayout:React.FC<ILayout> = (props) => {
  const { children } = props;

  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default appLayout;
