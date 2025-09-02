import React from 'react';

export const TodosViewForm = ({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
}) => {
  const preventRefresh = (event) => {
    event.preventDefault();
  };
  return (
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
  );
};
