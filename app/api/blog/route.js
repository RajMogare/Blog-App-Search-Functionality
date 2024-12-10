import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import blogModel from "@/lib/models/blogModel";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";

export async function GET(request) {
  // Ensure the database is connected
  if (!mongoose.connection.readyState) await connectDB();

  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await blogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await blogModel.find({});
    return NextResponse.json({ blogs });
  }
}

export async function POST(request) {
  // Ensure the database is connected
  if (!mongoose.connection.readyState) await connectDB();

  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);

  // Dynamically create an image path in serverless environments
  const imgFileName = `${timestamp}_${image.name}`;
  const imgPath = `/tmp/${imgFileName}`; // Use /tmp for serverless environments like Vercel
  await writeFile(imgPath, buffer);

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    image: `${imgFileName}`, // Save just the filename or adjust according to your requirements
  };

  await blogModel.create(blogData);
  console.log("Blog created");

  return NextResponse.json({ success: true, msg: "Blog Added" });
}
