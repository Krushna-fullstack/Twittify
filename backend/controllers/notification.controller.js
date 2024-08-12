import { Notification } from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ to: req.user._id })
      .populate({
        path: "from",
        select: "username profileImg",
      })
      .sort({ createdAt: -1 }); // sort by newest

    await Notification.updateMany({ to: req.user._id, read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    // delete all notifications for the user
    await Notification.deleteMany({ to: req.user._id });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotification: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
