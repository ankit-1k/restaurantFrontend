import React, { useState } from "react";

const Menu = () => {
  const [cart, setCart] = useState([]); // Cart state to store added items
  const foodMenu = [
    {
      category: "Breakfast",
      items: [
        {
          img: "https://up.yimg.com/ib/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&pid=Api&rs=1&c=1&qlt=95&w=163&h=101",
          name: "Margherita Pizza",
          message:
            "A delicious classic pizza with fresh mozzarella, basil, and tomato sauce.",
          price: "$12.99",
        },
        {
          img: "https://up.yimg.com/ib/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&pid=Api&rs=1&c=1&qlt=95&w=163&h=101",
          name: "Caesar Salad",
          message:
            "Crispy romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
          price: "$8.99",
        },
      ],
    },
    {
      category: "Lunch",
      items: [
        {
          img: "https://up.yimg.com/ib/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&pid=Api&rs=1&c=1&qlt=95&w=163&h=101",
          name: "Spaghetti Bolognese",
          message:
            "Traditional Italian pasta with a rich and savory meat sauce.",
          price: "$14.99",
        },
        {
          img: "https://up.yimg.com/ib/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&pid=Api&rs=1&c=1&qlt=95&w=163&h=101",
          name: "Grilled Salmon",
          message:
            "Grilled salmon served with a side of vegetables and lemon butter sauce.",
          price: "$18.99",
        },
      ],
    },
    {
      category: "Dinner",
      items: [
        {
          img: "https://up.yimg.com/ib/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&pid=Api&rs=1&c=1&qlt=95&w=163&h=101",
          name: "Chocolate Lava Cake",
          message:
            "Warm chocolate cake with a molten center, served with vanilla ice cream.",
          price: "$6.99",
        },
      ],
    },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Food Menu
            </h5>
            <h1 className="mb-5">Most Popular Items</h1>
          </div>
          <div
            className="tab-class text-center wow fadeInUp position-relative"
            data-wow-delay="0.1s"
          >
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                  data-bs-toggle="pill"
                  href="#tab-1"
                >
                  <i className="fa fa-coffee fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Popular</small>
                    <h6 className="mt-n1 mb-0">Breakfast</h6>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 pb-3"
                  data-bs-toggle="pill"
                  href="#tab-2"
                >
                  <i className="fa fa-hamburger fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Special</small>
                    <h6 className="mt-n1 mb-0">Lunch</h6>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 me-0 pb-3"
                  data-bs-toggle="pill"
                  href="#tab-3"
                >
                  <i className="fa fa-utensils fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Lovely</small>
                    <h6 className="mt-n1 mb-0">Dinner</h6>
                  </div>
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {foodMenu.map((category, index) => (
                <div
                  id={`tab-${index + 1}`}
                  className={`tab-pane fade show p-0 ${
                    index === 0 ? "active" : ""
                  }`}
                  key={index}
                >
                  <div className="row g-4">
                    {category.items.map((item, itemIndex) => (
                      <div className="col-lg-6" key={itemIndex}>
                        <div className="d-flex align-items-center">
                          <img
                            className="flex-shrink-0 img-fluid rounded"
                            src={item.img}
                            alt={item.name}
                            style={{ width: "80px" }}
                          />
                          <div className="w-100 d-flex flex-column text-start ps-4">
                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                              <span>{item.name}</span>
                              <span className="text-primary">{item.price}</span>
                            </h5>
                            <small className="fst-italic">{item.message}</small>
                          </div>
                        </div>
                        <button
                          className="btn btn-warning"
                          onClick={() => addToCart(item)}
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={`btn btn-outline-warning position-absolute end-0 top-0 mt-2`}
              data-bs-toggle="modal"
              data-bs-target="#seatModal"
            >
              <i className="bi bi-cart"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="modal fade" id="seatModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Cart</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mt-5">
                {cart.length === 0 ? (
                  <p>No items in the cart yet.</p>
                ) : (
                  <ul>
                    {cart.map((cartItem, cartIndex) => (
                      <li key={cartIndex}>
                        {cartItem.name} - {cartItem.price}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
