import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/img/logo.png";

import LoginForm from "../components/LoginForm";
import TokenContext from "../contexts/TokenContext";

export default function Login() {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  useEffect(() => {
    token !== "" && navigate("/calendar");
  });

  return (
    <Container>
      <Image src={Logo} alt="logo" />
      <LogoText>
        <span>My</span>Schedule
      </LogoText>
      <Heading>Acesse sua conta</Heading>
      <LoginForm key="loginForm" />
      <Logon>
        <Link to="/register">Não possui uma conta ainda? Cadastre-se</Link>
      </Logon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--background-color);
`;

const Image = styled.img`
  height: 200px;
`;

const LogoText = styled.p`
  font-family: var(--secondary-font);
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 63px;
  text-align: center;
  margin-bottom: 20px;

  span {
    color: var(--primary-color);
  }
`;

const Heading = styled.h1`
  font-family: var(--main-font);
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #606068;
  padding-bottom: 8px;
`;

const Logon = styled.p`
  padding-top: 15px;
  font-family: var(--main-font);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  text-align: center;

  a {
    color: var(--primary-color);
    text-decoration: none;
    font-family: var(--main-font);
  }
`;
