
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { Container } from "react-bootstrap";
import "./register.css";
export const Register = () => {
  return (
    <main>
      
      <section className="registerSection p-5">
        <Container fluid={'xxl'}>
          <RegisterForm />
        </Container>
      </section>
    </main>
  );
};
