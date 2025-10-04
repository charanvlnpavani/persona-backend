const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    uploadImage: {
      type: String,
      required: false,
      trim: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => validator.isStrongPassword(v),
        message: "Password is not strong enough",
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Invalid email format",
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => String(v).length === 10,
        message: "Phone number must be 10 digits",
      },
    },
    place: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    bloodGroup: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      validate: {
        validator: (v) =>
          ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(v),
        message:
          "Invalid Blood Group Value - Must be A+/A-/B+/B-/AB+/AB-/O+/O-",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    experience: {
      type: String,
      required: true,
      min: 0,
      max: 50,
    },
    softwareRole: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "At least one software role is required",
      },
    },
    skills: {
      Frontend: [String],
      Backend: [String],
      Databases: [String],
      ToolsAndPlatforms: [String], // use camelCase (instead of "Tools & Platforms")
      CoreConcepts: [String],
    },
    socialMediaLinks: {
      linkedin: {
        type: String,
        validate: {
          validator: (v) => !v || validator.isURL(v),
          message: "Invalid URL format for LinkedIn",
        },
      },
      github: {
        type: String,
        validate: {
          validator: (v) => !v || validator.isURL(v),
          message: "Invalid URL format for GitHub",
        },
      },
      twitter: {
        type: String,
        validate: {
          validator: (v) => !v || validator.isURL(v),
          message: "Invalid URL format for Twitter",
        },
      },
      youtube: {
        type: String,
        validate: {
          validator: (v) => !v || validator.isURL(v),
          message: "Invalid URL format for Youtube",
        },
      },
      discord: {
        type: String,
        validate: {
          validator: (v) => !v || validator.isURL(v),
          message: "Invalid URL format for Discord",
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
