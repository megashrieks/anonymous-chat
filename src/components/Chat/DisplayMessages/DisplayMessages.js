import React, { Component } from "react";
import "./DisplayMessages.css";
function Message({ username, value }) {
	return (
		<div>
			<div className="individual-message">
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
		return (
			<div className="chat-messages" ref={this.ref}>
				{this.props.messages.map((element, index) => {
					if (element.info) return <Info key={index} {...element} />;
					return <Message key={index} {...element} />;
				})}
			</div>
		);
	}
}
