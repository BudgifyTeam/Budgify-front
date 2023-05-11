import React from "react";
import "./AppComponents.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <img
        id="userImage"
        src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/userimage.jpg?alt=media&token=df5dc86a-c48e-4786-9501-565b2ad15134"
        alt="Descripción de la imagen"
      />
      <span class="numero">$10,00</span>
    </header>
  );
}
export function BudgetValue() {
  return (
    <div id="budgetCounter">
      <table>
        <tr>
          <td rowspan="2">
            <img
              id="bagImage"
              src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/bag.jpg?alt=media&token=a9251f1f-7000-4ca3-b794-9f9e72819bf9"
              alt="Descripción de la imagen"
            />
          </td>
          <td>
            <span id="budgetValue">$100.000</span>
          </td>
        </tr>
        <tr>
          <td colspan="2" id="budgetSubtitle">Budget</td>
        </tr>
      </table>
    </div>
  );
}

export function WeekReview(){
  return(
    <div className="weekReviewContainer">
      <h3 id="weekReviewTitle">
        Week Review
      </h3>
      <hr/>
      Insertar la grafica
    </div>
  );
}
export function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/productos">Productos</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
