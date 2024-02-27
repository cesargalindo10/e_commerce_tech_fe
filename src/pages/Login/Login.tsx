import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "./Login.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import { createUser } from "../../redux/state/user";
import FormField from "../../shared/FormField";
import Loading from "../../shared/loading/Loading";
import toast from "react-hot-toast";

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
      if (response.success) {
        let sesion = {
          user:response.user,
          token:response.access_token
        };
        dispatch(createUser({ ...sesion}));
        navigate(`/${PrivateRoutes.PRIVATE}/ventas`, { replace: true });
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      setErrorUserPass("*Invalid username or password");
    } finally {
     setLoading(false)
    }
  };

  return (
    <div className="container-login-page">
      {!loading ? (
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={(values: User) => {
            HandleonSubmit(values);
          }}
        >
          <div >
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
      ) : (
        <Loading />
      )}
    </div>
  );
}
