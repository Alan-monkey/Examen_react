import './App.css';
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://tu-servidor.com/users/")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error al obtener usuarios:", error));
  }, []);

  const handleSearch = (query) => {
    fetch(`http://tu-servidor.com/users/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error en la búsqueda:", error));
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <SearchBar onSearch={handleSearch} />
      
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.raza || "N/A"}</td>
                <td>{user.edad || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-results">No hay coincidencias</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
