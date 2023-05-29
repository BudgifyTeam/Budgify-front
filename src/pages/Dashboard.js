import React, { useEffect, useState } from "react";
import {
  Footer,
  Header,
  BudgetValue,
  WeekReview,
  OperationMenu,
} from "../components/AppComponents";
import "./Dashboard.css"

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = 400;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="popup">
        <img
          className="loadingGif"
          src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Loading.gif?alt=media&token=0d3075d1-5568-43d8-952d-0fb19567037c"
          alt=""
        ></img>
      </div>
    );
  }
  return (
    <div>
      <Header title="Budgify" />
      <div className="dashboardBody">
        <BudgetValue />
        <WeekReview />
      </div>
      <OperationMenu />
      <Footer />
    </div>
  );
}

export default Dashboard;
