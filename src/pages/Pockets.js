import React, { useState } from "react";
import { Footer, Header } from "../components/AppComponents";

function Pockets() {
  const [budgetValue, setBudgetValue] = useState(() => {
    setBudgetValue(0);
    const storedValue = localStorage.getItem("budgetValue");
    return storedValue ? parseInt(storedValue) : 0;
  });
  const [image, setImage] = useState();

  setImage(
    "https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/userimage.jpg?alt=media&token=df5dc86a-c48e-4786-9501-565b2ad15134"
  );

  return (
    <div className="dashboardContainer">
      <Header budgetValue={budgetValue} image={image} />
      <div>
        <>Pockets</>
      </div>
      <Footer />
    </div>
  );
}

export default Pockets;
