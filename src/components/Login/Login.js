import React, { Component, Fragment } from "react";
import { Button, CustomInput } from "../library";
import { Context } from "../ChatContext/context";
import "./Login.css";
export default class Login extends Component {
	state = {
		groupValue: "Click the generate button to generate a value"
	};
	generateId = fn => () => {
		fn(~~(Math.random() * 100000000));
	};
	onChange = fn => ({ target: { value } }) => {
		fn(value);
	};
	join = fn => () => {
		fn()
			.then(() => {
				this.props.history.push("/chat");
			})
			.catch(() => {
				console.log("Joining chat failed");
			});
	};
	render() {
		return (
			<Context.Consumer>
				{({ groupId, changeGroupId, joinChat }) => (
					<div className="centered">
						<input
							className="input-group-id"
							value={groupId}
							onChange={this.onChange(changeGroupId)}
						/>
						<Button
							color="info"
							size="small"
							onClick={this.generateId(changeGroupId)}
						>
							Generate and join chat
						</Button>
						<Button
							color="success"
							size="small"
							onClick={this.join(joinChat)}
						>
							Join Chat
						</Button>
					</div>
				)}
			</Context.Consumer>
		);
	}
}
