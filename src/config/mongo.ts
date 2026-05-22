import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // 🔥 เปลี่ยนจาก mongodb:27017 เป็น host.docker.internal:27017 เพื่อให้ตู้ยิงสัญญาณทะลุกระจกออกมาหาเครื่อง Mac
        const uri = process.env.MONGO_URI || 'mongodb://host.docker.internal:27017/log-app';
        
        console.log(`⏳ Attempting to connect to MongoDB at: ${uri}`);
        
        // แนะนำให้ใส่ await หน้า mongoose.connect เพื่อให้บล็อก catch ทำงานได้สมบูรณ์หากเชื่อมต่อไม่ผ่าน
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB Successfully!');
    } catch (err) {
        console.error('❌ MongoDB connection error during startup: ', err);
        // สั่งปิดแอปทันทีถ้าต่อฐานข้อมูลไม่ได้ เพื่อให้เรารู้สถานะจาก Docker logs
        process.exit(1); 
    }
}
