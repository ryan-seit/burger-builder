// Synchronous Action Creators
import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name,
	};
};

export const removeIngredient = name => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name,
	};
};

// Synchronous action creator. Internal use. Get ingredients as an argument and return the action to dispatch
export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

// Initially load ingredients to be used in the BurgerBuilder
export const initIngredients = () => {
	// return function that uses the dispatch function
	return dispatch => {
		axios
			.get("https://burger-builder-58b5a.firebaseio.com/ingredients.json")
			.then(response => {
				dispatch(setIngredients(response.data));
			})
			.catch(error => {
				dispatch(fetchIngredientsFailed());
			});
	};
};
