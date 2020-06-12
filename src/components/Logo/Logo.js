import React from "react";

// import image for production (webpack will import this when compiling)
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const logo = props => (
	<div className={classes.Logo}>
		<img src={burgerLogo} alt='Burglr' />
	</div>
);

export default logo;
