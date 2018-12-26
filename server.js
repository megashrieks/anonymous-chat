var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var groupIds = {};

io.on("connection", socket => {
	socket.on("join", ({ groupId, username }) => {
		if (groupIds[groupId] === undefined)
			groupIds[groupId] = [{ username, socket }];
		else groupIds[groupId].push({ username, socket });
		socket.emit("message", "You have joined the chat");
	});
});
http.listen(8080);
