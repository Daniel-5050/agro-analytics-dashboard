import axios from 'axios';

const INVENTORY_BASE_URL = 'http://localhost:5000/api/inventory';

/* =========================
   FETCH ALL INVENTORY
========================= */
export const fetchInventory = async () => {
  try {
    const response = await axios.get(INVENTORY_BASE_URL);
    return response.data;
  } catch (error) {
    console.error(
      'Fetch Inventory Error:',
      error.response?.data || error.message
    );
    return [];
  }
};

/* =========================
   ADD INVENTORY
========================= */
export const addInventory = async (inventoryData) => {
  try {
    console.log('Sending Inventory Data:', inventoryData);

    const response = await axios.post(
      INVENTORY_BASE_URL,
      inventoryData
    );

    return response.data;
  } catch (error) {
    console.error(
      'Add Inventory Full Error:',
      error.response?.data || error.message
    );

    return null;
  }
};

/* =========================
   DELETE INVENTORY
========================= */
export const deleteInventory = async (id) => {
  try {
    const response = await axios.delete(
      `${INVENTORY_BASE_URL}/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      'Delete Inventory Error:',
      error.response?.data || error.message
    );

    return null;
  }
};

/* =========================
   UPDATE INVENTORY
========================= */
export const updateInventory = async (id, updatedData) => {
  try {
    console.log('Updating Inventory:', updatedData);

    const response = await axios.put(
      `${INVENTORY_BASE_URL}/${id}`,
      updatedData
    );

    return response.data;
  } catch (error) {
    console.error(
      'Update Inventory Error:',
      error.response?.data || error.message
    );

    return null;
  }
};