import React from "react";

import "./SideDrawer.css";

export const SideDrawer = (props) => {
  return <aside className="side-drawer">{props.children}</aside>;
};
