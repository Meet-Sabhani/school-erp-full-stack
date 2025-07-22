import { School } from "@/lib/models/School";
import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/mongodb";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const { name, principalName, email, phone, address } = body;

  const password = Math.random().toString(36).slice(-8); // random password
  const hashedPassword = await hash(password, 10);

  const principalUser = await User.create({
    name: principalName,
    email,
    phone,
    address,
    password: hashedPassword,
    role: "principal",
  });

  const school = await School.create({
    name,
    principalName,
    email,
    phone,
    address,
    principalUser: principalUser._id,
  });

  return NextResponse.json({
    school,
    credentials: {
      email: principalUser.email,
      password, // show in UI
    },
  });
}
