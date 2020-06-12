import React from "react";

import classes from "./Toolbar.module.css";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = props => (
	<header className={classes.Toolbar}>
		{/* TODO: setup component for menu to be clickable 
    change Layout component state to true 
    trigger open property */}
		{/* <div>MENU</div> */}
		<DrawerToggle clicked={props.drawerToggleClicked} />
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
);

export default toolbar;
