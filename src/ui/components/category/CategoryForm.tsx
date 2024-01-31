import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormData {
  id: number | "";
  name: string;
  description: string;
  create_at: string | null;
  update_at: string | null;
}

interface CategoryFormProps {
  formData: FormData;
  handleSubmit: (formData: FormData) => void;
  handleCancel: () => void;
}
const CategoryFormSchema = Yup.object().shape({
  name: Yup.string().required("* El nombre es obligatorio"),
  description: Yup.string().required("* La descripción es obligatoria"),
});
export default function CategoryForm({
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
        <label className="label-form">Name:</label>
        <Field
          id="name"
          className="input-form "
          type="text"
          name="name"   
          
        />
        <ErrorMessage name="name" component="p" className="message-error"/>
        <label className="label-form">Description: </label>
        <Field
          id="description"
          className="input-form "
          name="description"       
          
        />
        <ErrorMessage name="description" component="p" />
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
