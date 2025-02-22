import './App.css';
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://tu-servidor.com/users/")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSearch = (query) => {
    fetch(`http://tu-servidor.com/users/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.raza} - {user.edad} años
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
