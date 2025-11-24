import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true,
            trim: true,
        },
        modelName: {
            type: String,
            required: true,
            unique: true, // Indexing: Unique Index
            trim: true,
        },
        imageUrl: {
            type: String,
            required: true,
            // In production, you might want a basic URL validation here
        },
        description: {
            type: String,
            required: true,
        },
        priceRange: {
            type: String,
            required: false, // Optional
        },
        tags: [
            { type: String } // Array of strings (optional)
        ]
    },
    {
        timestamps: true, // createdAt and updatedAt
    }
);

const Service = mongoose.model('Service', ServiceSchema);
export default Service;