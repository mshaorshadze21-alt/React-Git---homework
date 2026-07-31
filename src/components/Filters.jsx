import React from 'react'

const Filters = ({
  search,
  setSearch,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 border-3 border-amber-900 rounded-2xl p-4">

      <input
        type="text"
        placeholder="ძებნა..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">ყველა</option>
        <option value="read">წაკითხული</option>
        <option value="unread">წაუკითხავი</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="none">სორტირება</option>
        <option value="title">სათაურით</option>
        <option value="year">წლით</option>
      </select>

    </div>
  
  );
}

export default Filters