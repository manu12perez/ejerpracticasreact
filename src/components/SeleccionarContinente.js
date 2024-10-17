import React, { Component } from "react";
import axios from "axios";

export default class SeleccionarContinente extends Component {
  //URL
  url = "https://restcountries.com/";

  selectContinente = React.createRef();

  state = {
    continentes: [],
    paises: [],
  };

  buscarPaises = (e) => {
    e.preventDefault();
    let continenteSeleccionado = this.selectContinente.current.value;
    let request = "v3.1/region/" + continenteSeleccionado;
    let urlContientes = this.url + request;
    axios.get(urlContientes).then((response) => {
      console.log(response.data);
      this.setState({
        paises: response.data,
      });
    });
  };

  loadPaises = () => {
    console.log("Antes del servicio");
    var request = "v3.1/all";
    var urlPaises = this.url + request;

    axios.get(urlPaises).then((response) => {
      console.log("Leyendo servicio");
      let paises = response.data;
      //crea un array de regiones únicas a partir de los objetos de país en response.data, eliminando duplicados utilizando un Set
      let contienteSinRepetir = [
        ...new Set(response.data.map((pais) => pais.region)),
      ];

      console.log(response.data);
      this.setState({
        paises: paises,
        continentes: contienteSinRepetir,
      });
    });
    console.log("Depués del servicio");
  };

  componentDidMount = () => {
    this.loadPaises();
  };

  render() {
    return (
      <div>
        <h1>Seleccionar Continente</h1>
        <form>
          <label>Seleccione Continente</label>
          <select ref={this.selectContinente}>
            {this.state.continentes.map((continente, index) => {
              return (
                <option key={index} value={continente}>
                  {continente}
                </option>
              );
            })}
          </select>
        </form>
        <button onClick={this.buscarPaises}>Buscar paises</button>
        <br />
        {this.state.paises.map((pais, index) => {
          return (
            <div key={index}>
              <a href="/pais">
                <img src={pais.flags.png} style={{ height: "200px", width: "200px" }}/> - {pais.name.common}
              </a>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}
