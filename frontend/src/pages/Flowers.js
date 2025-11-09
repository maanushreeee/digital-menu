import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import GridItem from '../components/GridItem';
import api from '../services/api';
import './Flowers.css';

import banner from '../assets/flowers/main.jpg';
import fi1 from '../assets/flowers/single.jpeg';
import fi2 from '../assets/flowers/small.jpg';
import fi3 from '../assets/flowers/vase.jpg';
import fi4 from '../assets/flowers/bag.jpg';

const initialFlowerItems = [
  { 
    name: "Single Flower Bouquet", 
    price: "$3.00", 
    desc: "Sometimes, less is more, and a single flower bouquet captures that perfectly. Elegant, timeless, and full of meaning, a single bloom speaks volumes.", 
    img: fi1 
  },
  { 
    name: "Small Bouquet", 
    price: "$7.00", 
    desc: "Our small bouquet features a delightful mix of fresh, handpicked blooms, carefully arranged to showcase their natural beauty. Perfectly sized and elegantly designed, it adds a touch of color and warmth to any space. Pick your own or choose from our already designed ones.", 
    img: fi2 
  },
  { 
    name: "Paper Vase Bouquet", 
    price: "$10.00", 
    desc: "Our Paper Vase Bouquet combines artistry and sustainability, featuring a carefully arranged selection of fresh blooms wrapped in an aesthetic paper vase design. It’s a stylish and eco-friendly choice, perfect for adding a charming touch to any space.", 
    img: fi3 
  },
  { 
    name: "Bag of Flowers", 
    price: "$12.00", 
    desc: "Our Bag of Flowers offers a charming and unique presentation, featuring a carefully arranged selection of fresh blooms elegantly nestled in a stylish carry bag. It’s a perfect blend of convenience and beauty, ready to brighten any occasion.", 
    img: fi4 
  },
];

function Flowers() {
  const [flowerItems, setFlowerItems] = useState(initialFlowerItems);
  const [loading, setLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    desc: '',
    img: ''
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    fetchFlowerItems();
  }, []);

  const fetchFlowerItems = async () => {
    try {
      setLoading(true);
      const response = await api.getProductsByCategory('flowers');

      if (response.length > 0) {
        const apiItemsFormatted = response.map(item => ({
          ...item,
          price: `$${item.price.toFixed(2)}`
        }));
        setFlowerItems([...initialFlowerItems, ...apiItemsFormatted]);
      }
    } catch (error) {
      console.error('Error fetching flower items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAdd = async () => {
    try {
      if (!imageFile) {
        alert('Please select an image');
        return;
      }

      const imageData = await convertImageToBase64(imageFile);

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        desc: formData.desc,
        img: imageData,
        category: 'flowers'
      };

      await api.addProduct(productData);
      await fetchFlowerItems();
      resetForm();
      alert('Flower item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item: ' + (error.message || 'Unknown error'));
    }
  };

  const handleUpdate = async () => {
    try {
      let imageData = formData.img;

      if (imageFile) {
        imageData = await convertImageToBase64(imageFile);
      }

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        desc: formData.desc,
        img: imageData,
        category: 'flowers'
      };

      await api.updateProduct(editingItem._id, productData);
      await fetchFlowerItems();
      resetForm();
      alert('Flower item updated successfully!');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item: ' + (error.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await api.deleteProduct(id);
      await fetchFlowerItems();
      alert('Flower item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item: ' + (error.message || 'Unknown error'));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    const priceValue = typeof item.price === 'string'
      ? item.price.replace('$', '')
      : item.price.toString();

    setFormData({
      name: item.name,
      price: priceValue,
      desc: item.desc,
      img: item.img
    });
    setImagePreview(item.img);
    setImageFile(null);
    setShowForm(true);
    setShowAdminPanel(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      desc: '',
      img: ''
    });
    setEditingItem(null);
    setImageFile(null);
    setImagePreview(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  return (
    <>
      <div className="flowers-header">
        <img src={banner} alt="Flowers Banner" />
        <div className="text-content">
          <h1>Our Flower Selection</h1>
          <p>
            At aromatique, we believe flowers aren’t just gifts — they’re emotions brought to life. Whether it’s celebrating love and life, expressing gratitude, brightening someone’s day, or your own, our handpicked, fresh blooms are arranged with care and creativity to make every moment special.
            <br />
            <br />
            From single flower bouquets to custom floral arrangements, we cater to your everyday moments that deserve a touch of beauty.
          </p>

          <button 
            className="admin-toggle-btn"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
          >
            {showAdminPanel ? '← Back to Products' : 'Manage Products →'}
          </button>
        </div>
      </div>

      {!showAdminPanel ? (
        <div className="flowers-grid">
          {flowerItems.map((item, index) => (
            <GridItem key={item._id || index} {...item} />
          ))}
        </div>
      ) : (
        <div className="admin-section">
          {!showForm ? (
            <div className="admin-container">
              <div className="admin-header-section">
                <h2>Manage Flower Products</h2>
                <button 
                  className="add-new-btn"
                  onClick={() => setShowForm(true)}
                >
                  + Add New Flower
                </button>
              </div>

              <div className="admin-list">
                {flowerItems.filter(item => item._id).map((item) => (
                  <div key={item._id} className="admin-item">
                    <img src={item.img} alt={item.name} className="admin-item-img" />
                    <div className="admin-item-info">
                      <h3>{item.name}</h3>
                      <p className="admin-item-price">{item.price}</p>
                      <p className="admin-item-desc">{item.desc.substring(0, 100)}...</p>
                    </div>
                    <div className="admin-item-actions">
                      <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                  </div>
                ))}
                {flowerItems.filter(item => item._id).length === 0 && (
                  <p className="no-items-msg">No custom flower items yet. Add your first one!</p>
                )}
              </div>
            </div>
          ) : (
            <div className="admin-container">
              <form className="admin-form" onSubmit={handleSubmit}>
                <h3>{editingItem ? 'Edit Flower Item' : 'Add New Flower Item'}</h3>

                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label>Price ($):</label>
                  <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label>Description:</label>
                  <textarea name="desc" value={formData.desc} onChange={handleInputChange} rows="4" required />
                </div>

                <div className="form-group">
                  <label>Image:</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
                  <small className="form-hint">
                    {editingItem ? 'Upload new image or leave empty to keep current' : 'Upload an image (max 5MB)'}
                  </small>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingItem ? 'Update Flower' : 'Add Flower'}
                  </button>
                  <button type="button" className="cancel-btn" onClick={resetForm}>
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

export default Flowers;
