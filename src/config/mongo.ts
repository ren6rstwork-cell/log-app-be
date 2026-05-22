import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // 🌟 กลับมาใช้ชื่อตู้ 'mongodb' เพื่อให้คุยกันในเน็ตเวิร์กของ Docker เองได้เลย
        const uri = process.env.MONGO_URI || 'mongodb://mongodb:27017/log-app';
        
        console.log(`⏳ Connecting inside Docker Network to: ${uri}`);
        
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB Successfully!');
    } catch (err) {
        console.error('❌ MongoDB connection error: ', err);
        process.exit(1); 
    }
}
