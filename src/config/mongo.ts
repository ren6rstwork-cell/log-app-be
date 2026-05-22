import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // บังคับ (Hardcode) ให้วิ่งไปที่ 127.0.0.1 ตรงๆ ไม่ต้องสนค่า env ใดๆ ทั้งสิ้นเพื่อทดสอบระบบ
        const uri = 'mongodb://127.0.0.1:27017/log-app';
        
        console.log(`⏳ [FORCE CONNECT] Attempting to connect to MongoDB at: ${uri}`);
        
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB Successfully!');
    } catch (err) {
        console.error('❌ MongoDB connection error during startup: ', err);
        process.exit(1); 
    }
}
