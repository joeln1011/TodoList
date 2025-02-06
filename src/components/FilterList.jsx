const FilterList = () => {
  return (
    <div>
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
  );
};
export default FilterList;
