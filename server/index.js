const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Socket.IO server is running!');
});

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    // socket.on('chat message', (msg) => {
    //     console.log('📨 Received:', msg);
    //     socket.broadcast.emit('chat message', msg);
    //
    //     console.log('✅ Broadcasted to others!');
    // });

    // 1. ოთახში შესვლის ლოგიკა ბექში
     socket.on('join room', (roomName) =>{
         socket.join(roomName);
         console.log(`${socket.id} joined room: ${roomName}`);

         /// ოთახის სხვა წევრებს ეტყობინება
         socket.to(roomName).emit('user joined', `${socket.id} joined the room.`);
     });



    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});