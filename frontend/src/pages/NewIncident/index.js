import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api"
import logoImg from "../../assets/logo.svg";
import "./styles.css"

export default function NewIncident(){
  const [titulo, setTitulo] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      titulo,
      description,
      value,
    };
    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push("/profile")
    } catch(err){
      alert("Erro ao cadastrar caso, tente novamente")
    }
  }


  return(
      <div className="new-incident-container">
        <div className="content">
            <section>
              <img src={logoImg} alt="Be the hero"/>
              <h1>Cadastrar novo caso</h1>
              <p>Descreva o caso detalhadamente para encontrar o herói que irá resolver isso.</p>
              <Link className="back-link" to="/profile">
                  <FiArrowLeft size={16} color="#E02041" />
                  Voltar para Home
              </Link>
            </section>
            <form onSubmit={handleNewIncident}>
              <input 
                placeholder="Titulo do caso" required
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                />
              <textarea 
                placeholder="Descrição" required
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
              <input 
                placeholder="Valor em reais" required
                value={value}
                onChange={e => setValue(e.target.value)}
                />
              <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>  
  )
}