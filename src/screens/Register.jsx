import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/img/logo.png";

import RegisterForm from "../components/RegisterForm";

export default function Register() {

  return (
    <Container>
      <Image src={Logo} alt="logo" />
      <LogoText>
        <span>My</span>Schedule
      </LogoText>
      <RegisterForm key="loginForm" />
      <Login>
        <Link to="/">Já possui uma conta? Login</Link>
      </Login>
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
  margin-bottom: 30px;

  span {
    color: var(--primary-color);
  }
`;

const Login = styled.p`
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
