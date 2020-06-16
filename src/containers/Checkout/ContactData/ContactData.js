import React from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends React.Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
		loading: false,
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			// in a production environment, calculate the final price on the server to ensure code isn't manipulated during POST
			price: this.props.price,
			customer: {
				name: "Ryan Seit",
				address: {
					street: "81 Prospect Street",
					zipCode: "11211",
					country: "USA",
				},
				email: "test@test.com",
			},
			deliveryMethod: "fastest",
		};
		// post to Firebase using the node name appended with '.json' for compatibility, second argument contains order data to be sent
		axios
			.post("/orders.json", order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch(error => {
				this.setState({ loading: false });
			});
	};

	render() {
		let form = (
			<form>
				<Input
					inputtype='input'
					type='text'
					name='name'
					placeholder='Your Name'
				/>
				<Input
					inputtype='input'
					type='text'
					name='email'
					placeholder='Your Email'
				/>
				<Input
					inputtype='input'
					type='text'
					name='street'
					placeholder='Street'
				/>
				<Input
					inputtype='input'
					type='text'
					name='postal'
					placeholder='Postal Code'
				/>
				<Button btnType='Success' clicked={this.orderHandler}>
					PLACE ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter Your Contact Info:</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
