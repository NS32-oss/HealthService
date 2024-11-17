import mongoose from "mongoose";

const healthServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      text: true,
    },

    providerName: {
      type: String,
      required: true,
      trim: true,
      index: true,
      text: true,
    },

    yearOfEstablishment: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0, 
    },

    serviceDuration: {
      type: Number,
      required: true, 
    },

    availability: {
      type: Number,
      required: true,
      min: 0, 
    },

    condition: {
      type: String,
      lowercase: true,
      enum: ["new", "recurring"],
      default: "new",
      text: true,
    },

    description: {
      type: String,
      trim: true,
      text: true,
    },

    category: {
      type: [String], 
      required: true,
      text: true,
    },

    languageSupported: {
      type: String,
      default: "English", 
      text: true,
    },
  },
  { timestamps: true } 
);


export const HealthService = mongoose.model("HealthService", healthServiceSchema);
