const Task = require("../models/task");

exports.getAll = async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split("_");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);

  try {
    // await req.user
    //   .populate({
    //     path: "task",
    //     match,
    //     options: {
    //       limit,
    //       skip: limit * (page - 1),
    //       sort,
    //     },
    //   })
    //   .execPopulate();
    const tasks = await Task.find({
      owner: req.user._id,
      ...match,
    })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(sort);

    res.send(tasks);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.getById = async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Task not found");
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.create = async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).send("Task not found");
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const task = await Task.findOneAndRemove({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send("Task not found");
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
