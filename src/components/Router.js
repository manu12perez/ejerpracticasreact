import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import SeleccionarContinente from "./SeleccionarContinente";
import PaisSeleccionado from "./PaisSeleccionado";

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SeleccionarContinente />} />
          <Route path="/pais" element={<PaisSeleccionado />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
