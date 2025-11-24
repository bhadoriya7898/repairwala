import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema(
    {
        // 1. Customer Details (Embedded Document)
        customerDetails: {
            firstName: { type: String, required: true, trim: true },
            lastName: { type: String, required: true, trim: true },
            email: { type: String, required: true, lowercase: true, trim: true },
            phone: { type: String, required: true },
        },
        
        // 2. Address Details (Embedded Document)
        address: {
            street1: { type: String, required: true },
            street2: { type: String, required: false },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },

        // 3. Complaint Specifics
        type: {
            type: String,
            enum: ['request_callback', 'book_appointment'],
            required: true,
            index: true,
        },
        category: {
            type: String, // Appliance type: TV, AC, Refrigerator, etc.
            required: true,
            index: true, // Indexing: Filter by category
        },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        message: { type: String, required: true },
        
        // Date/Time Preference for Appointment (Optional)
        prefDate: {
            type: Date,
            required: function() { return this.type === 'book_appointment'; } // Required only for appointment type
        },

        // 4. Status and Assignment
        status: {
            type: String,
            enum: ['new', 'assigned', 'accepted', 'in_progress', 'completed', 'cancelled'],
            default: 'new',
            required: true,
            index: true, // Indexing: Crucial for Admin filtering
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the Technician in the User collection
            index: true, // Indexing: Crucial for Technician dashboard
            default: null,
        },

        // 5. Logs/Activity History (Embedded Array)
        logs: [
            {
                action: { type: String, required: true }, // e.g., "Status changed to assigned"
                byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who performed the action
                timestamp: { type: Date, default: Date.now },
                notes: { type: String }, // Technician notes/remarks
            }
        ],
    },
    {
        timestamps: true, // createdAt and updatedAt
    }
);

const Complaint = mongoose.model('Complaint', ComplaintSchema);
export default Complaint;