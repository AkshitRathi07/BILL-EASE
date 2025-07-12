import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  BarsOutlined,
  FilePdfOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;
import { useSelector } from "react-redux";
import { useAuth } from "./AuthContext";

const Home = ({ children }) => {
  const cart = useSelector((state) => state.cart.value);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const { logout } = useAuth();
  useEffect(() => {
    "";
    const roleDetermine = async () => {
      try {
        let token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8081/api/manageRole", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const data = await response.json();
        console.log(data.data.role, " your role is");
        setRole(data.data.role);
      } catch (error) {
        console.log(error);
      }
    };
    roleDetermine();
  }, []);
  const handleKey = (k) => {
    console.log(String(k.key));

    if (k.key == String(1)) {
      console.log("you are 1");
      navigate("/");
    }
    if (k.key == String(2)) {
      console.log("you are 2");
      navigate("/CartPage");
    }

    if (k.key == String(4)) {
      console.log("you are 4");
      navigate("/AddItemList");
    }

    if (k.key == String(3)) {
      console.log("you are 3");
      navigate("/AllBillsPage");
    }
    if (k.key == String(7)) {
      console.log("you are 7");
      navigate("/manageStore");
    }
    if (k.key == String(6)) {
      console.log("you are 6");
      logout();
      navigate("/login");
    }

    if (k.key == String(9)) {
      console.log("you are 9");
      logout();
      navigate("/createStoreManager");
    }
    
  };
  return (
    <>
      {/* <button >count</button> */}
      <Layout className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sider
          className="shadow-2xl border-r border-gray-200 bg-gradient-to-b from-blue-600 to-blue-700"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="logo" />
          <h1 className="flex justify-center text-2xl mt-8 text-white font-bold tracking-wide">
            {collapsed ? "POS" : "POS System"}
          </h1>
          <Menu
            theme="dark"
            className="mt-12 pb-56 mb-3 border-none bg-transparent"
            mode="inline"
            onClick={(key) => handleKey(key)}
            style={{
              background: "transparent",
              border: "none",
            }}
            items={[
              {
                key: "1",
                icon: <UserOutlined className="text-lg" />,
                label: "Home",
                className:
                  "hover:bg-blue-500 transition-all duration-200 rounded-lg mx-2 mb-1",
              },
              {
                key: "2",
                icon: <FilePdfOutlined className="text-lg" />,
                label: "Cart",
                className:
                  "hover:bg-blue-500 transition-all duration-200 rounded-lg mx-2 mb-1",
              },
              {
                key: "3",
                icon: <FilePdfOutlined className="text-lg" />,
                label: "Bills",
                className:
                  "hover:bg-blue-500 transition-all duration-200 rounded-lg mx-2 mb-1",
              },
              {
                key: "4",
                icon: <BarsOutlined className="text-lg" />,
                label: "Items",
                className:
                  "hover:bg-blue-500 transition-all duration-200 rounded-lg mx-2 mb-1",
              },
              {
                key: "5",
                icon: <UserOutlined className="text-lg" />,
                label: "Customers",
                className:
                  "hover:bg-blue-500 transition-all duration-200 rounded-lg mx-2 mb-1",
              },
              
              ...(role === "admin"
                ? [
                    {
                      key: "7",
                      icon : <LoadingOutlined  className="text-lg" />,
                      // icon: <UploadOutlined className="text-lg" />,
                      label: "Manage Stores",
                      className:
                        "hover:bg-red-500 transition-all duration-200 rounded-lg mx-2 mb-1",
                    },
                  ]
                : []),

              ...(role === "admin"
                ? [
                    {
                      key: "9",
                      icon: <UploadOutlined className="text-lg" />,
                      label: "Create Manager",
                      className:
                        "hover:bg-red-500 transition-all duration-200 rounded-lg mx-2 mb-1",
                    },
                  ]
                : []),

                {
                key: "6",
                icon: <UploadOutlined className="text-lg" />,
                label: "Logout",
                className:
                  "hover:bg-red-500 transition-all duration-200 rounded-lg mx-2 mb-1",
              }
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="bg-white shadow-lg border-b border-gray-200 flex flex-row justify-between items-center px-6"
            style={{
              padding: "0 24px",
              height: "80px",
              background: "white",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex items-center">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className:
                    "trigger text-xl text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer",
                  onClick: () => setCollapsed(!collapsed),
                  style: {
                    fontSize: "20px",
                    color: "#4B5563",
                  },
                }
              )}
              <span className="ml-4 text-lg font-semibold text-gray-800">
                Dashboard
              </span>
            </div>
            <div
              onClick={() => navigate("/CartPage")}
              className="relative px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center font-medium"
            >
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
                <span>Cart</span>
              </div>

              {/* Badge */}
              {cart > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full border-2 border-white px-2 py-1 text-xs font-bold shadow-lg animate-pulse">
                  {cart}
                </div>
              )}
            </div>
          </Header>
          <Content
            className="bg-gray-50 p-8"
            style={{
              margin: "0",
              padding: "32px",
              minHeight: "calc(100vh - 80px)",
              background: "#F9FAFB",
            }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 min-h-full">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Home;
