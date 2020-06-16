import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>Enjoy your burger!</h1>
			<div style={{ width: "100%", margin: "auto" }}>
				<Burger ingredients={props.ingredients} />
				<Button clicked={props.onCheckoutCancelled} btnType='Danger'>
					CANCEL
				</Button>
				<Button clicked={props.onCheckoutContinued} btnType='Success'>
					CONTINUE
				</Button>
			</div>
		</div>
	);
};

export default checkoutSummary;
