import React, { useEffect, useState } from "react";
import Banner from "./HomePage/Banner";
import Categories from "./HomePage/Categories";
import JobSection from "./HomePage/JobSection";

const Home = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        const uniqueData = data.filter(
        (item, index, self) =>
          index === self.findIndex((j) => j.category === item.category)
      );
      setCategoriesData(uniqueData);
      });
  }, []);

  return (
    <div>
      <Banner></Banner>
      <Categories categoriesData={categoriesData}></Categories>
      <JobSection />
    </div>
  );
};

export default Home;
