import { SuccessfulRegistration } from "../../components/SuccessfulRegistration/SuccessfulRegistration";
import { Container } from "react-bootstrap";
import "./registerMsg.css";
export const RegisterMsg = () => {
  return (
    <main>
      <section className="registerSection p-5">
        <Container fluid={"xxl"}>
          <SuccessfulRegistration />
        </Container>
      </section>
    </main>
  );
};
