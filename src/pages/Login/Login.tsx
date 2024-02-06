import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import "./Login.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
import Button from "../../shared/btns/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import { createUser } from "../../redux/state/user";
import { Roles } from "../../models/roles";
import logo from "../../assets/logo.svg";

interface User {
  username: string;
  password: string;
}
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let initialState: User = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(2, "Must be at least 8 characters"),
  });
  const HandleonSubmit = async (values: User) => {
    let url = "api/login";
    try {
      const response = await APISERVICE.post(values, url);
      if (response) {
        let sesion = {
          id: response.user.id,
          name: response.user.name,
          username: response.user.username,
          token: response.token,
          role: response.user.role,
          permissions: response.permissions,
        };
        dispatch(createUser({ ...sesion, rol: Roles.USER }));
        navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
        navigate(0);
      } else {
        console.log("Invalid username or password");
      }
    } catch (error) {
      console.log("An error ocurred. Please try again later");
    }
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={(values: User) => {
        HandleonSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <div className="container-login-page">
          <Form className="login-form">
            <h2>Login</h2>
            <div>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className={`form-control ${errors.username && "is-invalid"}`}
                touched={touched.username ? "false" : "true"}
              />
              <div className="invalid-feedback">
                {errors.username && errors.username}
              </div>
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={`form-control ${errors.password && "is-invalid"}`}
                touched={touched.password ? "false" : "true"}
              />
              <div className="invalid-feedback">
                {errors.password && errors.password}
              </div>
            </div>

            <button type="submit" className="btn-login">
              Login
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
