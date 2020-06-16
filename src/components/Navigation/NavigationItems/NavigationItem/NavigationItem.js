import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = props => (
	<li className={classes.NavigationItem}>
		<NavLink
			activeClassName={classes.active}
			to={props.link}
			// Only use exact for the link specified in NavigationItems
			exact={props.exact}
		>
			{props.children}
		</NavLink>
	</li>
);

export default navigationItem;
