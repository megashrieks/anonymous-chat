import React, { Component, Fragment } from "react";
import { Button, CustomInput } from "../library";
import { Context } from "../ChatContext/context";
import "./Login.css";
export default class Login extends Component {
	static contextType = Context;
	state = {
		groupValue: "Click the generate button to generate a value"
	};
	generateId = () => {
		this.context.changeGroupId(~~(Math.random() * 100000000));
	};
	onChange = ({ target: { value } }) => {
		this.context.changeGroupId(value);
	};
	join = () => {
		this.context
			.joinChat()
			.then(() => {
				this.props.history.push("/chat");
			})
			.catch(() => {
				console.log("Joining chat failed");
			});
	};
	changeName = ({ target: { value } }) => {
		this.context.changeUsername(value);
	};
	render() {
		return (
			<div className="centered">
				<div>
					<input
						className="input"
						value={this.context.groupId}
						onChange={this.onChange}
					/>
				</div>
				<div>
					<input
						className="input"
						value={this.context.username}
						onChange={this.changeName}
					/>
				</div>
				<Button color="info" size="small" onClick={this.generateId}>
					Generate and join chat
				</Button>
				<Button color="success" size="small" onClick={this.join}>
					Join Chat
				</Button>
			</div>
		);
	}
}
