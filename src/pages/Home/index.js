import "./styles.css";
import background from "../../assets/background.png";
import { Header } from "../../components/Header";
import { ItemList } from "../../components/IntemList";
import { useState } from "react";

export function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newuser = await userData.json()

    if(newuser.name){
      const {avatar_url, name, bio, login, html_url} = newuser
      setCurrentUser({avatar_url, name, bio, login, html_url});

      const repoData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await repoData.json()

      if(newRepos.length);
      setRepos(newRepos);
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="Evebory">
        <div className="Background">
          <img src={background} className="Background-img" alt="git imagen"/>
        </div>
        <div className="Conteudo">
          <div className="Dados-ID">
            <div className="Info">
              <input 
                name="usuario" 
                type="text" 
                placeholder="@username" 
                value={user} 
                onChange={event => setUser(event.target.value)} 
              />
              <button type="button" onClick={handleGetData}>Buscar</button>
            </div>
            {currentUser?.name ? (
              <>
            <div className="Profile">
              <img 
                src={currentUser.avatar_url} 
                className="Profile-img" 
                alt="profile" 
                />
              <div className="Dados">
                <h3>{currentUser.name}</h3>
                <span className="Arroba">
                  @{currentUser.login}
                </span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
              </>
            ): null}
          </div>
            {repos?.length ? (
              <div className="Repositorio">
                  <h4>
                    Repositórios
                  </h4>
                  {repos.map(repo => (
                    <ItemList title={repo.name} description={repo.description} url={repo.html_url} />
                  ))}
                </div>
            ): null}
        </div>
      </div>
    </div>
  );
}
