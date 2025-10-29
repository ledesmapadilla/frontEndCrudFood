import { Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();

  const onSubmit = (data) => {
    if (
      data.email === import.meta.env.VITE_API_EMAIL &&
      data.password === import.meta.env.VITE_API_PASSWORD
    ) {
      setUsuarioLogueado(true);
      
      Swal.fire({
        title: "Bienvenido",
        text: "Iniciaste correctamente tu sesión",
        icon: "success",
      });
      navegacion("/administrador");
     
      /* aqui loguear al usuario */
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: "Ocurrio un error al iniciar sesión",
        icon: "error",
      });
    }
    console.log(data);
    //   agregar logica de login
  };

  /* agregar logica del login. */

  return (
    <Row xs={1} md={2}>
      <Col>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ej: juanperez@mail.com"
                  {...register("email", {
                    required: "el mail es un dato obligatorio",
                    pattern: {
                      value:
                        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                      message: "el mail debe ser un correo válido",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese una contraseña"
                  {...register("password", {
                    required: "La contraseña es un dato obligatorio",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                      message:
                        "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter especial.",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.password?.message}
                </Form.Text>
              </Form.Group>

              <Button variant="warning" type="submit">
                Iniciar seción
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <img
          src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg "
          alt="imagen comida"
          className="img-fluid "
        />
      </Col>
    </Row>
  );
};

export default Login;
