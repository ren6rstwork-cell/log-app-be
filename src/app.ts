import express from 'express';
import cors from 'cors';
import { setupSwagger } from './utils/swagger.js';
import userRoutes from './routes/userRoutes.js';
import logRoutes from './routes/logRoutes.js';
import { connectDB } from './config/mongo.js';

const app = express();
// 1. 🔥 ปรับพอร์ตข้างในตู้เป็น 8080 ให้ตรงกับท่อที่ตั้งไว้ใน Jenkinsfile ฝั่ง Backend
const PORT = 8080;

// เปิดให้ดึงข้อมูลข้าม Origin ได้อย่างราบรื่น
app.use(cors());
app.use(express.json());

connectDB();
setupSwagger(app);

app.use('/api/user', userRoutes);
app.use('/api/log', logRoutes);

// 2. 🔥 เติม '0.0.0.0' เพื่อปลดล็อกให้ตู้ยอมคุยกับเบราว์เซอร์เครื่อง Mac ของคุณ
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Server is successfully running on Port ${PORT}`);
});
