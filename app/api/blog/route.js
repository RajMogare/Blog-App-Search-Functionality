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

//API ENDPOINT FOR UPLOADIN BLOGS
export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();
  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    image: `${imgUrl}`,
  };
  await blogModel.create(blogData);
  console.log("Blog crated");

  // console.log(imgUrl);
  return NextResponse.json({ success: true, msg: "Blog Added" });
}
