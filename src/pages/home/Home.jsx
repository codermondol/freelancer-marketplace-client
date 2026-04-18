import React, { useEffect, useState } from "react";
import Banner from "./HomePage/Banner";
import Categories from "./HomePage/Categories";
import JobSection from "./HomePage/JobSection";

const Home = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [jobData, setJobData] = useState([])

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

  useEffect(() => {
    fetch('http://localhost:3000/latest-jobs')
    .then(res => res.json())
    .then(data => setJobData(data))
  }, [])

  return (
    <div>
      <Banner></Banner>
      <Categories categoriesData={categoriesData}></Categories>
      <JobSection jobData={jobData}></JobSection>
    </div>
  );
};

export default Home;
