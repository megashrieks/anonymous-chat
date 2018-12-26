import React, { Component, Fragment } from "react";
import { Context } from "../ChatContext/context";
import { Button } from "../library";
import DisplayMessages from "./DisplayMessages/DisplayMessages";
import "./Chat.css";
export default class Chat extends Component {
	static contextType = Context;
	state = {
		message: ""
	};
	componentDidMount() {
		if (!this.context.groupId.length) this.props.history.push("/");
	}
	onChange = ({ target: { value } }) => {
		this.setState({
			message: value
		});
	};
	send = e => {
		if (e) e.preventDefault();
		if (this.state.message != "")
			this.context
				.send(this.state.message)
				.then(_ => {
					this.setState({ message: "" });
				})
				.catch(console.log);
	};
	render() {
		let mockhistory = [
			{ username: "abcdef", value: "Shrikanth is awesome" },
			{ username: "abcdef", value: "Shrikanth is awesome" },
			{ info: true, username: "abcdef", value: "Shrikanth is awesome" }
		];
		return (
			<Fragment>
				<div className="chat-component">
					<DisplayMessages messages={this.context.history} />
					<div className="message-bar">
						<form onSubmit={this.send}>
							<input
								className="message-input"
								value={this.state.message}
								onChange={this.onChange}
							/>
							<Button
								variant="flat"
								color="info"
								size="small"
								onClick={this.send}
							>
								Send
							</Button>
						</form>
					</div>
				</div>
			</Fragment>
		);
	}
}
