import { LOGIN_URL, LOGIN_URL_LOCAL } from "../config/constants";

const Login = () => {
  return (<div className="login-app-body">
    <header className="nonfixed-header">
      <h1 className="app-title-nonfixed">Spowerfy 🍺</h1>
    </header>
    <button id="sign-in-button" className="center" onClick={() => {
        window.location.assign(window.location.href.includes('localhost') 
        ? LOGIN_URL_LOCAL 
        : LOGIN_URL) 
      }
    }
    style={{'fontSize': '20px'}}>Sign in with Spotify</button>
  </div>);
}

export default Login;
