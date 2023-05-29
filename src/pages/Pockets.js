import React, { useEffect, useState } from "react";
import { Footer, Header } from "../components/AppComponents";
import "./Pockets.css";
import { PocketButton } from "../components/PocketsComponents";
import { GetPocketsRequest } from "../api/PocketAPI";
import { AddPocketButton } from "../components/PocketsComponents";
function Pockets() {
  const [pockets, setPockets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetPocketsRequest()
      .then((responseData) => {
        setPockets(responseData.data);
        console.log(responseData.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="dashboardContainer">
      <Header title="Pockets" />
      <div className="PocketsListContainer">
        {isLoading ? (
          <div className="popup">
            <img
              className="loadingGif"
              src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Loading.gif?alt=media&token=0d3075d1-5568-43d8-952d-0fb19567037c"
              alt=""
            ></img>
          </div>
        ) : (
      
          pockets.map((pocket, index) =>
            pocket.name === "default" ? null : (
              <PocketButton value={pocket} index={index} key={index} />
            )
          )
        )}
        <AddPocketButton />
      </div>
      <Footer />
    </div>
  );
}

export default Pockets;
