import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import axios from "axios";
import TokenContext from "../contexts/TokenContext";

import "../assets/css/Calendar.css";
import 'dayjs/locale/pt-br' 

import Header from "../components/Header";

export default function Agenda() {
  const { token } = useContext(TokenContext);

  const [monthAppointments, setMonthAppointments] = useState([]);
  const [dayAppointments, setDayAppointments] = useState([]);
  const [month, setMonth] = useState(dayjs().format("MM"));
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  console.log("month", monthAppointments);
  console.log("day", dayAppointments);

  useEffect(() => {
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
  }, [token, month, year]);

  useEffect(() => {
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
  }, [token, date]);

  const format = (date) => {
    let appointments = monthAppointments.filter(
      (appointment) =>
        appointment.date.split('T')[0] ===
        dayjs(date).format("YYYY-MM-DD")
    );
    console.log("appointments", appointments);

    appointments.length>0? console.log(dayjs(appointments.date).format("YYYY-MM-DD"), date): console.log("não tem agendamento");

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
          return <Appointment key={appointment.id}>{appointment.title}</Appointment>;
        })}
        </Appointments>
        
      </DayFormat>
    );
  };

  const showModal = (date) => {}


  return (
    <>
      <Header />
      <Container>
        <Calendar
          calendarType="US"
          formatDay={(locale, date) => format(date)}
          formatShortWeekday={(locale, date) => dayjs(date).locale("pt-br").format("dddd")}
          onChange={(locale, date) => {
            setDate(dayjs(locale).format("YYYY-MM-DD"));
          }}
          onActiveStartDateChange={(locale, date) => {
            setMonth(dayjs(locale.activeStartDate).format("MM"));
            setYear(dayjs(locale.activeStartDate).format("YYYY"));
            setDate(dayjs(locale.activeStartDate).format("YYYY-MM-DD"));
          }}
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  padding: 20px;
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
