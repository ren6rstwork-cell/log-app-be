import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const uri = 'mongodb://host.docker.internal:27017/log-app';
        console.log(`⏳ Connecting to MongoDB via host.docker.internal: ${uri}`);
        
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB Successfully!');
    } catch (err) {
        console.error('❌ MongoDB connection error: ', err);
        process.exit(1); 
    }
}
