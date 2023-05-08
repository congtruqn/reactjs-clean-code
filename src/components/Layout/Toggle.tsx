import React from "react";
const Toggle = ({ className, click, icon }) => {
  return (
    <a
      href="#toggle"
      className={className ? className : ""}
      onClick={(ev) => {
        ev.preventDefault();
        click(ev);
      }}
    >
    <em className="icon ni ni-menu"></em>  
    </a>
  );
};
export default Toggle;
