import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormData {
  id: number | "";
  firstname: string;
  lastname: string;
  username: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  password: string | null;
}

interface CategoryFormProps {
  formData: FormData;
  handleSubmit: (formData: FormData) => void;
  handleCancel: () => void;
}
const CategoryFormSchema = Yup.object().shape({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  username: Yup.string().required("Username is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  password: Yup.string().required("Password is required"),
});
export default function UserForm({
  formData,
  handleSubmit,
  handleCancel,
}: CategoryFormProps) {
  return (
    <Formik
      initialValues={formData}
      validationSchema={CategoryFormSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      <Form className="form-container">
        {/* Nuevos campos */}
        <label className="label-form">Name:</label>
        <Field
          id="firstname"
          className="input-form"
          type="text"
          name="firstname"
        />
        <ErrorMessage name="firstname" component="span" />
        <label className="label-form">Username:</label>
        <Field
          id="username"
          className="input-form"
          type="text"
          name="username"
        />
        <ErrorMessage name="username" component="p" />

        <label className="label-form">Phone:</label>
        <Field id="phone" className="input-form" type="text" name="phone" />
        <ErrorMessage name="phone" component="p" />

        <label className="label-form">Email:</label>
        <Field id="email" className="input-form" type="email" name="email" />
        <ErrorMessage name="email" component="p" />

        <label className="label-form">Address:</label>
        <Field id="address" className="input-form" type="text" name="address" />
        <ErrorMessage name="address" component="p" />

        <label className="label-form">Password:</label>
        <Field
          id="password"
          className="input-form"
          type="password"
          name="password"
        />
        <ErrorMessage name="password" component="p" />

        <div className="button-container">
          <button className="button-form" type="submit">
            Guardar
          </button>
          <button className="button-form" type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </Form>
    </Formik>
  );
}
