import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
  // Task = await new Task({title});
  // await Task.save();
  //instead of the above code we can use the below code
  await Task.create({ title, description, user: req.user });
  res.json({
    success: true,
    message: "Task added Successfully",
  });
  } catch (error) {
    next(error)
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user });
  res.status(200).json({
    success: true,
    tasks,
  });
  } catch (error) {
    next(error)
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
  if (!task) return next(new ErrorHandler("Task Not Found", 404));
  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task Updated Successfully",
  });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
  if (!task) {
    return next(new ErrorHandler("Task Not Found", 404));
  }
  await task.deleteOne();
  res.status(200).json({
    success: true,
    messgae: "Task Deleted Successfully",
  });
  } catch (error) {
    next(error);
  }
};
