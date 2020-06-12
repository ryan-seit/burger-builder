import React from "react";

import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {
	// Only update component if 'this.props.show' changes
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show;
	}

	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClose} />
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? "translateY(0)" : "translateY(-100vh)", // viewport height
						opacity: this.props.show ? "1" : "0",
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

export default Modal;
