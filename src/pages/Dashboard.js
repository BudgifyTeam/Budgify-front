import React from "react";
import LogoutButton from "../components/LogOutButton";
import {Footer, Header, BudgetValue, WeekReview} from "../components/AppComponents";

function Dashboard() {
  return (
    <>
      <Header/>
      <div>
        <BudgetValue/>
        <WeekReview/>
        <p>Welcome to your Dashboard</p>
        <LogoutButton />
      </div>
      <Footer />
    </>
  );
}
export default Dashboard;
