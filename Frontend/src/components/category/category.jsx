import React from "react";
import Style from "./category.module.css";
import { useValue } from "../../itemContext";

const Category = () => {
  const { handleCategoryFilter, handleValue, rangeValue } = useValue();

  return (
    <div className={Style.container}>
      <h5>Filter</h5>
      <form className={Style.form}>
        <div className={Style.price}>
          <label htmlFor="price">
            Price: <span>{rangeValue}</span>
          </label>
          <input
            type="range"
            id="price"
            name="price"
            min="8"
            max="1000"
            value={rangeValue}
            className={Style.accent}
            onChange={handleValue}
          />
        </div>
        <h5>Category</h5>
        <div className={Style.containerCategory}>
          {[
            { id: "all", label: "All", value: "" },
            { id: "men", label: "Men's Clothing", value: "men's clothing" },
            { id: "women", label: "Women's Clothing", value: "women's clothing" },
            { id: "jewelry", label: "Jewelery", value: "jewelery" },
            { id: "electronics", label: "Electronics", value: "electronics" },
          ].map(({ id, label, value }) => (
            <div className={Style.category} key={id}>
              <input
                type="radio"
                id={id}
                name="category"
                className={Style.accent}
                onClick={() => handleCategoryFilter(value)}
              />
              <label htmlFor={id}>{label}</label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Category;
