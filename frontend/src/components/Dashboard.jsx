import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { sweetsAPI } from '../services/api'
import SweetCard from './SweetCard'
import AddSweetModal from './AddSweetModal'
import EditSweetModal from './EditSweetModal'
import SearchBar from './SearchBar'

function Dashboard() {
  const { isAdmin } = useAuth()
  const [sweets, setSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingSweet, setEditingSweet] = useState(null)
  const [searchQuery, setSearchQuery] = useState({})

  useEffect(() => {
    fetchSweets()
  }, [searchQuery])

  const fetchSweets = async () => {
    try {
      setLoading(true)
      let response
      if (Object.keys(searchQuery).length > 0) {
        response = await sweetsAPI.search(searchQuery)
      } else {
        response = await sweetsAPI.getAll()
      }
      setSweets(response.data.sweets || [])
      setError('')
    } catch (err) {
      setError('Failed to load sweets. Please try again.')
      console.error('Error fetching sweets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSweet = async (sweetData) => {
    try {
      const response = await sweetsAPI.create(sweetData)
      setSweets([response.data.sweet, ...sweets])
      setShowAddModal(false)
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add sweet')
    }
  }

  const handleUpdateSweet = async (id, sweetData) => {
    try {
      const response = await sweetsAPI.update(id, sweetData)
      setSweets(sweets.map(sweet => 
        sweet._id === id ? response.data.sweet : sweet
      ))
      setEditingSweet(null)
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update sweet')
    }
  }

  const handleDeleteSweet = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return
    }

    try {
      await sweetsAPI.delete(id)
      setSweets(sweets.filter(sweet => sweet._id !== id))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete sweet')
    }
  }

  const handlePurchase = async (id, quantity = 1) => {
    try {
      const response = await sweetsAPI.purchase(id, quantity)
      setSweets(sweets.map(sweet => 
        sweet._id === id ? response.data.sweet : sweet
      ))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to purchase sweet')
    }
  }

  const handleRestock = async (id, quantity) => {
    try {
      const response = await sweetsAPI.restock(id, quantity)
      setSweets(sweets.map(sweet => 
        sweet._id === id ? response.data.sweet : sweet
      ))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to restock sweet')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading sweets...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Sweet Shop</h1>
          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
            >
              Add New Sweet
            </button>
          )}
        </div>
        
        <SearchBar onSearch={setSearchQuery} />
        
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>

      {sweets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No sweets available at the moment.</p>
          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Add Your First Sweet
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sweets.map(sweet => (
            <SweetCard
              key={sweet._id}
              sweet={sweet}
              isAdmin={isAdmin}
              onEdit={() => setEditingSweet(sweet)}
              onDelete={() => handleDeleteSweet(sweet._id)}
              onPurchase={handlePurchase}
              onRestock={handleRestock}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddSweetModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSweet}
        />
      )}

      {editingSweet && (
        <EditSweetModal
          sweet={editingSweet}
          onClose={() => setEditingSweet(null)}
          onSave={(data) => handleUpdateSweet(editingSweet._id, data)}
        />
      )}
    </div>
  )
}

export default Dashboard

