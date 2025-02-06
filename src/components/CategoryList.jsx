import { CATEGORY_ITEMS } from "./constants";
import "./CategoryList.css";
import { useMemo } from "react";
import { useAppContext } from "../context/AppProvider";
import PropTypes from "prop-types";

const CategoryList = () => {
  const { selectedCategoryId, setSelectedCategoryId, todoList } =
    useAppContext();
  const countByCategory = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => ({ ...acc, [cur.category]: acc[cur.category] + 1 }),
      {
        personal: 0,
        company: 0,
        travel: 0,
        idea: 0,
      }
    );
  }, [todoList]);
  console.log({ countByCategory });
  return (
    <div>
      <p>Categogy</p>
      <div>
        {CATEGORY_ITEMS.map((category) => {
          return (
            <div
              key={category.id}
              className={`category-item ${
                category.id === selectedCategoryId ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedCategoryId(category.id);
              }}
            >
              <p className="vategory-name">{category.label}</p>
              <p>{countByCategory[category.id]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CategoryList.propTypes = { todoList: PropTypes.array };

export default CategoryList;
