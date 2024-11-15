import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "./header.css";
import { useNavigate } from "react-router-dom";

const AdHeader = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/adminlogin");
  };
  return (
    <div>
      {/* Top Bar */}
      <div className="ad-header">
        {/* <h1 className="ad-title text-white">TestOn Admin</h1> */}
        <h3 class="text-primary m-0 text-white">
          <i class="fa fa-utensils ad-title me-2"></i>TasteOn
        </h3>
        <Button
          icon="pi pi-bars"
          className="bg-white text-dark border-0"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Sidebar */}
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="ad-sidebar"
      >
        <h2 className="ad-sidebar-title">
          <i class="fa fa-utensils ad-title me-2"></i>TasteOn
        </h2>
        <ul className="ad-menu">
          <li className="ad-menu-item">Dashboard</li>
          <li className="ad-menu-item" onClick={() => navigate("/adminmenu")}>
            Menu
          </li>
          <li className="ad-menu-item" onClick={() => navigate("/admintable")}>
            Table Book
          </li>
          <li className="ad-menu-item" onClick={() => navigate("/reports")}>
            Reports
          </li>
          <li className="ad-menu-item" onClick={() => navigate("/weekreports")}>Menu Reports</li>
          <button className="ad-button mt-2" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </Sidebar>
    </div>
  );
};

export default AdHeader;
