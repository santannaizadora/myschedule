import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import axios from "axios";
import TokenContext from "../contexts/TokenContext";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../assets/css/Calendar.css";
import "dayjs/locale/pt-br";
import toastConfig from "../assets/toastify/toastConfig";
import Header from "../components/Header";

export default function Agenda() {
  const { token } = useContext(TokenContext);

  const [monthAppointments, setMonthAppointments] = useState([]);
  const [dayAppointments, setDayAppointments] = useState([]);
  const [month, setMonth] = useState(dayjs().format("MM"));
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("month", monthAppointments);
  console.log("day", dayAppointments);

  const getDayAppointments = () => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/appointment/day/${date}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDayAppointments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getMonthAppointments = () => {
    if (token) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/appointment/month/${month}/${year}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setMonthAppointments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getMonthAppointments();
  }, [token, month, year]);

  useEffect(() => {
    getDayAppointments();
  }, [token, date]);

  const format = (date) => {
    let appointments = monthAppointments.filter(
      (appointment) =>
        appointment.date.split("T")[0] === dayjs(date).format("YYYY-MM-DD")
    );
    console.log("appointments", appointments);

    appointments.length > 0
      ? console.log(dayjs(appointments.date).format("YYYY-MM-DD"), date)
      : console.log("não tem agendamento");

    return (
      <DayFormat>
        <Day>
          {dayjs(date).locale("pt-br").format("MM") === month
            ? dayjs(date).locale("pt-br").format("DD") === "01"
              ? dayjs(date).locale("pt-br").format("MMM, DD")
              : dayjs(date).locale("pt-br").format("DD")
            : dayjs(date).locale("pt-br").format("MMM, DD")}
        </Day>
        <Appointments>
          {appointments.map((appointment) => {
            return (
              <Appointment key={appointment.id}>
                {appointment.title}
              </Appointment>
            );
          })}
        </Appointments>
      </DayFormat>
    );
  };

  const RegisterModal = () => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      display: "flex",
      flexDirection: "column",
      fontFamily: "Roboto",
    };

    const [appointment, setAppointment] = useState({
      title: "",
      observation: "",
      place: "",
      date: date,
      initial_time: "",
      final_time: "",
    });


    const saveAppointment = () => {
      if (token) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/appointment/new`, appointment, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setAppointment({
              title: "",
              observation: "",
              place: "",
              date: date,
              initial_time: "",
              final_time: "",
            });
            getDayAppointments();
            getMonthAppointments();
            handleClose();
          }).catch((err) => {
            toast.error(err.response.data.message, toastConfig);
          })
        }
      }  

    console.log("appointment", appointment);
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "10px", textTransform: "capitalize" }}
            >
              {dayjs(date).locale("pt-br").format("dddd, DD [de] MMMM")}
            </Typography>
            <Typography id="modal-modal-description" variant="subtitle1">
              Adicionar compromisso:
            </Typography>
            <Input
              type="text"
              placeholder="Título"
              onChange={(e) =>
                setAppointment({ ...appointment, title: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Descrição"
              onChange={(e) =>
                setAppointment({ ...appointment, observation: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Local"
              onChange={(e) =>
                setAppointment({ ...appointment, place: e.target.value })
              }
            />
            <TimeContainer>
              <p>Horário inicial: </p>
              <TimeInput
                type="time"
                onChange={(e) =>
                  setAppointment({
                    ...appointment,
                    initial_time: e.target.value,
                  })
                }
              />
            </TimeContainer>
            <TimeContainer>
              <p>Horário final: </p>
              <TimeInput
                type="time"
                onChange={(e) =>
                  setAppointment({ ...appointment, final_time: e.target.value })
                }
              />
            </TimeContainer>
            <ButtomContainer>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={saveAppointment}>
                Salvar
              </Button>
            </ButtomContainer>
          </Box>
        </Modal>
      </div>
    );
  };

  return (
    <>
      <Header />
      <Container>
      <RegisterModal />
        <Calendar
          calendarType="US"
          formatDay={(locale, date) => format(date)}
          formatShortWeekday={(locale, date) =>
            dayjs(date).locale("pt-br").format("dddd")
          }
          onChange={(locale, date) => {
            setDate(dayjs(locale).format("YYYY-MM-DD"));
          }}
          onActiveStartDateChange={(locale, date) => {
            setMonth(dayjs(locale.activeStartDate).format("MM"));
            setYear(dayjs(locale.activeStartDate).format("YYYY"));
            setDate(dayjs(locale.activeStartDate).format("YYYY-MM-DD"));
          }}
          onClickDay={handleOpen}
        />
        <SelectedDayAppointments>
          <Title>{dayjs(date).locale('pt-br').format('dddd, DD [de] MMMM [de] YYYY')}</Title>
          <ItensContainer>
          {dayAppointments.length > 0 ? (
            dayAppointments.map((appointment) => {
              return (
                <AppointmentItem key={appointment.id}>
                  <AppointmentTitle>{appointment.title}</AppointmentTitle>
                  {appointment.observation ? (
                    <AppointmentObservation>{appointment.observation}</AppointmentObservation>
                  ) : (
                    <AppointmentObservation>Sem descrição</AppointmentObservation>
                  )}
                  <AppointmentPlace>Local: {appointment.place}</AppointmentPlace>
                  <AppointmentTime> Horário: {appointment.initial_time.split('T')[1].split('.')[0]} - {appointment.final_time.split('T')[1].split('.')[0]}</AppointmentTime>
                </AppointmentItem>
              );
            })
          ) : (
            <EmptyDay>
              <p>Não há compromissos neste dia</p>
            </EmptyDay>
          )}
          </ItensContainer>
        </SelectedDayAppointments>
      </Container>
      
    </>
  );
}

const AppointmentTitle = styled.h3`
  padding-bottom: 5px;
`;
const AppointmentObservation = styled.p`
  font-size: 12px;
  padding-left: 15px;
  max-width: 100%;
  overflow: hidden;
`;
const AppointmentPlace = styled.p`
  font-size: 15px;
  padding-top: 2px;
  padding-left: 15px;
`;
const AppointmentTime = styled.p`
  font-size: 15px;
  padding-top: 2px;
  padding-left: 15px;
`;

const Container = styled.div`
  display: flex;
  padding: 50px 20px;
  background-color: #D0E7F8;
  height: 100vh;
  justify-content: center;
`;
const DayFormat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: black;
  width: 100%;
  height: 100%;
`;
const Day = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  left: 10px;
`;
const Appointments = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  overflow: scroll;
  width: 100%;
  margin-top: 15px;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;
const Appointment = styled.p`
  width: 100%;
  display: flex;
  font-family: --var(--main-font);
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin-bottom: 5px;
  font-family: --var(--main-font);
`;
const TimeInput = styled.input`
  width: 50%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin-bottom: 5px;
  font-size: 14px;
  font-family: --var(--main-font);
`;
const TimeContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 10px;
  }
`;
const ButtomContainer = styled.div`
  align-self: flex-end;
  margin-top: 15px;
`;

const SelectedDayAppointments = styled.div`
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  padding: 15px;
  width: 400px;
  height: 565px;
  border-radius: 10px;
  background-color: #fff;
`;

const EmptyDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: black;
  width: 100%;
  height: 100%;
`;

const AppointmentItem = styled.div`
  width: 300px;
  min-height: 80px;
  margin-bottom: 10px;
  background: #F1F3FC;
  border-left: 7px solid var(--primary-color);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 10px;
`;

const ItensContainer = styled.div`
  margin-left: 20px;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const Title = styled.h1`
  font-family: --var(--main-font);
  font-size: 20px;
  color: #000000;
  width: 100%;
  padding-bottom: 20px;
`