import React, { useEffect, useState } from "react";
import { GetWalletsRequest } from "../api/DashboardAPI";
import { WalletButton, AddButton } from "../components/WalletsComponents";
import { Footer, Header } from "../components/AppComponents";
import "./Wallets.css";

function Wallets() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    GetWalletsRequest()
      .then((responseData) => {
        setWallets(responseData.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="dashboardContainer">
      <Header title="Wallets" />
      <div className="WalletsContainer">
        {wallets.map((wallet, index) => (
          <WalletButton value={wallet} index={index} key={index} />
        ))}
        <AddButton />
      </div>
      <Footer />
    </div>
  );
}

export default Wallets;
