import React, { Component } from "react";
import "./DisplayMessages.css";
function Message({ username, value, renderAvatar }) {
	var avatarImageClass = "";
	if (!renderAvatar) avatarImageClass = " " + "same";
	return (
		<div>
			<div className={"individual-message" + avatarImageClass}>
				<div className="avatar">{username[0]}</div>
				<div className="message-text">{value}</div>
			</div>
		</div>
	);
}
function Info({ value }) {
	return (
		<div className="info-text-container">
			<div className="info-text">{value}</div>
		</div>
	);
}
function SelfMessage({ value, renderAvatar }) {
	var avatarImageClass = "";
	if (!renderAvatar) avatarImageClass = " " + "same";
	return (
		<div className="self">
			<div className={"individual-message" + avatarImageClass}>
				<div className="message-text">{value}</div>
			</div>
		</div>
	);
}
export default class DefaultMessages extends Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}
	componentDidMount() {
		this.ref.current.scrollTop = this.ref.current.scrollHeight;
	}
	shouldComponentUpdate(props) {
		return this.props.messages !== props.messages;
	}
	componentDidUpdate() {
		this.ref.current.scrollTop = this.ref.current.scrollHeight;
	}
	render() {
		var previousMessageUser = null;
		return (
			<div className="chat-messages" ref={this.ref}>
				{this.props.messages.map((element, index) => {
					if (element.info) {
						previousMessageUser = null;
						return <Info key={index} {...element} />;
					}
					if (element.owner) {
						previousMessageUser = null;
						if (index >= 1 && this.props.messages[index - 1].owner)
							return <SelfMessage key={index} {...element} />;
						else {
							return (
								<SelfMessage
									renderAvatar={true}
									key={index}
									{...element}
								/>
							);
						}
					}
					if (previousMessageUser == element.username)
						return <Message key={index} {...element} />;
					else {
						previousMessageUser = element.username;
						return (
							<Message
								renderAvatar={true}
								key={index}
								{...element}
							/>
						);
					}
				})}
			</div>
		);
	}
}
