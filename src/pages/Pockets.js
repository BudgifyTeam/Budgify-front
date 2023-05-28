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
      <Header title="Pockets"/>
      <div>
        {isLoading ? (
          <h1>Cargando</h1>
        ) : (
          pockets.map((pocket, index) => (
            pocket.name === "default" ? null : (
              <PocketButton value={pocket} index={index} key={index} />
            )
          ))
        )}
        <AddPocketButton/>
      </div>
      <Footer />
    </div>
  );
}

export default Pockets;
