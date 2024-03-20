import React from "react";
import "./SidebarOption.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function SidebarOption({ active, text, Icon,link,title}) {
  return (
    <Link to={link} className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <abbr title={title}>{<Icon className="fs-5"/>}</abbr>
      <h2 className="d-lg-block d-none">{text}</h2>
    </Link>
  );
}

export default SidebarOption;
