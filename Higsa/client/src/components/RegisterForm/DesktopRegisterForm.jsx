import { Form, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const DesktopRegisterForm = ({
  formData,
  handleChange,
  handleSubmit,
  togglePasswordVisibility,
  emailExists,

  errors,
  passwordVisible,
}) => (
  <section className="form-container-register-desktop">
    <h1 className="font-style1 text-center">¡Regístrate!</h1>
    <hr className="custom-hr" />
    <Form onSubmit={handleSubmit}>
      <h2 className="font-style1 text-center">Datos del cátering</h2>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">Nombre del Catering</Form.Label>
            <Form.Control
              type="text"
              name="company_name"
              onChange={handleChange}
              value={formData.company_name}
              isInvalid={!!errors.company_name}
              placeholder="Nombre del Catering"
              required
            />
            {errors.company_name && (
              <div className="text-danger">{errors.company_name}</div>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">CIF</Form.Label>
            <Form.Control
              type="text"
              name="cif"
              onChange={handleChange}
              value={formData.cif}
              isInvalid={!!errors.cif}
              placeholder="CIF"
              required
            />
            {errors.cif && <div className="text-danger">{errors.cif}</div>}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">Dirección 1</Form.Label>
            <Form.Control
              type="text"
              name="address"
              onChange={handleChange}
              value={formData.address}
              isInvalid={!!errors.address}
              placeholder="Dirección 1"
              required
            />
            {errors.address && (
              <div className="text-danger">{errors.address}</div>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">Dirección 2</Form.Label>
            <Form.Control
              type="text"
              name="address2"
              onChange={handleChange}
              value={formData.address2}
              isInvalid={!!errors.address2}
              placeholder="Opcional"
            />
            {errors.address && (
              <div className="text-danger">{errors.address}</div>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">
              Teléfono de la empresa
            </Form.Label>
            <Form.Control
              type="text"
              name="company_phone"
              onChange={handleChange}
              value={formData.company_phone}
              isInvalid={!!errors.company_phone}
              placeholder="Teléfono de la empresa"
              required
            />
            {errors.company_phone && (
              <div className="text-danger">{errors.company_phone}</div>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">Contraseña</Form.Label>
            <div className="password-wrapper">
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                isInvalid={!!errors.password}
                value={formData.password}
                placeholder="Contraseña"
                required
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="password-toggle-icon whiteeye-icon mt-3 mx-2"
              />
            </div>
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">Repetir contraseña</Form.Label>
            <div className="password-wrapper">
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                name="password2"
                onChange={handleChange}
                value={formData.password2}
                isInvalid={!!errors.password2}
                placeholder="Repetir contraseña"
                required
              />
            </div>
            {errors.password2 && (
              <div className="text-danger">{errors.password2}</div>
            )}
          </Form.Group>
        </Col>
      </Row>
      <h2 className="font-style1 text-center">Datos de contacto</h2>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">
              Nombre de persona de contacto
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              isInvalid={!!errors.name}
              placeholder="Nombre de persona de contacto"
              required
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">
              Apellido de persona de contacto
            </Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              onChange={handleChange}
              value={formData.lastname}
              isInvalid={!!errors.lastname}
              placeholder="Apellido de persona de contacto"
              required
            />
            {errors.lastname && (
              <div className="text-danger">{errors.lastname}</div>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">
              Teléfono de contacto
            </Form.Label>
            <Form.Control
              type="text"
              name="contact_phone"
              onChange={handleChange}
              value={formData.contact_phone}
              isInvalid={!!errors.contact_phone}
              placeholder="Teléfono de contacto"
              required
            />
            {errors.contact_phone && (
              <div className="text-danger">{errors.contact_phone}</div>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-style">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              isInvalid={!!errors.email || emailExists}
              placeholder="Email"
              required
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
            {emailExists && (
              <div className="text-danger">
                El correo electrónico ya está registrado.
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Button type="submit" className="btn btn-primary w-100">
        Registrarse
      </Button>
    </Form>
  </section>
);
