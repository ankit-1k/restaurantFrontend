import React from "react";
import "./report.css";
import AdHeader from "../header/AdHeader";
import MonthlyReports from "./monthly/MonthlyReports";
import WeeklyReports from "./WeeklyReports/WeeklyReports";
import YearlyReport from "./yearly/YearlyReport";
import reportImg from './../../assets/img/reports.gif'

const Report = () => {
  return (
    <>
      <AdHeader />
      <div className="container">
      <p className="mt-3 lead fw-bold text-end">Booking Sales Report Info <i className="pi pi-info-circle"></i></p>
        <div className="row mt-3">
          <div className="col-md-6">
              {/* <i className="pi pi-info fw-bold border p-1 rounded-pill border-success text-success ms-2"></i> */}
              <img src={reportImg} alt="" className="reportImg"/>
          </div>
          <div className="col-md-6">
            <h5 className="text-muted">Sales Weekly Reports :</h5>
            <WeeklyReports />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5 className="text-muted">Sales Monthly Report :</h5>
            <MonthlyReports />
          </div>
          <div className="col-md-6">
            <h5 className="text-muted">Sales Yearly Report :</h5>
            <YearlyReport />
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
