import { LOGIN_URL, LOGIN_URL_LOCAL } from "../config/constants";
import { SignInButton, LoginAppBody, InstructionsAndButton, Title, Subtitle } from "../styles/Login.style";

const Login = () => {
  return <LoginAppBody>
    <InstructionsAndButton>
      <Title>Spowerfy 🍺</Title>
      <Subtitle>Let's get this party started 🎉 <br></br>
       Click the button below to authenticate Spowerfy with your Spotify account! 👇</Subtitle>
      <SignInButton onClick={() => {
          window.location.assign(window.location.href.includes('localhost') 
          ? LOGIN_URL_LOCAL 
          : LOGIN_URL) 
        }
      }>
        Sign in with Spotify
      </SignInButton>
    </InstructionsAndButton>
  </LoginAppBody>;
}

export default Login;
