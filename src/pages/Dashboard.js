import React, {useEffect, useState}from "react";
import {
  Footer,
  Header,
  BudgetValue,
  WeekReview,
  OperationMenu,
} from "../components/AppComponents";


function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = 1000;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <Header title="Budgify" />
      <div>
        <BudgetValue />
        <WeekReview />
      </div>
      <OperationMenu />
      <Footer />
    </div>
  );
}

export default Dashboard;




