import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends React.Component {
		state = {
			error: null,
		};

		// set axios.interceptors if the component will mount
		componentWillMount() {
			// clear any errors when sending a request
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});
			// setup global interceptor to handle errors (1st argument is response, 2nd is the error)
			this.resInterceptor = axios.interceptors.response.use(
				// return the response
				res => res,
				// set state.error to error
				error => {
					this.setState({ error: error });
				}
			);
		}

		// optimization: remove component interceptors when unmounted using .eject()
		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<Aux>
					<Modal
						show={this.state.error}
						modalClose={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
