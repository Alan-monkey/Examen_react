import './App.css';
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", raza: "", edad: "" });

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

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("http://3.16.66.210:8000//users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers([...users, data]); // Agregar nuevo usuario a la lista
        setNewUser({ name: "", raza: "", edad: "" }); // Limpiar formulario
      })
      .catch((error) => console.error("Error al registrar usuario:", error));
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <SearchBar onSearch={handleSearch} />

      <h2>Registrar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newUser.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="raza"
          placeholder="Raza"
          value={newUser.raza}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={newUser.edad}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>

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
