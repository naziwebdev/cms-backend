const { isValidObjectId } = require("mongoose");
const eventModel = require("../../models/event");
const eventValidator = require("../../validators/v1/event");

exports.create = async (req, res) => {
  try {
    const { title, description, date, time } = req.body;

    const resultValidate = eventValidator(req.body);

    const formattedDate = date.replace(/(^|\/)۰+/g, "$1");

    if (resultValidate !== true) {
      return res.status(422).json(resultValidate);
    }

    const event = await eventModel.create({
      title,
      description,
      date: formattedDate,
      time,
    });

    if (!event) {
      return res.status(404).json({ message: "there is no event" });
    }

    return res
      .status(201)
      .json({ message: "event created successfully", event });
  } catch (error) {
    return res.json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const events = await eventModel.find({}).sort({ _id: -1 }).lean();

    if (!events) {
      return res.status(404).json({ message: "there is no event" });
    }

    return res.status(200).json(events);
  } catch (error) {
    return res.json(error);
  }
};
exports.getToday = async (req, res) => {
  try {
    const today = new Date();

    const todayFa = today.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      calendar: "persian",
    });

    const events = await eventModel.find({ date: todayFa }).lean();

    if (!events) {
      return res.status(404).json({ message: "there is no event today" });
    }

    return res.status(200).json(events);
  } catch (error) {
    return res.json(error);
  }
};

exports.getWeekly = async (req, res) => {
  try {
    const today = new Date();
    const now = new Date()
    const week = today.setDate(today.getDate() + 7); 

    const weekFa = today.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        calendar: "persian",
      });

    const nowFa = now.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        calendar: "persian",
      });
     
  
      const events = await eventModel.find({  $and: [
        { date: { $gte: nowFa } },
        { date: { $lte: weekFa } }
      ]}).lean();

    if (!events) {
      return res.status(404).json({ message: "there is no event" });
    }

    return res.status(200).json(events);
   
  } catch (error) {
    return res.json(error);
  }
};

exports.editEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "id is not valid" });
    }
    const { title, description, date, time } = req.body;

    const resultValidate = eventValidator(req.body);

    if (resultValidate !== true) {
      return res.status(422).json(resultValidate);
    }

    const updatedEvent = await eventModel.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        date,
        time,
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "there is no event" });
    }

    return res.status(200).json({ message: "event updated successfully" });
  } catch (error) {
    return res.json(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "id is not valid" });
    }

    const removedEvent = await eventModel.findOneAndDelete({ _id: id });

    if (!removedEvent) {
      return res.status(404).json({ message: "there is no event" });
    }

    return res.status(200).json({ message: "event removed successfully" });
  } catch (error) {
    return res.json(error);
  }
};
