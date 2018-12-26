var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var groupIds = {};
var users = {};
const addToGroup = (groupId, username, socket) => {
	if (groupIds[groupId] === undefined)
		groupIds[groupId] = [{ username, socket }];
	else groupIds[groupId].push({ username, socket });
};
const removeFromGroup = id => {
	var groupId = users[id].groupId;
	if (!groupId) return;
	if (!groupIds[groupId]) return;
	groupIds[groupId] = groupIds[groupId].filter(
		member => member.socket.id !== id
	);
	if (!groupIds[groupId].length) delete groupIds[groupId];
};
io.on("connection", socket => {
	socket.on("disconnect", () => {
		if (!users[socket.id]) return;
		var groupId = users[socket.id].groupId;
		removeFromGroup(socket.id);
		if (groupIds[groupId])
			groupIds[groupId].forEach(member => {
				member.socket.emit("message", {
					info: true,
					username: "chat-bot",
					value: users[socket.id].username + " has left the chat"
				});
			});
		delete users[socket.id];
	});
	socket.on("join", ({ groupId, username }) => {
		users[socket.id] = { groupId, username };
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
			if (member.socket.id !== socket.id)
				member.socket.emit("message", { value, username });
		});
	});
});
http.listen(8080);
