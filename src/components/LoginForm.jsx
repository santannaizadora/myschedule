import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { At, Key } from "phosphor-react";

import TokenContext from "../contexts/TokenContext";
import toastConfig from "../assets/toastify/toastConfig";

export default function LoginForm() {
  const { setToken } = useContext(TokenContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (formData) => {
    setIsSubmitting(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setIsSubmitting(false);
        navigate("/calendar");
      })
      .catch((err) => {
        toast.error(err.response.data.message, toastConfig);
        setIsSubmitting(false);
      });
  };

  const errorMessage = ({ messages }) =>
    messages &&
    Object.entries(messages).map(([type, message]) => (
      <Error className="error-message" key={type}>
        {message}
      </Error>
    ));

  const emailInput = {
    required: "O campo e-mail é obrigatório",
    pattern: {
      value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
      message: "Insira um e-mail válido",
    },
  };

  const passwordInput = {
    required: "O campo senha é obrigatório",
    minLength: {
      value: 8,
      message: "A senha deve ter no mínimo 8 caracteres",
    },
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputContainer submitting={isSubmitting}>
        <At size={25} color="#606068" weight="light" />
        <Input
          {...register("email", emailInput)}
          type="text"
          placeholder="E-mail"
          disabled={isSubmitting}
          autoComplete="off"
        />
        </InputContainer>
        
        <ErrorMessage errors={errors} name="email" render={errorMessage} />
        <InputContainer submitting={isSubmitting}>
        <Key size={25} color="#606068" weight="light" />
        <Input
          {...register("password", passwordInput)}
          type="password"
          placeholder="Senha"
          disabled={isSubmitting}
          autoComplete="off"
        />
        </InputContainer>
        <ErrorMessage errors={errors} name="password" render={errorMessage} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <ThreeDots color="#FFF" height={50} width={50} />
          ) : (
            "Entrar"
          )}
        </Button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 310px;
  height: 45px;
  background: var(--primary-color);
  border-radius: 4.63636px;
  border: none;
  color: #ffffff;
  font-size: 20px;
  opacity: ${(props) => (!props.disabled ? 1 : 0.5)};
  margin-top: 25px;
  font-family: var(--main-font), sans-serif;
`;

const InputContainer = styled.div`
    display: flex;
    width: 350px;
    height: 45px;
    border: 1px solid #d4d4d4;
    border-radius: 6px;
    margin-bottom: 8px;
    align-items: center;
    padding: 0 10px;
    background-color: ${(props) => (!props.submitting ? "#FFFFFF" : "#F2F2F2")};
`

const Input = styled.input`
  flex: 1;
  border: none;
  border-radius: 6px;
  margin-left: 10px;
  background: transparent;
  font-size: 18px;
  font-family: var(--main-font), sans-serif;
  outline: none;
  ::placeholder {
    color: #606068;
  }
`;
const Error = styled.p`
  color: var(--secondary-color);
  font-size: 14px;
  padding-bottom: 2px;
  font-family: var(--main-font), sans-serif;
`;
