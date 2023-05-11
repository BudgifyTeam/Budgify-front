import React from "react";
import {
  Footer,
  Header,
  BudgetValue,
  WeekReview, OperationMenu
} from "../components/AppComponents";

function Dashboard() {
  return (
    <div className="dashboardContainer">
      <Header />
      <div>
        <BudgetValue />
        <WeekReview />
      </div>
      <OperationMenu/>
      <Footer />
    </div>
  );
}
export default Dashboard;
