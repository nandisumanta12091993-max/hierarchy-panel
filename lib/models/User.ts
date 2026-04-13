import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  screenshot: { type: String, required: true },
  description: { type: String, default: "" },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: {
      type: String,
      required: true,
      set: function (v: string) {
        // Clean before saving AND before validating
        return String(v).replace(/\D/g, "").replace(/^0+/, "");
      },
      validate: {
        validator: function (v: string) {
          // v is already cleaned by set()
          return /^\d{10}$/.test(v);
        },
        message: "Please enter a valid 10-digit mobile number",
      },
    },
    email: { type: String, default: "" },
    pan: { type: String, default: "" },
    password: { type: String, required: true, select: false },
    userCode: { type: String, default: "", unique: true, sparse: true },
    referralToken: { type: String, default: "" },
    walletName: { type: String, default: "" },
    walletAddress: { type: String, default: "" },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    payments: [PaymentSchema],
    maxInvestmentMonths: { type: Number, default: 25 },
  },
  { timestamps: true }
);

// Only ONE index definition per field
UserSchema.index({ mobile: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);