import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./report.css";
import AdHeader from "../header/AdHeader";
import MonthlyReports from "./monthly/MonthlyReports";
import WeeklyReports from "./WeeklyReports/WeeklyReports";
import YearlyReport from "./yearly/YearlyReport";
import reportImg from "./../../assets/img/reports.gif";

const Report = () => {

  return (
    <>
      <AdHeader />
      <div className="container">
        <p
          className="mt-3 lead fw-bold text-end pointer info-text">
          Booking Sales Report Info{" "}
          <i className="pi pi-info-circle text-info"></i>
        </p>
        <div className="row mt-3">
          <div className="col-md-6">
            <img src={reportImg} alt="" className="reportImg" />
          </div>
          <div className="col-md-6">
            <WeeklyReports />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <MonthlyReports />
          </div>
          <div className="col-md-6">
            <YearlyReport />
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
