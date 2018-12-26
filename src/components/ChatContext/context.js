import React, { Component } from "react";
import io from "socket.io-client";
const Context = React.createContext();
var socket;
class ChatContextProvider extends Component {
	state = {
		groupId: "initial",
		username: "",
		history: []
	};
	constructor(props) {
		super(props);
		socket = io("http://localhost:8080");
		socket.on("message", message => {
			this.setState(prev => {
				return {
					history: prev.history.concat(message)
				};
			});
		});
	}
	changeUsername = value => {
		this.setState({
			username: value
		});
	};
	changeGroupId = value => {
		this.setState({
			groupId: value
		});
	};
	joinChat = () => {
		return new Promise((res, rej) => {
			try {
				socket.emit("join", this.state.groupId);
				res();
			} catch (e) {
				rej(e);
			}
		});
	};
	sendMessage = value => {
		return new Promise((resolve, reject) => {
			if (!this.state.groupId.length) reject(new Error("No group id"));
			socket.emit("send", {
				username: this.state.username,
				message: value
			});
			resolve(true);
		});
	};
	render() {
		return (
			<Context.Provider
				value={{
					...this.state,
					changeUsername: this.changeUsername,
					changeGroupId: this.changeGroupId,
					send: this.sendMessage,
					chatHistory: this.state.history,
					joinChat: this.joinChat
				}}
			>
				{this.props.children}
			</Context.Provider>
		);
	}
}
export { ChatContextProvider, Context };
