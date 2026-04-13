import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

async function verifyToken(token: string): Promise<any> {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// GET - fetch ALL users' payments (Admin only)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ success: false, message: "No token provided" }, { status: 401 });

    const decoded = await verifyToken(token);
    if (!decoded)
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });

    // ✅ Sirf ZENO000 access kar sakta hai
    if (decoded.userCode !== "ZENO000")
      return NextResponse.json({ success: false, message: "Access denied. Admins only." }, { status: 403 });

    // Sab users fetch karo jinke paas payments hain
    const users = await User.find({ "payments.0": { $exists: true } })
      .select("name mobile userCode payments");

    // Sab payments flat karke ek array mein laao
    const allPayments: any[] = [];

    for (const user of users) {
      for (const payment of user.payments) {
        allPayments.push({
          _id: payment._id,
          amount: payment.amount,
          screenshot: payment.screenshot,
          description: payment.description || "",
          status: payment.status,
          createdAt: payment.createdAt,
          // User info bhi attach karo admin ke liye
          userName: user.name,
          userCode: user.userCode,
          userMobile: user.mobile,
          userId: user._id,
        });
      }
    }

    // Latest pehle dikhao
    allPayments.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ success: true, data: allPayments });
  } catch (error) {
    console.error("Admin GET payments error:", error);
    return NextResponse.json({ success: false, message: "Error fetching payments" }, { status: 500 });
  }
}