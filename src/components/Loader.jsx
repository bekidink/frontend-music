import React from 'react'
import styled from "@emotion/styled";
import PropagateLoader from "react-spinners/PropagateLoader";
const LoadingContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
`;
export default function Loader() {
return (
    <LoadingContainer>
    <PropagateLoader color="#3b82f6"/>
</LoadingContainer>
)
}
