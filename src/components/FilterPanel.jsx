import "./FilterPanel.css";
import PropTypes from "prop-types";
import CategoryList from "./CategoryList";
import FilterList from "./FilterList";
import { useMemo } from "react";
import { useAppContext } from "../context/AppProvider";

const FILTER_ITEM = [
  {
    id: "all",
    label: "All",
    iconPath: "inbox.png",
  },
  {
    id: "important",
    label: "Important",
    iconPath: "flag.png",
  },
  {
    id: "completed",
    label: "Completed",
    iconPath: "check.png",
  },
  {
    id: "deleted",
    label: "Delete",
    iconPath: "delete.png",
  },
];

const FilterPanel = () => {
  const {
    todoList,
    searchText,
    setSearchText,
    selectedFilterId,
    setSelectedFilterId,
  } = useAppContext();

  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (cur.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }
        if (cur.isDeleted) {
          newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
        }
        return newAcc;
      },
      { all: todoList.length, important: 0, completed: 0, deleted: 0 }
    );
  }, [todoList]);

  console.log({ countByFilterType });

  return (
    <div className="filter-panel">
      <input
        name="search-text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <div className="filter-container">
        {FILTER_ITEM.map((filterItem) => {
          return (
            <div
              key={filterItem.id}
              className={`filter-item ${
                filterItem.id === selectedFilterId ? "selected" : ""
              }`}
              onClick={() => setSelectedFilterId(filterItem.id)}
            >
              <div className="filter-name">
                <img src={filterItem.iconPath} />
                <p>{filterItem.label}</p>
              </div>
              <p>{countByFilterType[filterItem.id]}</p>
            </div>
          );
        })}
      </div>
      <CategoryList todoList={todoList} />
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  todoList: PropTypes.array,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};

export default FilterPanel;
