import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import './header.css';
import { useNavigate } from "react-router-dom";

const AdHeader = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn'); 
    navigate('/adminlogin'); 
  };
  return (
    <div>
      {/* Top Bar */}
      <div className="ad-header">
        <h1 className="ad-title text-white">TestOn Admin</h1>
        <Button icon="pi pi-bars" className="bg-white text-dark border-0" onClick={() => setVisible(true)} />
      </div>

      {/* Sidebar */}
      <Sidebar visible={visible} onHide={() => setVisible(false)} className="ad-sidebar">
        <h2 className="ad-sidebar-title">Menu</h2>
        <ul className="ad-menu">
          <li className="ad-menu-item">Dashboard</li>
          <li className="ad-menu-item" onClick={()=>navigate('/adminmenu')}>Menu</li>
          <li className="ad-menu-item" onClick={()=>navigate('/admintable')}>Table Book</li>
          <li className="ad-menu-item">Reports</li>
          <button className='ad-button' onClick={handleLogout}>Logout</button> 
        </ul>
      </Sidebar>
    </div>
  );
};

export default AdHeader;
