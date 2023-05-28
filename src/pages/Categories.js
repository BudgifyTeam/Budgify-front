import React, { useState, useEffect } from "react";
import { GetCategoriesRequest } from "../api/CategoriesAPI";
import CategoryComponent from "../components/CategoriesComponents";
import { Footer, Header } from "../components/AppComponents";
import { AddCategoryButton } from "../components/CategoriesComponents";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    GetCategoriesRequest()
      .then((responseData) => {
        setCategories(responseData.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="dashboardContainer">
      <Header title="Categories" />
      <div className="CategoriesContainer">
        {isLoading ? (
          <h1>Cargando</h1>
        ) : (
          categories.map((category, index) => (
            <CategoryComponent value={category} index={index} key={index} />
          ))
        )}
        {!isLoading && <AddCategoryButton />}
      </div>
      <Footer />
    </div>
  );
}

export default Categories;
