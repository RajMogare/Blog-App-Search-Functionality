"use client"
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <ToastContainer/>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BlogList searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}

