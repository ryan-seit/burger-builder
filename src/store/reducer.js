import * as actionTypes from "./actions";

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0,
	}, // global state
	totalPrice: 4, // global state
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				// Copy the state to retain any unchanged data
				...state,
				// Immutability, dont reuse the old object, create a new one
				ingredients: {
					// Deep clone. Distribute all properties of state.ingredients to create a new object
					...state.ingredients,
					// Dynamically override a property in a JS object via action.payload
					// Get the number of the ingredients, add one, assign to the ingredient and assign to the copy we created
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
				},
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				},
			};
		default:
			return state;
	}
};

export default reducer;
