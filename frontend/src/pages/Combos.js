import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import GridItem from "../components/GridItem";
import api from "../services/api";
import "./Combos.css";

import main from "../assets/combos/combos.jpg";
import ci1 from "../assets/combos/fc.jpg";
import ci2 from "../assets/combos/fcd.jpeg";
import ci3 from "../assets/combos/fd.jpeg";

const initialComboItems = [
  {
    name: "Flowers and Coffee Combo",
    price: "$8.00",
    desc: "A comforting blend of freshly brewed coffee paired with a beautiful floral arrangement — a perfect start to your day.",
    img: ci1,
  },
  {
    name: "Flowers, Coffee and Dessert Combo",
    price: "$12.00",
    desc: "A complete indulgence: aromatic coffee, fresh flowers, and a delicious dessert — crafted to make any occasion special.",
    img: ci2,
  },
  {
    name: "Flowers and Dessert Combo",
    price: "$10.00",
    desc: "A sweet pairing of our handmade desserts with elegant blooms — designed for cozy evenings or heartfelt gifts.",
    img: ci3,
  },
];

function Combo() {
  const [comboItems, setComboItems] = useState(initialComboItems);
  const [loading, setLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    img: "",
  });

  useEffect(() => {
    fetchComboItems();
  }, []);

  const fetchComboItems = async () => {
    try {
      setLoading(true);
      const response = await api.getProductsByCategory("combos");

      if (response && response.length > 0) {
        const formatted = response.map((item) => ({
          ...item,
          price: `$${item.price.toFixed(2)}`,
        }));
        setComboItems([...initialComboItems, ...formatted]);
      }
    } catch (error) {
      console.error("Error fetching combo items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const convertImageToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAdd = async () => {
    try {
      if (!imageFile) {
        alert("Please select an image");
        return;
      }

      const imageData = await convertImageToBase64(imageFile);
      const newItem = {
        name: formData.name,
        price: parseFloat(formData.price),
        desc: formData.desc,
        img: imageData,
        category: "combos",
      };

      await api.addProduct(newItem);
      await fetchComboItems();
      resetForm();
      alert("Combo item added successfully!");
    } catch (error) {
      console.error("Error adding combo item:", error);
      alert("Failed to add combo item: " + (error.message || "Unknown error"));
    }
  };

  const handleUpdate = async () => {
    try {
      let imageData = formData.img;
      if (imageFile) imageData = await convertImageToBase64(imageFile);

      const updatedItem = {
        name: formData.name,
        price: parseFloat(formData.price),
        desc: formData.desc,
        img: imageData,
        category: "combos",
      };

      await api.updateProduct(editingItem._id, updatedItem);
      await fetchComboItems();
      resetForm();
      alert("Combo item updated successfully!");
    } catch (error) {
      console.error("Error updating combo item:", error);
      alert("Failed to update combo item: " + (error.message || "Unknown error"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this combo?")) return;

    try {
      await api.deleteProduct(id);
      await fetchComboItems();
      alert("Combo item deleted successfully!");
    } catch (error) {
      console.error("Error deleting combo item:", error);
      alert("Failed to delete combo item: " + (error.message || "Unknown error"));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    const priceValue =
      typeof item.price === "string" ? item.price.replace("$", "") : item.price.toString();

    setFormData({
      name: item.name,
      price: priceValue,
      desc: item.desc,
      img: item.img,
    });
    setImagePreview(item.img);
    setImageFile(null);
    setShowForm(true);
    setShowAdminPanel(true);
  };

  const resetForm = () => {
    setFormData({ name: "", price: "", desc: "", img: "" });
    setEditingItem(null);
    setImageFile(null);
    setImagePreview(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) handleUpdate();
    else handleAdd();
  };

  return (
    <>
      <div className="combo-header">
        <img src={main} alt="Combos Banner" className="combo-banner" />
        <div className="text-content">
          <h1>Our Combos</h1>
          <p>
            Discover delightful pairings of flowers, coffee, and desserts —
            perfect for gifting or treating yourself to something special.
          </p>

          <button
            className="admin-toggle-btn"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
          >
            {showAdminPanel ? "← Back to Combos" : "Manage Combos →"}
          </button>
        </div>
      </div>

      {!showAdminPanel ? (
        <div className="combo-grid">
          {comboItems.map((item, index) => (
            <GridItem key={item._id || index} {...item} />
          ))}
        </div>
      ) : (
        <div className="admin-section">
          {!showForm ? (
            <div className="admin-container">
              <div className="admin-header-section">
                <h2>Manage Combo Products</h2>
                <button
                  className="add-new-btn"
                  onClick={() => setShowForm(true)}
                >
                  + Add New Combo
                </button>
              </div>

              <div className="admin-list">
                {comboItems.filter((item) => item._id).map((item) => (
                  <div key={item._id} className="admin-item">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="admin-item-img"
                    />
                    <div className="admin-item-info">
                      <h3>{item.name}</h3>
                      <p className="admin-item-price">{item.price}</p>
                      <p className="admin-item-desc">
                        {item.desc.substring(0, 100)}...
                      </p>
                    </div>
                    <div className="admin-item-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {comboItems.filter((item) => item._id).length === 0 && (
                  <p className="no-items-msg">
                    No custom combo items yet. Add your first one!
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="admin-container">
              <form className="admin-form" onSubmit={handleSubmit}>
                <h3>{editingItem ? "Edit Combo Item" : "Add New Combo"}</h3>

                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  <small className="form-hint">
                    {editingItem
                      ? "Upload new image or leave empty to keep current"
                      : "Upload an image (max 5MB)"}
                  </small>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingItem ? "Update Combo" : "Add Combo"}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
}

export default Combo;
