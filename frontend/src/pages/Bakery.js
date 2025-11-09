import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import GridItem from '../components/GridItem';
import api from '../services/api';
import './Bakery.css';

import bakeryHome from '../assets/bakery/main.jpg';
import bi1 from '../assets/bakery/floral.jpeg';
import bi2 from '../assets/bakery/shortcake.jpg';
import bi3 from '../assets/bakery/lemontart.jpg';
import bi4 from '../assets/bakery/applepie.jpg';
import bi5 from '../assets/bakery/blueberrycheesecake.jpg';
import bi6 from '../assets/bakery/redvelvet.jpg';
import bi7 from '../assets/bakery/ctart.jpg';
import bi9 from '../assets/bakery/cookies.jpg';
import bi10 from '../assets/bakery/Chocolate Fudge Cupcakes.jpg';

const initialBakeryItems = [
  {
    name: 'Floral Cupcakes',
    price: '$3.50',
    desc: 'These delightful treats are a unique blend of classic baking and artistic flair. We start with a moist and tender vanilla cake, then top it with a swirl of rich buttercream frosting. The finishing touch? A delicate arrangement of fresh, seasonal flowers, adding a touch of elegance and whimsy to each cupcake.',
    img: bi1
  },
  {
    name: 'Chocolate Strawberry Shortcake',
    price: '$4.50',
    desc: 'Indulge in our decadent Chocolate Strawberry Shortcake. Rich chocolate cake is layered with creamy whipped cream and topped with fresh, juicy strawberries. A perfect dessert for any occasion.',
    img: bi2
  },
  {
    name: 'Lemon Tart',
    price: '$4.00',
    desc: 'A buttery, golden crust filled with a smooth, tangy lemon curd. Each bite offers a perfect balance of sweetness and citrusy zest, making it a refreshing treat to enjoy with your favorite coffee.',
    img: bi3
  },
  {
    name: 'Apple Pie',
    price: '$5.00',
    desc: 'A flaky, golden crust filled with tender, spiced apple slices, delivering a warm and comforting flavor in every bite.',
    img: bi4
  },
  {
    name: 'Blueberry Cheesecake',
    price: '$5.00',
    desc: 'A creamy, rich cheesecake layer on a buttery biscuit base, topped with a sweet and tangy blueberry compote for a burst of flavor in every bite.',
    img: bi5
  },
  {
    name: 'Red Velvet Cupcakes',
    price: '$3.00',
    desc: 'Soft and moist, with a rich cocoa flavor and a hint of vanilla, topped with a smooth cream cheese frosting for the perfect sweet indulgence.',
    img: bi6
  },
  {
    name: 'Chocolate Tart',
    price: '$4.50',
    desc: 'A buttery, crisp crust filled with a smooth, rich chocolate ganache, delivering a decadent and indulgent experience in every bite.',
    img: bi7
  },
  {
    name: 'Cookies',
    price: '$3.00',
    desc: 'We offer three cookie options: Chocolate Chip with classic, gooey chocolate chunks, Double Chocolate Chip for an extra chocolatey indulgence, and Red Velvet, with its soft, rich dough and a hint of cream cheese flavor.',
    img: bi9
  },
  {
    name: 'Chocolate Cupcakes',
    price: '$3.00',
    desc: 'Rich, moist, and packed with decadent cocoa flavor, topped with a smooth chocolate frosting for an irresistible treat in every bite.',
    img: bi10
  }
];

function Bakery() {
  const [bakeryItems, setBakeryItems] = useState(initialBakeryItems);
  const [loading, setLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    desc: '',
    img: ''
  });

  useEffect(() => {
    fetchBakeryItems();
  }, []);

  const fetchBakeryItems = async () => {
    try {
      setLoading(true);
      const response = await api.getProductsByCategory('bakery');

      if (response && response.length > 0) {
        const apiItemsFormatted = response.map(item => ({
          ...item,
          price: `$${item.price.toFixed(2)}`
        }));
        setBakeryItems([...initialBakeryItems, ...apiItemsFormatted]);
      }
    } catch (error) {
      console.error('Error fetching bakery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
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
        category: 'bakery'
      };

      await api.addProduct(productData);
      await fetchBakeryItems();
      resetForm();
      alert('Bakery item added successfully!');
    } catch (error) {
      console.error('Error adding bakery item:', error);
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
        category: 'bakery'
      };

      await api.updateProduct(editingItem._id, productData);
      await fetchBakeryItems();
      resetForm();
      alert('Bakery item updated successfully!');
    } catch (error) {
      console.error('Error updating bakery item:', error);
      alert('Failed to update item: ' + (error.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await api.deleteProduct(id);
      await fetchBakeryItems();
      alert('Bakery item deleted successfully!');
    } catch (error) {
      console.error('Error deleting bakery item:', error);
      alert('Failed to delete item: ' + (error.message || 'Unknown error'));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    const priceValue = typeof item.price === 'string' ? item.price.replace('$', '') : item.price.toString();

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
    setFormData({ name: '', price: '', desc: '', img: '' });
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
      <div className="bakery-header">
        <img src={bakeryHome} alt="Bakery Banner" />
        <div className='text-content'>
          <h1>Our Baked Goods Selection</h1>
          <p>
            At our shop, we take great pride in our bakery offerings, made with the finest ingredients and baked fresh daily. Each item is crafted with care to deliver a perfect balance of flavors and textures, ensuring that every bite is a delightful experience. Our sweet treats are designed to complement the rich, bold flavors of our coffee, creating a harmonious pairing for any time of day. From delicate pastries to indulgent cakes, every item is made with passion and attention to detail. Whether you're here for a morning pick-me-up or an afternoon treat, our bakery items offer a little moment of sweetness and comfort to brighten your day.
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
        <div className="bakery-grid">
          {bakeryItems.map((item, index) => (
            <GridItem key={item._id || index} {...item} />
          ))}
        </div>
      ) : (
        <div className="admin-section">
          {!showForm ? (
            <div className="admin-container">
              <div className="admin-header-section">
                <h2>Manage Bakery Products</h2>
                <button className="add-new-btn" onClick={() => setShowForm(true)}>+ Add New Bakery Item</button>
              </div>

              <div className="admin-list">
                {bakeryItems.filter(item => item._id).map((item) => (
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
                {bakeryItems.filter(item => item._id).length === 0 && (
                  <p className="no-items-msg">No custom bakery items yet. Add your first one!</p>
                )}
              </div>
            </div>
          ) : (
            <div className="admin-container">
              <form className="admin-form" onSubmit={handleSubmit}>
                <h3>{editingItem ? 'Edit Bakery Item' : 'Add New Bakery Item'}</h3>

                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label>Price ($):</label>
                  <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} placeholder="e.g., 4.00" required />
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
                  <button type="submit" className="submit-btn">{editingItem ? 'Update Bakery' : 'Add Bakery'}</button>
                  <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>
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

export default Bakery;
