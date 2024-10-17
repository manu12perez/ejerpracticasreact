import React, { Component } from "react";
import axios from "axios";

export default class ServiceCountries extends Component {
  //URL
  urlApi = "https://restcountries.com/v3.1/all";

  selectPais = React.createRef();

  state = {
    paises: [],
    paisSeleccionado: "",
  };

  loadPaises = () => {
    console.log("Antes del servicio");
    axios.get(this.urlApi).then((response) => {
      console.log("Leyendo servicio");
      let paises = response.data; // Guardamos los paises en una variable
      //console.log(response.data);
      this.setState({
        paises: paises,
      });
    });
    console.log("Después del servicio");
  };

  buscarPais = (e) => {
    e.preventDefault();
    let paisSeleccionado = this.selectPais.current.value;
    console.log(paisSeleccionado);
    this.setState({
      paisSeleccionado: paisSeleccionado,
    });
  };

  componentDidMount = () => {
    this.loadPaises();
  };

  render() {
    return (
      <div>
        <h1>Servicio Api Países</h1>
        <form>
          <label>Seleccione un país</label>
          <select ref={this.selectPais}>
            {this.state.paises.map((pais, index) => {
              return (
                <option key={index} value={pais.name.common}>
                  {pais.name.common}
                </option>
              );
            })}
          </select>
          <button onClick={this.buscarPais}>Buscar países</button>
        </form>

        {this.state.paises &&
          this.state.paises.map((pais, index) => {
            if (pais.name.common === this.state.paisSeleccionado) {
              return (
                <ul key={index}>
                  <li>Capital: {pais.capital} </li>
                  <li>Region: {pais.continents}</li>
                  <li>Imagen: <img src={pais.flags.png} style={{height:"200px", width:"200px"}}/></li>
                </ul>
              );
            }
            return null;
          })}
      </div>
    );
  }
}
