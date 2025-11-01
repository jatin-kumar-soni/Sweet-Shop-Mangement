import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = () => {
    const query = {}
    if (name.trim()) query.name = name.trim()
    if (category) query.category = category
    if (minPrice) query.minPrice = parseFloat(minPrice)
    if (maxPrice) query.maxPrice = parseFloat(maxPrice)
    onSearch(query)
  }

  const handleReset = () => {
    setName('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    onSearch({})
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search by name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Categories</option>
            <option value="chocolate">Chocolate</option>
            <option value="candy">Candy</option>
            <option value="cookie">Cookie</option>
            <option value="cake">Cake</option>
            <option value="pastry">Pastry</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="100.00"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="flex items-end space-x-2">
          <button
            onClick={handleSearch}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition font-medium"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar

