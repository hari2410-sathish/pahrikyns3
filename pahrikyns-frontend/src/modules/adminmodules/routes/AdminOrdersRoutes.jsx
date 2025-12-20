import { Routes, Route } from "react-router-dom";

import AllOrders from "../pages/Orders/AllOrders";
import AddOrder from "../pages/Orders/AddOrder";
import OrderDetails from "../pages/Orders/OrderDetails";
import SearchOrders from "../pages/Orders/SearchOrders";
import ExportOrders from "../pages/Orders/ExportOrders";
import DraftOrders from "../pages/Orders/DraftOrders";
import Shipments from "../pages/Orders/Shipments";
import GiftCertificates from "../pages/Orders/GiftCertificates";

export default function AdminOrdersRoutes() {
  return (
    <Routes>
      <Route index element={<AllOrders />} />
      <Route path="add" element={<AddOrder />} />
      <Route path=":orderId" element={<OrderDetails />} />
      <Route path="search" element={<SearchOrders />} />
      <Route path="export" element={<ExportOrders />} />
      <Route path="drafts" element={<DraftOrders />} />
      <Route path="shipments" element={<Shipments />} />
      <Route path="gift-certificates" element={<GiftCertificates />} />
    </Routes>
  );
}
