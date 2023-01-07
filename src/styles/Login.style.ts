import styled from "styled-components";
import { MEDIUM } from "./sizes";

export const SignInButton = styled.button`
  font-family: Proxima Nova;
  font-size: 20px;
  background-color: #1ed05e;
  color: white;
  border: #c9c9c9 solid 1px;
  border-radius: ${MEDIUM};
  margin-top: 100px;
  height: 40px !important;
  width: 250px;
  align-items: center;
  align-self: center;

  position: absolute;
  left: 50%;
  -ms-transform: translate(-20%, -20%);
  transform: translate(-50%, -50%);
`;

export const LoginAppBody = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(-45deg, #e4b4a4, #e9bbcd, #77c0b0, #7db6aa);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 5s ease infinite;
`;

export const InstructionsAndButton = styled.div`
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 30%;
`;

export const Title = styled.h2`
  font-size: 5rem;
`;

export const Subtitle = styled.h3`
  font-size: 1.5rem;
`;
