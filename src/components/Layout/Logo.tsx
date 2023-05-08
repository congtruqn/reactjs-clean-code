import React from "react";
import LogoLight2x from "../../assets/images/logo.png";
import LogoDark2x from "../../assets/images/logo.png";
import {Link} from "react-router-dom";
type Props = {}
const Logo : React.FC<Props>= () => {
  return (
    <Link to={`/`} className="logo-link">
      <img className="logo-dark logo-img" src={LogoDark2x} alt="logo" />
    </Link>
  );
};
export default Logo;
