import React from "react";
import ReactDom from "react-dom/client"; 

const root = ReactDom.createRoot(document.getElementById("root"));

function App() {
  return (
    <div>
      <header>
        <h1>Título de la página</h1>
      </header>
      <main>
        <p>Contenido de la página</p>
      </main>
      <footer>
        <p>Derechos de autor © 2023 - Nombre de la empresa</p>
      </footer>
    </div>
  );
}


root.render(
  <>
    <App/>
  </>
); 