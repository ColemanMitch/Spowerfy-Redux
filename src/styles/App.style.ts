import styled from "styled-components";
import { device } from "./sizes";

export const AppTitleNonFixed = styled.h1`
text-align: center;
`;

export const AppBody = styled.div`
padding-top: 75px;
background: linear-gradient(-45deg, #e4b4a4, #e9bbcd, #77c0b0, #7db6aa);
background-size: 400% 400%;
-webkit-animation: gradient 15s ease infinite;
animation: gradient 15s ease infinite;
display: flex !important;
flex-direction: column;
justify-content: center !important;
`;

export const AppContainer = styled.div`
`;

export const PartyTime = styled(AppBody)`
height: 100%;
padding-top: 0 !important;
margin-bottom: 50px;
display: block;
text-align: center;
`;

export const AlbumArt = styled.img`
    @media ${device.tablet} {
        height: 400px;
    }
    @media ${device.mobileM} {
        height: 300px;
    }
    height: 200px;
`;
