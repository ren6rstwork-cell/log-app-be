import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // 🔥 หักดิบ: ประกาศ string ตรงๆ เป็น 127.0.0.1 โดยไม่ต้องผ่าน process.env.MONGO_URI ใดๆ ทั้งสิ้น
        const uri = 'mongodb://127.0.0.1:27017/log-app';
        
        console.log(`🚀 [FORCE RUN] Connecting directly to Mac Localhost via Host Network...`);
        console.log(`⏳ Target URI: ${uri}`);
        
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB Successfully!');
    } catch (err) {
        console.error('❌ MongoDB connection error during startup: ', err);
        process.exit(1); 
    }
}
