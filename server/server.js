require("dotenv").config();

const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = require("./app");

const PORT =
    process.env.PORT || 5000;

const server =
    http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:
            "http://localhost:5173",
        methods: [
            "GET",
            "POST"
        ]
    }
});

const onlineUsers = new Set();



io.on("connection", (socket) => {
    console.log(
        "User Connected:",
        socket.id
    );
    onlineUsers.add(socket.id); 
    io.emit("online_users",onlineUsers.size);

    socket.on(
        "send_message",
        (message) => {
            io.emit(
                "receive_message",
                message
            );
        }
    );

    socket.on(
        "disconnect",
        () => {
            console.log(
                "User Disconnected:",
                socket.id
            );
            onlineUsers.delete(socket.id);
            io.emit("online_users",onlineUsers.size);
        }
    );
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(
            "MongoDB Connected"
        );

        server.listen(PORT, () => {
            console.log(
                `Server running on port ${PORT}`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });