import { useState } from 'react'

function SweetCard({ sweet, isAdmin, onEdit, onDelete, onPurchase, onRestock }) {
  const [purchaseQuantity, setPurchaseQuantity] = useState(1)
  const [restockQuantity, setRestockQuantity] = useState(10)
  const [showRestockForm, setShowRestockForm] = useState(false)

  const handlePurchase = () => {
    if (purchaseQuantity > 0 && purchaseQuantity <= sweet.quantity) {
      onPurchase(sweet._id, purchaseQuantity)
      setPurchaseQuantity(1)
    }
  }

  const handleRestock = () => {
    if (restockQuantity > 0) {
      onRestock(sweet._id, restockQuantity)
      setRestockQuantity(10)
      setShowRestockForm(false)
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      chocolate: 'bg-amber-100 text-amber-800',
      candy: 'bg-pink-100 text-pink-800',
      cookie: 'bg-yellow-100 text-yellow-800',
      cake: 'bg-red-100 text-red-800',
      pastry: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors.other
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 truncate flex-1">
            {sweet.name}
          </h3>
          {isAdmin && (
            <div className="flex space-x-2 ml-2">
              <button
                onClick={onEdit}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(sweet.category)}`}>
            {sweet.category}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Price:</span>
            <span className="text-2xl font-bold text-purple-600">
              ${sweet.price.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Stock:</span>
            <span className={`text-lg font-semibold ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {sweet.quantity}
            </span>
          </div>
        </div>

        {sweet.quantity > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max={sweet.quantity}
                value={purchaseQuantity}
                onChange={(e) => setPurchaseQuantity(Math.max(1, Math.min(sweet.quantity, parseInt(e.target.value) || 1)))}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <button
                onClick={handlePurchase}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition font-medium"
              >
                Purchase
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <span className="text-red-600 font-medium">Out of Stock</span>
          </div>
        )}

        {isAdmin && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            {!showRestockForm ? (
              <button
                onClick={() => setShowRestockForm(true)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-medium"
              >
                Restock
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={restockQuantity}
                    onChange={(e) => setRestockQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Quantity"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleRestock}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-medium"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowRestockForm(false)
                      setRestockQuantity(10)
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SweetCard

