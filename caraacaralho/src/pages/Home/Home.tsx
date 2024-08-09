import {  useState } from 'react';
import '../../App.css'

import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../context/UserContext';


export function Home() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const { setCopy } = useGlobalContext()




  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert(`Você será chamado de: ${nickname}`);

    setCopy(nickname)
    // Aqui você pode adicionar lógica adicional, como salvar o nome em algum estado global ou redirecionar para outra página
    navigate('/game')
  };

  return (
    <>
      <h1 className="title">CARA A CARALHO</h1>
      <div className="home-container">
        <form onSubmit={handleSubmit} className="nickname-form">
          <label className="form-label">
            Como você quer ser chamado?
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Digite seu nome"
              className="form-input"
              required
            />
          </label>
          <button type="submit" className="form-button">Salvar Nome</button>
        </form>
      </div>
    </>
  );
}
