import React, { Component } from "react";
import { Button } from "../library";
import { Context } from "../ChatContext/context";
import { Route, Switch } from "react-router-dom";
import "./Login.css";
export default class Login extends Component {
	static contextType = Context;
	generateId = () => {
		this.context
			.changeGroupId(~~(Math.random() * 100000000))
			.then(() => this.join());
	};
	onChange = ({ target: { value } }) => {
		this.context.changeGroupId(value);
	};
	componentDidMount() {
		if (this.context.groupId.length && this.context.username.length)
			this.props.history.push("/chat/" + this.context.groupId);
	}
	join = () => {
		this.context
			.joinChat()
			.then(() => {
				this.props.history.push("/chat/" + this.context.groupId);
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
						value={this.context.username}
						onChange={this.changeName}
						placeholder="Username"
					/>
				</div>
				<Switch>
					<Route
						path="/join"
						component={() => (
							<Button
								color="success"
								size="small"
								onClick={this.join}
							>
								Join
							</Button>
						)}
					/>
					<Route
						path="/"
						component={() => (
							<Button
								color="info"
								size="small"
								onClick={this.generateId}
							>
								Create chat room
							</Button>
						)}
					/>
				</Switch>
			</div>
		);
	}
}
