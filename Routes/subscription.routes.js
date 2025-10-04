import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
  updateSubscription,
  cancelSubscription,
  getUpcomingRenewals,
  deleteSubscription,
  getAllSubscriptions
} from "../controllers/subscription.controller.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const subscriptionRouter = Router();

// Optional: get all subscriptions (admin only)
subscriptionRouter.get("/", authorize, isAdmin,getAllSubscriptions);

// Get all subscriptions for a user
subscriptionRouter.get("/users/:id", authorize, getUserSubscriptions);

// Create new subscription
subscriptionRouter.post("/", authorize, createSubscription);

// Update subscription by id
subscriptionRouter.put("/:id", authorize, updateSubscription);

// Cancel subscription by id (soft delete or status update)
subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

// Delete subscription by id (hard delete)
subscriptionRouter.delete("/:id", authorize, deleteSubscription);

// Get upcoming renewals (maybe admin or user based)
subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

export default subscriptionRouter;