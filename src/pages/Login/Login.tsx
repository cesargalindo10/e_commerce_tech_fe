import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "./Login.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import { createUser } from "../../redux/state/user";
import { Roles } from "../../models/roles";
import FormField from "../../shared/FormField";
import { FaBullseye } from "react-icons/fa";
import Loading from "../../shared/loading/Loading";

interface User {
  username: string;
  password: string;
}
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorUserPass, setErrorUserPass] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    let url = "api/login";
    try {
      const response: any = await APISERVICE.post(values, url);
      if (response) {
        let sesion = {
          id: response.user.id,
          name: response.user.name,
          username: response.user.username,
          token: response.token,
          role: response.user.role,
          permissions: response.permissions,
        };
        console.log(response);
        dispatch(createUser({ ...sesion, rol: Roles.USER }));
        navigate(`/${PrivateRoutes.PRIVATE}/ventas`, { replace: true });
      } else {
        console.log("Invalid username or password");
      }
    } catch (error) {
      setErrorUserPass("*Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={(values: User) => {
          HandleonSubmit(values);
        }}
      >
        <div className="container-login-page">
          <Form className="login-form">
            <h2>Login</h2>
            <div>
              <FormField
                name="username"
                type="text"
                placeHolder=""
                label="Username"
              />
            </div>
            <div>
              <FormField
                name="password"
                type="password"
                placeHolder=""
                label="Password"
              />
            </div>
            <p className="error-login">{errorUserPass}</p>
            <button type="submit" className="btn-login">
              Login
            </button>
          </Form>
        </div>
      </Formik>
    </div>
  );
}
