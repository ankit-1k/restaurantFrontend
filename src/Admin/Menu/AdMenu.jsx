import React from "react";
import AdHeader from "../header/AdHeader";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";

const AdMenu = () => {
  const categories = [
    { name: "Breakfast", code: "BF" },
    { name: "Lunch", code: "L" },
    { name: "Dinner", code: "D" },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [imgUrl, setImgUrl] = React.useState("");
  const [foodName, setFoodName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [price, setPrice] = React.useState("");
  const toastRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data in the required format
    const menuItem = {
      category: selectedCategory.name,
      items: [
        {
          img: imgUrl,
          name: foodName,
          message: message,
          price: price,
        },
      ],
    };

    try {
      // Send data to the backend using Axios
      const response = await axios.post("http://localhost:4000/api/postmenu", menuItem);
      
      // Show success message
      if (response.status === 201) {
        toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Menu item added!' });
        // Reset form fields
        setSelectedCategory(null);
        setImgUrl("");
        setFoodName("");
        setMessage("");
        setPrice("");
      }
    } catch (error) {
      // Show error message
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: error.response?.data?.message || error.message });
    }
  };

  return (
    <div className="ad-menu-container">
      <AdHeader />
      <div className="container">
        <h2 className="form-title">Add Menu Item</h2>
        <Toast ref={toastRef} />
        <form className="ad-menu-form" onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>
          <Dropdown
            id="category"
            value={selectedCategory}
            options={categories}
            onChange={(e) => setSelectedCategory(e.value)}
            optionLabel="name"
            placeholder="Select a category"
            className="mb-3"
          />

          <label htmlFor="img">Image URL</label>
          <InputText
            id="img"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="Enter image URL"
            className="mb-3"
          />

          <label htmlFor="foodName">Food Name</label>
          <InputText
            id="foodName"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter food name"
            className="mb-3"
          />

          <label htmlFor="msg">Message</label>
          <InputText
            id="msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
            className="mb-3"
          />

          <label htmlFor="price">Price</label>
          <InputText
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="mb-3"
          />

          <Button type="submit" label="Add Item" className="p-button-warning" />
        </form>
      </div>
    </div>
  );
};

export default AdMenu;
