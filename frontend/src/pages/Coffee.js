import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import GridItem from '../components/GridItem';
import api from '../services/api';
import './Coffee.css';

import coffeeHome from '../assets/coffee/main.jpg'
import ci1 from '../assets/coffee/espresso.jpg'
import ci2 from '../assets/coffee/americano.jpg'
import ci3 from '../assets/coffee/latte.jpg'
import ci4 from '../assets/coffee/cappucino.jpg'
import ci5 from '../assets/coffee/macchiato.jpg'
import ci6 from '../assets/coffee/mochaccino.jpg'
import ci7 from '../assets/coffee/cortado.jpg'
import ci8 from '../assets/coffee/vietnamese.jpg'
import ci9 from '../assets/coffee/matcha.jpg'
import ci10 from '../assets/coffee/coldbrew.jpg'
import ci11 from '../assets/coffee/gingerale.jpg'
import ci12 from '../assets/coffee/rose.jpg'

const initialCoffeeItems = [
  { name: "Espresso", price: "$3.00", desc: "A strong, rich coffee shot brewed by forcing hot water through finely-ground coffee beans, delivering an intense and bold flavor.", img: ci1 },
  { name: "Americano", price: "$3.50", desc: "A smooth and mild coffee made by diluting a shot of espresso with hot water, creating a lighter but flavorful drink.", img: ci2 },
  { name: "Latte", price: "$4.00", desc: "A creamy coffee beverage made with a shot of espresso and steamed milk, topped with a light layer of foam for added texture.", img: ci3 },
  { name: "Cappuccino", price: "$4.50", desc: "A balanced blend of espresso, steamed milk, and a thick layer of milk foam, offering a rich and smooth coffee experience.", img: ci4 },
  { name: "Macchiato", price: "$3.75", desc: "A bold espresso shot topped with a small dollop of foamed milk, adding a touch of creaminess without overpowering the coffee's intensity.", img: ci5 },
  { name: "Mochaccino", price: "$4.75", desc: "A delightful blend of espresso, steamed milk, and chocolate syrup, topped with whipped cream for a sweet finish.", img: ci6 },
  { name: "Cortado", price: "$3.75", desc: "A balanced coffee drink made with equal parts espresso and steamed milk, offering a smooth texture and bold coffee flavor.", img: ci7 },
  { name: "Vietnamese Coffee", price: "$4.25", desc: "A rich and bold brew, often made with dark-roasted beans and served with condensed milk, a perfect balance of sweetness and intensity.", img: ci8 },
  { name: "Matcha Latte", price: "$4.50", desc: "A creamy and earthy beverage made with finely ground green tea powder, steamed milk, and a hint of sweetness.", img: ci9 },
  { name: "Cold Brew", price: "$4.25", desc: "Coffee brewed slowly with cold water over several hours, resulting in a smooth, less acidic, and naturally sweet coffee flavor.", img: ci10 },
  { name: "Cold Brew Ginger Ale", price: "$4.50", desc: "With the cold brew's natural sweetness, the ginger ale complements the drink with a light fiery kick, topped up with a fresh, zesty touch of lime.", img: ci11 },
  { name: "Spanish Rose Latte", price: "$4.00", desc: "A fragrant twist on the classic latte, infused with rose syrup and a touch of sweet condensed milk, creating a delicate floral flavor.", img: ci12 },
];

function Coffee() {
  const [coffeeItems, setCoffeeItems] = useState(initialCoffeeItems);
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

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch coffee items from API on component mount
  useEffect(() => {
    fetchCoffeeItems();
  }, []);

  const fetchCoffeeItems = async () => {
    try {
      setLoading(true);
      const response = await api.getProductsByCategory('coffee');
      
      // Merge hardcoded items with API items
      if (response.length > 0) {
        const apiItemsFormatted = response.map(item => ({
          ...item,
          price: `$${item.price.toFixed(2)}`
        }));
        setCoffeeItems([...initialCoffeeItems, ...apiItemsFormatted]);
      }
    } catch (error) {
      console.error('Error fetching coffee items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image file selection
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

  // Convert image to base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Add new coffee item
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
        category: 'coffee'
      };

      await api.addProduct(productData);
      
      await fetchCoffeeItems();
      resetForm();
      alert('Coffee item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item: ' + (error.message || 'Unknown error'));
    }
  };

  // Update existing coffee item
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
        category: 'coffee'
      };

      await api.updateProduct(editingItem._id, productData);
      
      await fetchCoffeeItems();
      resetForm();
      alert('Coffee item updated successfully!');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item: ' + (error.message || 'Unknown error'));
    }
  };

  // Delete coffee item
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    try {
      await api.deleteProduct(id);
      await fetchCoffeeItems();
      alert('Coffee item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item: ' + (error.message || 'Unknown error'));
    }
  };

  // Open form for editing
  const handleEdit = (item) => {
    setEditingItem(item);
    const priceValue = typeof item.price === 'string' ? 
      item.price.replace('$', '') : item.price.toString();
    
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

  // Reset form
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

  // Submit form
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
      <div className="coffee-header">
        <img src={coffeeHome} alt="Coffee Banner" />
        <div className='text-content'>
          <h1>Our Coffee Selection</h1>
          <p>At aromatique, every cup begins with careful selection and expert craftsmanship. Our coffee beans are sourced from trusted farms, expertly roasted to enhance their unique flavors, and brewed with precision and passion.
Each step, from sourcing to your cup, is guided by a commitment to quality and exceptional taste.
<br/>
<br/>
Enjoy a cup crafted with dedication — because great coffee deserves great care.</p>
          
          {/* Admin toggle button */}
          <button 
            className="admin-toggle-btn"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
          >
            {showAdminPanel ? '← Back to Products' : 'Manage Products →'}
          </button>
        </div>
      </div>

      {/* Show either product grid or admin panel */}
      {!showAdminPanel ? (
        <div className="coffee-grid">
          {coffeeItems.map((item, index) => (
            <GridItem key={item._id || index} {...item} />
          ))}
        </div>
      ) : (
        <div className="admin-section">
          {!showForm ? (
            <div className="admin-container">
              <div className="admin-header-section">
                <h2>Manage Coffee Products</h2>
                <button 
                  className="add-new-btn"
                  onClick={() => setShowForm(true)}
                >
                  + Add New Coffee
                </button>
              </div>

              <div className="admin-list">
                {coffeeItems.filter(item => item._id).map((item) => (
                  <div key={item._id} className="admin-item">
                    <img src={item.img} alt={item.name} className="admin-item-img" />
                    <div className="admin-item-info">
                      <h3>{item.name}</h3>
                      <p className="admin-item-price">{item.price}</p>
                      <p className="admin-item-desc">{item.desc.substring(0, 100)}...</p>
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
                {coffeeItems.filter(item => item._id).length === 0 && (
                  <p className="no-items-msg">No custom coffee items yet. Add your first one!</p>
                )}
              </div>
            </div>
          ) : (
            <div className="admin-container">
              <form className="admin-form" onSubmit={handleSubmit}>
                <h3>{editingItem ? 'Edit Coffee Item' : 'Add New Coffee Item'}</h3>
                
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
                    placeholder="e.g., 4.00"
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
                    {editingItem ? 'Update Coffee' : 'Add Coffee'}
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

export default Coffee;