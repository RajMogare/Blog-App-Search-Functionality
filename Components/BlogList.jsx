"use client";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = ({ searchQuery }) => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = menu === "All" || blog.category === menu;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? `bg-black text-white py-1 px-4 rounded-sm` : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? `bg-black text-white py-1 px-4 rounded-sm`
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={
            menu === "Startup" ? `bg-black text-white py-1 px-4 rounded-sm` : ""
          }
        >
          StartUp
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? `bg-black text-white py-1 px-4 rounded-sm`
              : ""
          }
        >
          Lifestyle
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24 ">
        {filteredBlogs.map((item, index) => (
          <BlogItem
            key={index}
            id={item._id}
            image={item.image}
            description={item.description}
            category={item.category}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
