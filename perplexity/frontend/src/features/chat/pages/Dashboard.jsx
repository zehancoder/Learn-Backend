import React from "react";
import { useSelector } from "react-redux";
function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return <div>Dashboard</div>;
}

export default Dashboard;
