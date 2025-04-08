import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

// export const socket = io(SOCKET_URL);

export const joinRoom = (roomid, username) => {
  socket.emit('join_room', { roomid, username });
};

export const updateCode = (roomid, code) => {
  socket.emit('code_update', { roomid, code });
};

export const setReady = (roomid) => {
  socket.emit('ready', { roomid });
};

export const submitCode = (roomid, code) => {
  socket.emit('submit_code', { roomid, code });
};