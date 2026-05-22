import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // 🔥 เปลี่ยนจาก host.docker.internal เป็น 127.0.0.1 
        // เพราะตู้เปลี่ยนมาใช้ --network host แล้ว ตัวมันเองจะมองเห็น localhost ของเครื่อง Mac ได้โดยตรงเลยครับ
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/log-app';
        
        console.log(`⏳ Attempting to connect to MongoDB at: ${uri}`);
        
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB Successfully!');
    } catch (err) {
        console.error('❌ MongoDB connection error during startup: ', err);
        process.exit(1); 
    }
}
