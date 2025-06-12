// app/dashboard/page.tsx

import ActivityFeed from "@/components/dashboard/ActivityFeed";
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";
import RevenueChart from "@/components/dashboard/RevenueChart";
import TotalStatCard from "@/components/dashboard/TotalStatCard";
// import { useUserStore } from "../store/useUserStore";
// import { Badge } from "@/components/ui/badge";

const activities = [
  {
    iconSrc: "/client-image.png",
    activity: "User signed in",
    time: new Date().toISOString(), // just now
  },
  {
    iconSrc: "/client-image.png",
    activity: "User uploaded a file",
    time: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
  },
  {
    iconSrc: "/client-image.png",
    activity: "User updated profile",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    iconSrc: "/client-image.png",
    activity: "User deleted account",
    time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    iconSrc: "/client-image.png",
    activity: "User deleted account",
    time: "2025-05-05T19:11:39.007Z",
  },
];

// Dummy product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$89.99",
    stock: 120,
    status: "pending",
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Sportswear",
    price: "$59.49",
    stock: 80,
    status: "processing",
  },
  {
    id: 3,
    name: "Coffee Maker",
    category: "Home Appliance",
    price: "$35.00",
    stock: 60,
    status: "pending",
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Gadgets",
    price: "$129.99",
    stock: 30,
    status: "cancelled",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Audio",
    price: "$45.25",
    stock: 200,
    status: "complete",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Audio",
    price: "$45.25",
    stock: 200,
    status: "complete",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-100 text-orange-500";
    case "processing":
      return "bg-purple-100 text-purple-500";
    case "cancelled":
      return "bg-red-100  text-red-500";
    case "complete":
      return "bg-green-100 text-green-500";

    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Home = () => {
  return (
    <div className="container">
      {/* Dashboard and date time and filter */}
      {/* TotalStat */}
      <div className="flex justify-between gap-2 ">
        <TotalStatCard
          total={123334}
          growthPercentage={1.3}
          icon="/user.svg"
          title="total users"
        />
        <TotalStatCard
          total={123334}
          growthPercentage={1.3}
          icon="/order.svg"
          title="total users"
        />
        <TotalStatCard
          total={123334}
          growthPercentage={1.3}
          icon="/dollar.svg"
          title="total users"
        />
        <TotalStatCard
          total={123334}
          growthPercentage={-1.3}
          icon="/product.svg"
          title="total products"
        />
      </div>
      {/* Graph */}
      <RevenueChart />
      <div className="grid grid-cols-4 justify-between items-stretch gap-2 ">
        {/* Recent Order table  */}
        <div className="col-span-3 font- p-2 w-full rounded-lg">
          <CustomTable>
            <CustomTableHeader>
              <CustomTableRow>
                <CustomTableHead>ID</CustomTableHead>
                <CustomTableHead>Product Name</CustomTableHead>
                <CustomTableHead>Category</CustomTableHead>
                <CustomTableHead>Price</CustomTableHead>
                <CustomTableHead>Stock</CustomTableHead>
                <CustomTableHead>Status</CustomTableHead>
              </CustomTableRow>
            </CustomTableHeader>
            <CustomTableBody>
              {products.map((product) => (
                <CustomTableRow key={product.id} variant="striped">
                  <CustomTableCell>{product.id}</CustomTableCell>
                  <CustomTableCell>{product.name}</CustomTableCell>
                  <CustomTableCell>{product.category}</CustomTableCell>
                  <CustomTableCell>{product.price}</CustomTableCell>
                  <CustomTableCell>{product.stock}</CustomTableCell>
                  <CustomTableCell className="capitalize">
                    <span
                      className={`${getStatusColor(
                        product.status
                      )} px-3 rounded-4xl py-1 font-semibold `}
                    >
                      {product.status}
                    </span>
                  </CustomTableCell>
                </CustomTableRow>
              ))}
            </CustomTableBody>
          </CustomTable>
        </div>
        {/* Activity Feed */}
        <div className="col-span-1 ">
          <div className="border-1 border-gray-300 p-2  rounded-lg">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 leading-6 mb-2">
                Activity Feed
              </h1>
              <p className="text-gray-600 text-sm font-normal leading-6 mb-5">
                Recent Activites in your admin panel.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {activities.slice(0, 3).map((item, index) => (
                <ActivityFeed
                  key={index}
                  iconSrc={item.iconSrc}
                  activity={item.activity}
                  time={item.time}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
