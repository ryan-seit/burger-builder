import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

import axios from "../../axios-orders";

class BurgerBuilder extends Component {
	state = {
		purchaseable: false, // global state
		purchasing: false, // local UI state
		// when true, show Spinner.js
		loading: false, // local UI state
		error: false, // local UI state
	};

	componentDidMount() {
		console.log("BURGER_BUILDER PROPS", this.props);
		// // GET request to server for ingredients
		// axios
		// 	.get("https://burger-builder-58b5a.firebaseio.com/ingredients.json")
		// 	.then(response => {
		// 		this.setState({ ingredients: response.data });
		// 	})
		// 	.catch(error => {
		// 		this.setState({ error: true });
		// 	});
	}

	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchaseable: sum > 0 });
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	// Go to Checkout component before persisting to server
	purchaseContinueHandler = () => {
		// Create an array of strings with property name and value
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					"=" +
					encodeURIComponent(this.state.ingredients[i])
			); //=> ['bacon=1', 'cheese=1`, 'meat=1', 'salad=1']
		}
		queryParams.push("price=" + this.state.totalPrice);
		const queryString = queryParams.join("&"); //=> bacon=1&cheese=1&meat=1&salad=1
		this.props.history.push({
			pathname: "/checkout",
			search: "?" + queryString, // Send the query to '/checkout'
		});
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		// set orderSummary to null
		let orderSummary = null;

		// set burger to show spinner if there is no error, otherwise show error message
		let burger = this.state.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);

		// if ingredients is not null return burger, buildcontrols, orderSummary components
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						addIngredient={this.props.onIngredientAdded}
						removeIngredient={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchaseable={this.state.purchaseable}
						price={this.props.price}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		// if loading is true, show spinner
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClose={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	console.log(state.ingredients);
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName =>
			dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: ingName =>
			dispatch({
				type: actionTypes.REMOVE_INGREDIENT,
				ingredientName: ingName,
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
