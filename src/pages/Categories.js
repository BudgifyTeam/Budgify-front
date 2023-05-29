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
          <div className="popup">
            <img
              className="loadingGif"
              src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Loading.gif?alt=media&token=0d3075d1-5568-43d8-952d-0fb19567037c"
              alt=""
            ></img>
          </div>
        ) : (
          categories.map((category, index) => {
            if (category.name === "ajustes") {
              return null; // No renderizar cuando la categoría sea "ajustes"
            }
            return (
              <CategoryComponent value={category} index={index} key={index} />
            );
          })
        )}
        {!isLoading && <AddCategoryButton />}
      </div>
      <Footer />
    </div>
  );
}

export default Categories;
