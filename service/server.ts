import {v4 as uuidv4} from 'uuid';
import {Socket} from 'socket.io';
import {Request, Response} from 'express';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {'transports': ['websocket', 'polling']});

const CLIENT_DIR = `${__dirname}/../client/dist`;

io.on('connection', (socket: Socket) => {


    socket
        .on('join-room', (roomId: string, userId: string) => {
            socket.join(roomId);
            socket.to(roomId).broadcast.emit('user-connected', userId);
        });
});

app.get('/', (req, res) => {
    res.redirect(`${uuidv4()}`);
});

app.use(express.static(CLIENT_DIR));

app.get('/:room', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: CLIENT_DIR});
});


app.get('*', (req: Request, res: Response) => {
    res.send(404);
});

server.listen(3000);





