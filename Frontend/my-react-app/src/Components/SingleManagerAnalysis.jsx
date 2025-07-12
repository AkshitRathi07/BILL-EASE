import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function SingleManagerAnalysis() {
  const { id } = useParams();
  const [total, setTotal] = useState(0);
  const [managerData, setManagerData] = useState([]);
  const [mrpList, setMrpList] = useState([]);
  const [downloadData, setDownlaodedData] = useState();

  const handleManager = (items) => {
    // Calculate total MRP
    console.log(items, "the list of item are ");
    const totalAmount = items.reduce((sum, item) => sum + item.Mrp, 0);
    setTotal(totalAmount);
    setManagerData(items);

    // Format data for chart
    const formattedData = items.map((item, index) => ({
      name: item.name || `Item ${index + 1}`,
      Mrp: item.Mrp,
    }));
    setMrpList(formattedData);
  };

  const downloadCSV = (downloadData, filename = "sales_data.csv") => {
    if (!downloadData || !downloadData.length) {
      console.error("No data to export.");
      return;
    }

    const headers = Object.keys(downloadData[0]).join(","); // column headers
    const rows = downloadData
      .map((item) => Object.values(item).join(","))
      .join("\n");

    const csvContent = [headers, rows].join("\n");

    // Create a blob
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: filename,
    });

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchSingleManager = async () => {
      let token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8081/api/ManagerAnalysis/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data?.ManagerData) {
        handleManager(data.ManagerData);
      }
      setDownlaodedData(data.managerData);
    };
    fetchSingleManager();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Manager Sales Analysis
            </h1>
            <p className="text-gray-600">Total Sales of your Manager</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-center mb-8">
            <div className="text-white">
              <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
              <div className="text-4xl font-bold">
                ₹{total.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Line Chart Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Sales Trend
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mrpList}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 80,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 22 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 14 }}
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `₹${value.toLocaleString()}`,
                      "Sales Amount",
                    ]}
                    labelStyle={{ color: "#374151" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Mrp"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "#3B82F6", strokeWidth: 2 }}
                    name="Sales Amount"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Detailed Sales Data
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Item
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {managerData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {item.ItemName || `Item ${index + 1}`}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        ₹{item.Mrp.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* {
  managerData.map((item,index)=>{
    return(
      <>
      <div key={index}>
        {item.CustomerName}
      </div>
      </>
    )
  })
} */}
          <div className="flex justify-center items-center p-6">
            <button
              onClick={() => downloadCSV(managerData)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border border-blue-500 hover:border-blue-400"
            >
              {/* Download Icon */}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>

              {/* Button Text */}
              <span className="relative z-10">Download Sales Data</span>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            <div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleManagerAnalysis;
