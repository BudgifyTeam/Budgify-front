import React, { useEffect, useState } from "react";
import { GetWalletsRequest } from "../api/DashboardAPI";
import { WalletButton, AddButton } from "../components/WalletsComponents";
import { Footer, Header } from "../components/AppComponents";
import "./Wallets.css";

function Wallets() {
  const [wallets, setWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetWalletsRequest()
      .then((responseData) => {
        setWallets(responseData.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="dashboardContainer">
      <Header title="Wallets" />
      <div className="WalletsContainer">
        {isLoading ? (
          <h1>Cargando</h1>
        ) : (
          wallets.map((wallet, index) => (
            <WalletButton value={wallet} index={index} key={index} />
          ))
        )}
        <AddButton />
      </div>
      <Footer />
    </div>
  );
}

export default Wallets;
