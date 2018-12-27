import React, { Component } from "react";
import io from "socket.io-client";
const Context = React.createContext();
var socket;
class ChatContextProvider extends Component {
	constructor(props) {
		super(props);
		socket = io("http://localhost:8080");
		var chatObj = JSON.parse(localStorage.getItem("chat") || "{}");
		this.state = {
			groupId: "",
			username: chatObj.username || "",
			history: []
		};
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
		return new Promise((res, rej) => {
			let history = this.state.history;
			if (this.state.groupId !== value) history = [];
			this.setState(
				{
					groupId: value.toString(),
					history
				},
				res
			);
		});
	};
	joinChat = () => {
		return new Promise((res, rej) => {
			try {
				if (!this.state.groupId.length || !this.state.username.length)
					rej(new Error("No group id or username"));
				socket.emit("join", {
					groupId: this.state.groupId,
					username: this.state.username
				});
				localStorage.setItem(
					"chat",
					JSON.stringify({
						username: this.state.username,
						groupId: this.state.groupId
					})
				);
				res();
			} catch (e) {
				rej(e);
			}
		});
	};
	sendMessage = value => {
		return new Promise((resolve, reject) => {
			if (!this.state.groupId.length || !this.state.username.length)
				reject(new Error("No group id or username"));
			var current = {
				value,
				username: this.state.username,
				owner: true
			};
			this.setState(prev => {
				return { history: prev.history.concat(current) };
			});
			socket.emit("send", {
				groupId: this.state.groupId,
				username: this.state.username,
				value
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
