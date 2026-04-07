import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`có người vừa kết nối id:${socket.id}`);
  socket.on("notify_change", (data) => {
    console.log(" Nhận được thông báo thay đổi:", data);
    io.emit("employee_changed", data);
  });
  socket.on("disconnect", () => {
    console.log("Người dùng đã ngắt kết nối");
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
  console.log(` Socket.io đã sẵn sàng!`);
});
