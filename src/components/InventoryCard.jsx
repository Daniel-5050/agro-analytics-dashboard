import React, { useEffect, useState } from 'react';
import '../styles/inventory.css';
import {
  fetchInventory,
  addInventory,
  deleteInventory,
  updateInventory
} from '../services/inventoryApi';
import { toast } from 'react-toastify';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    unit: 'tons',
    marketPrice: ''
  });

  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  /* =========================
     LOAD INVENTORY
  ========================= */
  const loadInventory = async () => {
    try {
      const data = await fetchInventory();
      setInventory(data || []);
    } catch (error) {
      toast.error('Failed to load inventory');
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  /* =========================
     HANDLE FORM INPUT
  ========================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* =========================
     EDIT INVENTORY
  ========================= */
  const handleEdit = (item) => {
    setFormData({
      cropName: item.cropName,
      quantity: item.quantity,
      unit: item.unit,
      marketPrice: item.marketPrice
    });

    setEditId(item._id);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /* =========================
     RESET FORM
  ========================= */
  const resetForm = () => {
    setFormData({
      cropName: '',
      quantity: '',
      unit: 'tons',
      marketPrice: ''
    });

    setEditId(null);
  };

  /* =========================
     SUBMIT INVENTORY
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.cropName ||
      !formData.quantity ||
      !formData.marketPrice
    ) {
      toast.error('Please fill all required fields.');
      return;
    }

    setLoading(true);

    const newItem = {
      cropName: formData.cropName.trim(),
      quantity: Number(formData.quantity) || 0,
      unit: formData.unit,
      marketPrice: Number(formData.marketPrice) || 0
    };

    const saved = editId
      ? await updateInventory(editId, newItem)
      : await addInventory(newItem);

    if (saved) {
      toast.success(
        editId
          ? 'Inventory updated successfully!'
          : 'Inventory item saved successfully!'
      );

      resetForm();
      loadInventory();
    } else {
      toast.error(
        editId
          ? 'Failed to update inventory.'
          : 'Failed to add inventory.'
      );
    }

    setLoading(false);
  };

  /* =========================
     DELETE INVENTORY
  ========================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this inventory item?'
    );

    if (!confirmDelete) return;

    const deleted = await deleteInventory(id);

    if (deleted) {
      toast.success('Inventory deleted successfully!');
      loadInventory();
    } else {
      toast.error('Failed to delete inventory.');
    }
  };

  /* =========================
     TOTAL VALUE
  ========================= */
  const totalValue = inventory.reduce(
    (total, item) =>
      total + (item.estimatedValue || 0),
    0
  );

  return (
    <div className="inventory-page container-fluid py-4">

      {/* Header */}
      <div className="inventory-header mb-4">
        <h2>Inventory Management</h2>
        <p>
          Add, track, edit, and monitor crop stock for real-time market analysis.
        </p>
      </div>

      <div className="row g-4">

        {/* Form Section */}
        <div className="col-lg-4">
          <div className="inventory-form-card">
            <h4 className="mb-3">
              {editId ? 'Edit Inventory' : 'Add New Inventory'}
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Crop Name</label>
                <input
                  type="text"
                  name="cropName"
                  className="form-control"
                  value={formData.cropName}
                  onChange={handleChange}
                  placeholder="e.g. Maize"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 500"
                  min="1"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Unit</label>
                <select
                  name="unit"
                  className="form-select"
                  value={formData.unit}
                  onChange={handleChange}
                >
                  <option value="tons">Tons</option>
                  <option value="bags">Bags</option>
                  <option value="kg">Kilograms</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Market Price (₦)</label>
                <input
                  type="number"
                  name="marketPrice"
                  className="form-control"
                  value={formData.marketPrice}
                  onChange={handleChange}
                  placeholder="e.g. 250000"
                  min="1"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 mb-2"
                disabled={loading}
              >
                {loading
                  ? 'Saving...'
                  : editId
                  ? 'Update Inventory'
                  : 'Add Inventory'}
              </button>

              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="col-lg-8">
          <div className="inventory-table-card">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
              <h4>Current Inventory</h4>
              <h5 className="total-value">
                Total Value: ₦{totalValue.toLocaleString()}
              </h5>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Market Price</th>
                    <th>Estimated Value</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {inventory.length > 0 ? (
                    inventory.map((item) => (
                      <tr key={item._id}>
                        <td>{item.cropName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit}</td>
                        <td>
                          ₦{item.marketPrice.toLocaleString()}
                        </td>
                        <td>
                          ₦{(item.estimatedValue || 0).toLocaleString()}
                        </td>
                        <td className="d-flex gap-2 flex-wrap">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(item._id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center"
                      >
                        No inventory data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default InventoryPage;