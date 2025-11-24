import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User name is required'],
            trim: true,
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            unique: true, // Indexing: Unique Index
            lowercase: true,
            trim: true,
            // Basic email validation using regex
            match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false, // Do not return the password hash by default
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
        },
        role: {
            type: String,
            enum: ['admin', 'technician'],
            default: 'technician',
            index: true, // Indexing: Single Field Index for quick filtering
        },
        isActive: {
            type: Boolean,
            default: true, // Soft-delete mechanism (Deactivating employees)
        },
    },
    {
        timestamps: true, // createdAt and updatedAt
    }
);

// In a real application, pre-save hook is used here for hashing the password (bcrypt).

const User = mongoose.model('User', UserSchema);
export default User;