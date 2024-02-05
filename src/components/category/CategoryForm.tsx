import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormField from "../../shared/FormField";
import Button from "../../shared/btns/Button";
import { CategoryData } from "../../models/models";

interface CategoryFormProps {
  categoryToEdit: CategoryData;
  formData: CategoryData;
  handleSubmit: (formData: CategoryData) => void;
  handleCancel: () => void;
}
const CategoryFormSchema = Yup.object().shape({
  name: Yup.string().required("* El nombre es obligatorio"),
  description: Yup.string().required("* La descripción es obligatoria"),
});
export default function CategoryForm({
  categoryToEdit,
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
      <Form>
        <FormField
          name="name"
          type="text"
          placeHolder="Ejm: Camaras"
          label="Nombre de la categoria"
        />
        <FormField
          name="description"
          type="text"
          placeHolder="Brebe descripcion de la categoria"
          label="Descripcion"
        />

        <div className="modal__btns mt-3">
          <Button
            variant="main"
            type="submit"
            text={categoryToEdit? "Actualizar":"Crear"}
          />
          <Button variant="error" onClick={handleCancel} text="Cancelar" />{" "}
        </div>
      </Form>
    </Formik>
  );
}
