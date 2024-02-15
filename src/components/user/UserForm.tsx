import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../shared/FormField";
import Button from "../../shared/btns/Button";
import { User } from "../../models/models";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

declare module "yup" {
  interface StringSchema {
    isPasswordStrong(
      options: {
        minUppercase: number;
        minLowercase: number;
        minNumbers: number;
        minSymbols: number;
      },
      errorMessage?: string
    ): StringSchema;
  }
}

interface CategoryFormProps {
  userToEdit: User;
  formData: User;
  handleSubmit: (formData: User) => void;
  handleCancel: () => void;
}

Yup.addMethod(
  Yup.string,
  "isPasswordStrong",
  function (options, errorMessage = "La contraseña debe ser más fuerte") {
    return this.test("test-is-password-strong", errorMessage, function (value) {
      const { path, createError } = this;

      let isStrong = true;

      if (typeof value === "undefined") {
        return true;
      }

      if (options?.minLowercase) {
        if (!/[a-z]/.test(String(value))) {
          isStrong = false;
        }
      }
      if (options?.minUppercase) {
        if (!/[A-Z]/.test(String(value))) {
          isStrong = false;
        }
      }
      if (options?.minNumbers) {
        if (!/\d/.test(String(value))) {
          isStrong = false;
        }
      }
      if (options?.minSymbols) {
        if (!/\W/.test(String(value))) {
          isStrong = false;
        }
      }

      return (
        isStrong ||
        createError({
          path,
          message: errorMessage,
        })
      );
    });
  }
);

export default function UserForm({
  userToEdit,
  formData,
  handleSubmit,
  handleCancel,
}: CategoryFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const CategoryFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("* El nombre es obligatorio")
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(80, "El nombre no debe tener más de 80 caracteres"),
    username: Yup.string()
      .required("El nombre de usuario es obligatorio")
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .max(50, "El nombre de usuario no debe tener más de 50 caracteres"),
    phone: Yup.string()
      .matches(
        /^([67])?\d{7,8}$/,
        "Ingrese un número de teléfono válido en Bolivia"
      )
      .required("El número de teléfono es obligatorio"),

    password:
      userToEdit.id == 0
        ? Yup.string()
            .required("Campo requerido.")
            .min(8, "La contraseña es muy corta")
            .isPasswordStrong(
              {
                minUppercase: 1,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 1,
              },
              "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial."
            )
        : Yup.string().min(8, "La contraseña es muy corta").isPasswordStrong(
            {
              minUppercase: 1,
              minLowercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            },
            "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial."
          ),
    role: Yup.string()
      .required("Seleccione un rol")
      .oneOf(["Admin", "Seller"], "Rol no válido"),
  });
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

        <div style={{ position: "relative"}}>
        <span
            style={{
              position: "absolute",
              right: "10px",         
              paddingTop:"10px",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>
          <FormField
            name="password"
            type={showPassword ? "text" : "password"}
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
