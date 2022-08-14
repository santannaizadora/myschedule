import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer className="header">
      <LogoText>
        <span>My</span>Schedule
      </LogoText>
      <Logout
        onClick={() => {
            let sair = window.confirm("Deseja realmente sair?");
            if(sair){
                localStorage.removeItem("token");
                window.location.href = "/";
            }
        }
        }
      >
        Sair
      </Logout>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding: 10px;
  justify-content: space-between;
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

const Logout = styled.p`
    font-family: var(--main-font);
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 17px;
    text-align: center;

    :hover {
        cursor: pointer;
    }
`;
