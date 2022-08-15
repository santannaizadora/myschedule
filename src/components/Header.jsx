import styled from "styled-components";
import { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { Link } from "react-router-dom";

export default function Header() {

  const { token } = useContext(TokenContext);

  return (
    <HeaderContainer className="header">
      <LogoText>
        <span>My</span>Schedule
      </LogoText>
      {token !== "" 
      ? 
      <Options onClick={
        () => {
          const confirm = window.confirm("Deseja realmente sair?") 
          if (confirm) {
            localStorage.removeItem("token")
            window.location.reload()
          }
        }
      }>Sair</Options>
    : <OptionsContainer>
      <Options><Link to="/">Login</Link></Options>
      <Options><Link to="/register">Cadastre-se</Link></Options>
    </OptionsContainer>
    }
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding: 10px;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #fff;
  height: 40px;
`;

const LogoText = styled.p`
  font-family: var(--secondary-font);
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  span {
    color: var(--primary-color);
  }
`;

const Options = styled.p`
    font-family: var(--main-font);
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 17px;
    text-align: center;
    margin-right: 10px;

    :hover {
        cursor: pointer;
    }

    a {
        color: var(--primary-color);
        text-decoration: none;
        font-family: var(--main-font);
    }
`;

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
`;