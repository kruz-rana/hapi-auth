const Task = require("../model/task");

const addtask = async (req, res) => {
    try {
        const assignedTo = req.body.assignedTo;
        const isadmin = await Task.findOne({ _id: assignedTo, role: "Admin" });
        if (isadmin) return res.status(400).json({ message: "Cannot assigned task to admin" });

        const task = new Task(req.body);
        const r = await task.save();
        console.log(r);

        res.status(201).json({ message: "task created", data: r });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getUsertasks = async (req, res) => {
    try {
        // const tasks = await Task.find({ assignedTo: req.user._id }).populate("assignedTo");
        // res.json(tasks);

        const matchCriteria = { assignedTo: req.user._id };

        const pipeline = [
            { $match: matchCriteria },
            {
                $lookup: {
                    from: "users",
                    localField: "assignedTo",
                    foreignField: "_id",
                    as: "assignedTo"
                }
            },
            {
                $unwind: {
                    path: "$assignedTo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    description: 1,
                    status: 1,
                    createdAt: 1,
                    assignedTo: {
                        _id: 1,
                        name: 1,
                        role: 1
                    }
                }
            }
        ]

        const data = await Task.aggregate(pipeline);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { addtask, getUsertasks };