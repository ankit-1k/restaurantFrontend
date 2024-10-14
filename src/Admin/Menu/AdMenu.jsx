import React, { useEffect, useState } from "react";
import AdHeader from "../header/AdHeader";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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

    if (!selectedCategory || !imgUrl || !foodName || !message || !price) {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "All fields are required!",
      });
      return; 
    }

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
      const response = await axios.post(
        "http://localhost:4000/api/postmenu",
        menuItem
      );

      if (response.status === 201) {
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "Menu item added!",
        });
        setSelectedCategory(null);
        setImgUrl("");
        setFoodName("");
        setMessage("");
        setPrice("");
      }
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || error.message,
      });
    }
  };
  // get
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/orders");
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const itemTemplate = (rowData) => {
    return (
      <ul>
        {rowData.items.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    );
  };
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:4000/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  const actionTemplate = (rowData) => {
    return (
      <Button
        label="Delete"
        icon="pi pi-times"
        severity="danger"
        onClick={() => handleDelete(rowData._id)}
      />
    );
  };

  return (
    <>
      <AdHeader />
      <TabView>
        <TabPanel header="Add Items">
          <div className="ad-menu-container">
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

                <Button
                  type="submit"
                  label="Add Item"
                  className="p-button-warning"
                />
              </form>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="View Items">
          <DataTable
            value={orders}
            paginator
            rows={10}
            responsiveLayout="scroll"
          >
            <Column field="name" header="Name" />
            <Column field="table" header="Table" />
            <Column body={itemTemplate} header="Items" />
            <Column
              field="total"
              header="Total"
              body={(rowData) => `$${rowData.total.toFixed(2)}`}
            />
            <Column header="Actions" body={actionTemplate} />
          </DataTable>
        </TabPanel>
      </TabView>
    </>
  );
};

export default AdMenu;
