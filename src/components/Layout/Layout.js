import React from "react";

import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = props => (
	// Wrap elements in the higher order component 'Aux'
	<Aux>
		<Toolbar />
		<SideDrawer />
		<main className={classes.Content}>{props.children}</main>
	</Aux>
);

export default layout;
