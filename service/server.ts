import {v4 as uuidv4} from 'uuid';
import {Socket} from 'socket.io';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {'transports': ['websocket', 'polling']});

const CLIENT_DIR = `${__dirname}/../client/dist`;

io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    socket.on('join-room', (roomId: string, userId: string) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
    });
});

app.get('/', (req, res) => {
    console.log('something')
    res.redirect(`${uuidv4()}`);
});

app.use(express.static(CLIENT_DIR));

app.get('/:room', (req, res) => {
    res.sendFile('index.html', {root: CLIENT_DIR});
});


app.get('*', (req, res) => {
    res.send(404);
});

server.listen(3000);





