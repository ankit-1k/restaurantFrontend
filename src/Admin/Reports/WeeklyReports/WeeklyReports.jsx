import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";
import moment from "moment";
import { Dialog } from "primereact/dialog";

const WeeklyReports = () => {
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
      setReservations(response)
    } catch (error) {
      console.error("Error fetching reservations", error);
    }
  };

  const processReservationsData = (data) => {
    // Get the start dates for the last 4 weeks
    const last4Weeks = [];
    for (let i = 0; i < 4; i++) {
      last4Weeks.push(moment().subtract(i, "weeks").startOf("week"));
    }

    // Initialize week data with labels and counts
    const weeksData = {};
    last4Weeks.reverse().forEach((weekStart, index) => {
      weeksData[weekStart.format("MMM D")] = 0;
    });

    // Count reservations within each week range
    data.forEach((reservation) => {
      const reservationDate = moment(reservation.datetime);
      last4Weeks.forEach((weekStart, index) => {
        const weekEnd = moment(weekStart).endOf("week");
        if (reservationDate.isBetween(weekStart, weekEnd, "day", "[]")) {
          const label = weekStart.format("MMM D");
          weeksData[label]++;
        }
      });
    });

    const labels = Object.keys(weeksData);
    const values = Object.values(weeksData);

    console.log(reservations)

    const dataForChart = {
      labels: labels,
      datasets: [
        {
          label: "Weekly Booking",
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
        Sales Weekly Reports <i className="pi pi-info-circle text-info"></i>
      </p>
      <div className="card">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>

      <Dialog
        header="Sales Weekly Reports"
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

export default WeeklyReports;
