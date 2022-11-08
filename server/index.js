const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const socket = require('socket.io')

const userRouters = require('./routers/usersRouters')
const msgRouters = require('./routers/messagesRoute')

const app = express()
require('dotenv').config();

app.use(cors())
app.use(express.json());

app.use('/api/auth', userRouters)
app.use("/api/messages", msgRouters);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connection Successfully');
}).catch((err) => {
    console.log(err.message);
})

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});