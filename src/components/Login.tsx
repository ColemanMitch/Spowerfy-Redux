import { AppTitleNonFixed } from "../App";
import { LOGIN_URL, LOGIN_URL_LOCAL } from "../config/constants";
import { SignInButton, LoginAppBody } from "../styles/Login.style";

const Login = () => {
  return <LoginAppBody>
    <header>
      <AppTitleNonFixed>Spowerfy 🍺</AppTitleNonFixed>
    </header>
    <SignInButton onClick={() => {
        window.location.assign(window.location.href.includes('localhost') 
        ? LOGIN_URL_LOCAL 
        : LOGIN_URL) 
      }
    }>
      Sign in with Spotify
    </SignInButton>
  </LoginAppBody>;
}

export default Login;
