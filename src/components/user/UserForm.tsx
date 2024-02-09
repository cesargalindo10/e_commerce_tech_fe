import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../shared/FormField";
import Button from "../../shared/btns/Button";
import { User } from "../../models/models";


interface CategoryFormProps {
  userToEdit: User;
  formData: User;
  handleSubmit: (formData: User) => void;
  handleCancel: () => void;
}
const CategoryFormSchema = Yup.object().shape({
  name: Yup.string().required("* El nombre es obligatorio"),
  username: Yup.string().required('El nombre de usuario es obligatorio'),
  phone: Yup.string().matches(/^\d+$/, 'Ingrese un número de teléfono válido'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
  //rol: Yup.string().required('Seleccione un rol').oneOf(['Seller', 'Admin'], 'Rol no válido'),
  //state: Yup.string().required('Seleccione un estado').oneOf(['1', '0'], 'Estado no válido'),
  
});
export default function UserForm({
  userToEdit,
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
          placeHolder="Juan"
          label="Nombre de la categoria"
        />
        <FormField
          name="username"
          type="text"
          placeHolder="Nombre de usuario"
          label="Username"
        />
        <FormField
          name="phone"
          type="text"
          placeHolder="Numero de telefono"
          label="Phone"
        />
        <FormField
          name="password"
          type="password"
          placeHolder="Password"
          label="Password"
        />
        <FormField
          name="role"
          type="select"
          label="Rol"
          selectOptions={[
            ["2", "Seleccione un Rol"],
            ["Admin", "Admin"],
            ["Seller", "Seller"],
          ]}
        />

        <div className="modal-btns">
          <Button
            variant="main"
            type="submit"
            text={userToEdit?.id ? "Actualizar" : "Crear"}
          />
          <Button variant="error" onClick={handleCancel} text="Cancelar" />{" "}
        </div>
      </Form>
    </Formik>
  );
}
