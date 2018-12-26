var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var groupIds = {};
const addToGroup = (groupId, username, socket) => {
	if (groupIds[groupId] === undefined)
		groupIds[groupId] = [{ username, socket }];
	else groupIds[groupId].push({ username, socket });
};
io.on("connection", socket => {
	socket.on("join", ({ groupId, username }) => {
		socket.emit("message", {
			info: true,
			username: "chat-bot",
			value: "You have joined the chat"
		});
		if (groupIds[groupId] !== undefined)
			groupIds[groupId].forEach(member => {
				member.socket.emit("message", {
					info: true,
					username: "chat-bot",
					value: username + " has joined the chat"
				});
			});
		addToGroup(groupId, username, socket);
	});
	socket.on("send", ({ groupId, value, username }) => {
		if (!!!groupIds[groupId]) addToGroup(groupId, username, socket);
		groupIds[groupId].forEach(member => {
			member.socket.emit("message", { value, username });
		});
	});
});
http.listen(8080);
