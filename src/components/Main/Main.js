import React from "react";
import Login from "../Login/Login";
import { Route, BrowserRouter } from "react-router-dom";
export default function Main() {
	return (
		<BrowserRouter>
			<Route path="/" component={Login} />
		</BrowserRouter>
	);
}
