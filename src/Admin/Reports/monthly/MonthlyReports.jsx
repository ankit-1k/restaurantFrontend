import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";
import moment from "moment";
import { Dialog } from "primereact/dialog";

const MonthlyReports = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [reservations, setReservations] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/deleted-reservations"
      );
      setReservations(response.data);
      processReservationsData(response.data);
    } catch (error) {
      console.error("Error fetching reservations", error);
    }
  };

  const processReservationsData = (data) => {
    // Create a dictionary to hold the count of reservations per month
    const monthsData = {
      [moment().subtract(3, "months").format("MMM YYYY")]: 0,
      [moment().subtract(2, "months").format("MMM YYYY")]: 0,
      [moment().subtract(1, "months").format("MMM YYYY")]: 0,
      [moment().format("MMM YYYY")]: 0,
    };

    // Count the reservations for each of the last 4 months
    data.forEach((reservation) => {
      const reservationMonth = moment(reservation.datetime).format("MMM YYYY");
      if (monthsData[reservationMonth] !== undefined) {
        monthsData[reservationMonth]++;
      }
    });

    // Prepare chart data
    const labels = Object.keys(monthsData);
    const values = Object.values(monthsData);

    const dataForChart = {
      labels: labels,
      datasets: [
        {
          label: "Monthly Booking",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    };

    setChartData(dataForChart);
    setChartOptions(options);
  };

  return (
    <>
      <p
        className="mt-3 lead fw-bold pointer info-text m-0 "
        onClick={() => setVisible(true)}
      >
        Sales Monthly Reports <i className="pi pi-info-circle text-info"></i>
      </p>

      <div className="card">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>

      <Dialog
        header="Sales Monthly Reports"
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

export default MonthlyReports;
