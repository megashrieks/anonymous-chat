import React from "react";
import Login from "../Login/Login";
import Chat from "../Chat/Chat";
import { ChatContextProvider } from "../ChatContext/context";
import { Route, Switch, BrowserRouter } from "react-router-dom";
export default function Main() {
	return (
		<BrowserRouter>
			<ChatContextProvider>
				<Switch>
					<Route path="/chat/:groupid" component={Chat} />
					<Route path="/" component={Login} />
				</Switch>
			</ChatContextProvider>
		</BrowserRouter>
	);
}
