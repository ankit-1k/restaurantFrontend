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
        "http://localhost:4000/check-availability", // Changed to GET request
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
        <div className="row g-3">
          {/* Name Input */}
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Your Name</label>
            </div>
          </div>

          {/* Email Input */}
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Your Email</label>
            </div>
          </div>

          {/* Date and Time Input */}
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="datetime-local"
                name="datetime"
                className="form-control"
                id="datetime"
                placeholder="Date & Time"
                value={formData.datetime}
                onChange={handleChange}
                required
              />
              <label htmlFor="datetime">Date & Time</label>
            </div>
          </div>

          {/* Phone Input */}
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                name="phone"
                className="form-control"
                id="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
          </div>

          {/* People Select */}
          <div className="col-md-6">
            <div className="form-floating">
              <select
                name="people"
                className="form-select"
                id="people"
                value={formData.people}
                onChange={handleChange}
                required
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
              </select>
              <label htmlFor="people">Number of People</label>
            </div>
          </div>

          {/* Duration Select */}
          <div className="col-md-6">
            <div className="form-floating">
              <select
                name="duration"
                className="form-select"
                id="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
              </select>
              <label htmlFor="duration">Reservation Duration</label>
            </div>
          </div>

          {/* Special Request */}
          <div className="col-12">
            <div className="form-floating">
              <textarea
                name="specialRequest"
                className="form-control"
                id="specialRequest"
                placeholder="Special Request"
                value={formData.specialRequest}
                onChange={handleChange}
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="specialRequest">Special Request</label>
            </div>
          </div>

          {/* Table Selection (Readonly) */}
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

          {/* Submit Button */}
          <div className="col-12">
            <button className="btn btn-primary w-100 py-3" type="submit">
              Book Now
            </button>
          </div>
        </div>
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
              {Array.from({ length: 10 }, (_, index) => index + 1).map((tableNumber) => (
                <div key={tableNumber} className={`table-option ${bookedTables.includes(tableNumber) ? "booked" : ""}`}>
                  <input
                    type="checkbox"
                    id={`table${tableNumber}`}
                    onChange={() => handleTableSelection(tableNumber)}
                    disabled={bookedTables.includes(tableNumber)} // Disable if booked
                  />
                  <label htmlFor={`table${tableNumber}`}>Table {tableNumber}</label>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => checkTableAvailability()}>
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
