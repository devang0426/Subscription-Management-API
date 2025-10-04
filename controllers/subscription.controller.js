import Subscription from "../models/subscription.models.js";

// ✅ Create a subscription
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Get all subscriptions for a specific user
export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id && req.user.role !== "admin") {
      const error = new Error("You are not authorized to access these subscriptions");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      message: "Subscriptions fetched successfully",
      subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Update a subscription
export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      const error = new Error("You are not authorized to update this subscription");
      error.statusCode = 403;
      throw error;
    }

    const updatedFields = req.body;
    Object.assign(subscription, updatedFields);

    const updatedSubscription = await subscription.save();

    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      subscription: updatedSubscription,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Cancel a subscription (soft delete)
export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      const error = new Error("You are not authorized to cancel this subscription");
      error.statusCode = 403;
      throw error;
    }

    subscription.status = "inactive"; // assuming your enum includes 'inactive'
    await subscription.save();

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Delete a subscription (hard delete)
export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      const error = new Error("You are not authorized to delete this subscription");
      error.statusCode = 403;
      throw error;
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Get upcoming renewals (next 7 days)
export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const query = {
      endDate: { $gte: today, $lte: nextWeek },
      status: "active",
    };

    // If not admin, only get own renewals
    if (req.user.role !== "admin") {
      query.user = req.user._id;
    }

    const subscriptions = await Subscription.find(query);

    res.status(200).json({
      success: true,
      message: "Upcoming renewals fetched successfully",
      subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Admin: Get all subscriptions
export const getAllSubscriptions = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      const error = new Error("Only admin can access all subscriptions");
      error.statusCode = 403;
      throw error;
    }

    const subscriptions = await Subscription.find().populate("user", "name email");

    res.status(200).json({
      success: true,
      message: "All subscriptions fetched successfully",
      subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
