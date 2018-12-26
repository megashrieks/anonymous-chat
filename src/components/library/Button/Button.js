import React from "react";
import "./Button.css";
function Button(props) {
	let btncolor = "";
	let btntype = "";
	let btnsize = "";
	let classNames = "";
	if (props.color) btncolor = " btn-" + props.color;
	if (props.variant) btntype = " btn-" + props.variant;
	if (props.size) btnsize = " btn-" + props.size;
	if (props.className) classNames += " " + props.className;
	return (
		<button
			onClick={props.onClick}
			className={"cui btn" + btncolor + btntype + btnsize + classNames}
		>
			{props.children}
		</button>
	);
}
function IconButton(props) {
	let btncolor = "";
	let btntype = "";
	let classNames = "";

	if (props.color) btncolor = " btn-" + props.color;
	if (props.variant) btntype = " btn-" + props.variant;
	if (props.className) classNames += " " + props.className;
	return (
		<button
			onClick={props.onClick}
			className={
				"cui btn btn-icon btn-rounded" + btncolor + btntype + classNames
			}
		>
			{props.children}
		</button>
	);
}
export { Button, IconButton };
