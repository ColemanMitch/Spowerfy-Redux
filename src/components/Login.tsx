import styled from "styled-components";
import { AppTitleNonFixed } from "../App";
import { LOGIN_URL, LOGIN_URL_LOCAL } from "../config/constants";

const SignInButton = styled.button`
  font-family: Proxima Nova;
  font-size: 20px;
  background-color: #1ed05e;
  color: white;
  border: #c9c9c9 solid 1px;
  border-radius: 15px;
  margin-top: 100px;
  height: 40px !important;
  width: 250px;
  align-items: center;
  align-self: center;

  margin: 0;
  position: absolute;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const LoginAppBody = styled.div`
  flex-direction: row;
  align-items: center;
  padding-bottom: 50%;
  height: 100%;
  background: linear-gradient(-45deg, #e4b4a4, #e9bbcd, #77c0b0, #7db6aa);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
`;

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
