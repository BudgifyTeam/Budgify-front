import React, { useEffect, useState } from "react";
import { GetWalletsRequest } from "../api/WalletAPI";
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
          <div className="popup">
            <img
              className="loadingGif"
              src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Loading.gif?alt=media&token=0d3075d1-5568-43d8-952d-0fb19567037c"
              alt=""
            ></img>
          </div>
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
