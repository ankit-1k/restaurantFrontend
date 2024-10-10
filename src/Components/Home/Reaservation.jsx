import React, { useEffect, useState } from "react";
import axios from "axios";

const Reservation = () => {
  const [tblArr, setTblArr] = useState([]);
  const [bookedTables, setBookedTables] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    datetime: "",
    phone: "",
    table: [],
    people: 1,
    duration: 1,
    specialRequest: "",
  });

  useEffect(() => {
    if (formData.datetime && formData.duration) {
      checkTableAvailability();
    }
  }, [formData.datetime, formData.duration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkTableAvailability = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/check-availability",
        {
          params: {
            datetime: formData.datetime,
            duration: formData.duration,
          },
        }
      );
      setBookedTables(response.data.bookedTables || []);
    } catch (error) {
      console.error("Error checking table availability", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reservationData = { ...formData, table: tblArr };
      await axios.post("http://localhost:4000/reservations", reservationData);
      alert("Reservation successful!");
    } catch (error) {
      console.error("Error saving reservation", error);
      alert("Failed to save reservation");
    }
  };

  const handleTableSelection = (tableNumber) => {
    if (!bookedTables.includes(tableNumber)) {
      setTblArr((prevTblArr) =>
        prevTblArr.includes(tableNumber)
          ? prevTblArr.filter((tbl) => tbl !== tableNumber)
          : [...prevTblArr, tableNumber]
      );
    }
  };

  return (
    <div>
      {/* Reservation Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="datetime" className="form-label">Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="datetime"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration (hours)</label>
          <input
            type="number"
            className="form-control"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <div className="form-floating">
            <input
              type="text"
              name="table"
              className="form-control"
              id="table1"
              placeholder="Selected Tables"
              value={tblArr.join(", ")} // Display the selected tables
              readOnly
            />
            <label htmlFor="table1">Selected Tables</label>
            <button
              type="button"
              className="btn btn-outline-secondary mt-2"
              data-bs-toggle="modal"
              data-bs-target="#seatModal"
            >
              View Tables
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Reserve</button>
      </form>

      {/* Modal for seat selection */}
      <div className="modal fade" id="seatModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Your Tables</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-wrap justify-content-center">
                {Array.from({ length: 10 }, (_, index) => index + 1).map((tableNumber) => (
                  <i
                    key={tableNumber}
                    className={`bi bi-tablet ${
                      tblArr.includes(tableNumber)
                        ? "text-primary"
                        : bookedTables.includes(tableNumber)
                        ? "text-danger"
                        : ""
                    }`}
                    style={{
                      fontSize: "2rem",
                      cursor: bookedTables.includes(tableNumber)
                        ? "not-allowed"
                        : "pointer",
                      padding: "10px",
                      border: tblArr.includes(tableNumber)
                        ? "2px solid blue"
                        : bookedTables.includes(tableNumber)
                        ? "2px solid red"
                        : "1px solid gray",
                      borderRadius: "5px",
                      margin: "10px",
                    }}
                    onClick={() => handleTableSelection(tableNumber)}
                    // Disable the table if already booked
                  ></i>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={checkTableAvailability}>
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
