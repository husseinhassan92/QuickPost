import React from "react";
import "./SidebarOption.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function SidebarOption({ active, text, Icon,link}) {
  return (
    <Link to={link} className={`sidebarOption ${active && "sidebarOption--active"}`}>
      {<Icon className="fs-5"/>}
      <h2 className="d-lg-block d-none header">{text}</h2>
    </Link>
  );
}

export default SidebarOption;
