import React from 'react';

export const TodosViewForm = ({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) => {
  const preventRefresh = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div>
        <label>Search todos</label>
        <input
          type="text"
          value={queryString}
          onChange={(e) => {
            setQueryString(e.target.value);
          }}
        />
        <button type="button" onClick={() => setQueryString('')}>
          Clear
        </button>
      </div>
      <div>
        <form onSubmit={preventRefresh}>
          <label>Sort By</label>
          <select
            onChange={(event) => {
              setSortField(event.target.value);
            }}
            value={sortField}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time Added</option>
          </select>
          <label>Direction</label>
          <select
            onChange={(event) => {
              setSortDirection(event.target.value);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Desceding</option>
          </select>
        </form>
      </div>
    </>
  );
};
