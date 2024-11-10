import React from "react";
import Weekly from "./Weekly/Weekly";
import AdHeader from "../header/AdHeader";
import Monthly from "./monthly/Monthly";
import Yearly from "./yearly/Yearly";
import reportImg from "../../assets/img/reports.gif"; // Assuming reportImg is imported here

const MenuReports = () => {
  return (
    <div>
      <AdHeader />
      <div className="container">
        <p className="mt-3 lead fw-bold text-end">Food Sales Report Info <i className="pi pi-info-circle"></i></p>
        <div className="row mt-">
          <div className="col-md-6">
            <img src={reportImg} alt="Report" className="reportImg" />
          </div>
          <div className="col-md-6">
            <h5 className="text-muted">Sales Weekly Reports :</h5>
            <Weekly />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5 className="text-muted">Sales Monthly Report :</h5>
            <Monthly />
          </div>
          <div className="col-md-6">
            <h5 className="text-muted">Sales Yearly Report :</h5>
            <Yearly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuReports;

// https://chatgpt.com/share/672fba69-0fd8-800d-b368-83c8831ee907
