import React from 'react';

const FilterTasks = (props) => {
  const handleChange = event => {
    props.onFilterChange(event.target.value)
  }
  return (
    <div>

      <label>
        <strong>Filter by Category:</strong>
        <select onChange={handleChange}>
          {
            props.userCategories && props.userCategories.length > 0
            ?
            props.userCategories.map(cat => {
            return <option value={cat.id}>{cat.name}</option>})
            :
            <option> Bad option </option>
          }
          <option value="all">All</option>
        </select>
      </label>

    </div>
  );
}

export default FilterTasks;
