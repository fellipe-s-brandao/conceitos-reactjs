import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories",{
      title: "Projeto novo",
      url: "git.com",
      techs: "react",
    })

    const repositoy = response.data;

    setRepositories([...repositories, repositoy]);
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex((repositoy) => repositoy.id === id);
    await api.delete(`repositories/${id}`);
    
    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositoy) => (
          <li key={repositoy.id}> 
            {repositoy.title}
 
           <button onClick={() => handleRemoveRepository(repositoy.id)}>
             Remover
           </button>
         </li>
        ))}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
