import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minlength: [3, "Subscription name must be at least 3 characters"],
      maxlength: [50, "Subscription name must be less than 50 characters"],
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be a positive number"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "cooking",
        "finance",
        "gaming",
        "education",
        "travel",
      ],
      required: [true, "Subscription category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"], //  Added "expired"
      default: "active",
      required: [true, "Status is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date must be in the past",
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return this.startDate ? value > this.startDate : true;
        },
        message: "End date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//  Pre-save middleware
subscriptionSchema.pre("save", function (next) {
  // Auto-generate endDate if not set
  if (this.isNew && !this.endDate && this.startDate && this.frequency) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    const days = renewalPeriod[this.frequency] || 30;
    const end = new Date(this.startDate);
    end.setDate(end.getDate() + days);

    this.endDate = end;
  }

  // Set status to "expired" if endDate is in the past (compared to today)
  if (this.endDate && this.endDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
