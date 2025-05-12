const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        rquired: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("tasks", taskSchema);