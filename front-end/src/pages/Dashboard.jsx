import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axiosInstance from "../components/AxiosInstance";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    handleFetchDashboardData();
  }, []);

  const handleFetchDashboardData = async () => {
    const response = await axiosInstance.get("/dashboard");
    if (response.data) {
      setDashboardData(response.data.result);
    }
  };

  const barChartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: dashboardData.topProductStock
          ? dashboardData?.topProductStock.map((value) => value[0])
          : [],
      },
    },
    series: [
      {
        name: "Quantity",
        data: dashboardData.topProductStock
          ? dashboardData?.topProductStock.map((value) => value[1])
          : [],
        // data: [1,2,3],
      },
      // {
      //   name: "price",
      //   data: dashboardData.topProductStock.map((value) => value[2]),
      // },
    ],
  };

  const lineChartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: dashboardData.totalSalesAndPurchase
          ? dashboardData?.totalSalesAndPurchase.map((value) => value.name)
          : [],
      },
    },
    series: [
      {
        name: "Type",
        data: dashboardData.totalSalesAndPurchase
          ? dashboardData?.totalSalesAndPurchase.filter((value) => value.type === 'purchase').map((value) => value.amount)
          : [],
      },
      {
        name: "Price",
        data: dashboardData.totalSalesAndPurchase
          ? dashboardData?.totalSalesAndPurchase.filter((value) => value.type === 'sale').map((value) => value.amount)
          : [],
      },
    ],
  };

  const dognutChartData = {
    labels: dashboardData.totalCategoryStock
      ? dashboardData.totalCategoryStock.map((value) => value.category_name)
      : [],
    datasets: [
      {
        label: "Quantity",
        data: dashboardData.totalCategoryStock
          ? dashboardData.totalCategoryStock.map(
              (value) => value.product_quantity
            )
          : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4  p-4 ">
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          {/* <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div> */}

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Sales
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                ${dashboardData.totalSales || 0}
              </span>

              {/* <span className="text-xs text-gray-500"> from $240.94 </span> */}
            </p>
          </div>
        </article>

        <article className="flex flex-col  gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          {/* <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div> */}

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Purchase
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                ${dashboardData.totalPurchase || 0}{" "}
              </span>

              {/* <span className="text-xs text-gray-500"> from $404.32 </span> */}
            </p>
          </div>
        </article>
        <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Products
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                {dashboardData.totalProducts || 0}{" "}
              </span>

              {/* <span className="text-xs text-gray-500"> from $404.32 </span> */}
            </p>
          </div>
        </article>
        <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Stores
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                {dashboardData.totalStores || 0}{" "}
              </span>

              {/* <span className="text-xs text-gray-500"> from 0 </span> */}
            </p>
          </div>
        </article>
        <div className="flex flex-wrap bg-white rounded-lg py-8 col-span-full justify-around">
          <div>
            <h1 className="text-3xl mb-5"> Top Products </h1>
            <Chart
              options={barChartData.options}
              series={barChartData.series}
              type="bar"
              width="500"
            />
          </div>
          <div>
            <h1 className="text-3xl mb-5">Total Category</h1>
            <Doughnut data={dognutChartData} />
          </div>
          <div className="mt-20">
            <h1 className="text-3xl mb-5">Total Category</h1>
            <Chart
              options={lineChartData.options}
              series={lineChartData.series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
