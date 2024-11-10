import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import "./report.css";
import AdHeader from "../header/AdHeader";
import MonthlyReports from "./monthly/MonthlyReports";
import WeeklyReports from "./WeeklyReports/WeeklyReports";
import YearlyReport from "./yearly/YearlyReport";
import reportImg from "./../../assets/img/reports.gif";

const Report = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <AdHeader />
      <div className="container">
        <p
          className="mt-3 lead fw-bold text-end pointer info-text"
          onClick={() => setVisible(true)}
        >
          Booking Sales Report Info{" "}
          <i className="pi pi-info-circle text-info"></i>
        </p>
        <div className="row mt-3">
          <div className="col-md-6">
            <img src={reportImg} alt="" className="reportImg" />
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
      <Dialog
        header="Header"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      ></Dialog>
    </>
  );
};

export default Report;
