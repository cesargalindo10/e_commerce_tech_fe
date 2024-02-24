import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormField from "../../shared/FormField";
import Button from "../../shared/btns/Button";
import { CategoryData } from "../../models/models";
import { ChangeEvent, useEffect} from "react";
import { RowImage } from "../../shared/rowImage/RowImage";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;

interface CategoryFormProps {
  categoryToEdit: CategoryData|any;
  formData: CategoryData|any;
  handleSubmit: (formData: CategoryData|any) => void;
  handleCancel: () => void;
  showModal:boolean;
  setImage:(file: File | null) => void;
  selectedImage:string | ArrayBuffer|null;
  setSelectedImage:(selectedImage:string|ArrayBuffer|null)=>void;
  urlImage:string;
  setUrlImage:(url:string)=>void;
}
const CategoryFormSchema = Yup.object().shape({
  name: Yup.string().required("* El nombre es obligatorio"),
  description: Yup.string().required("* La descripción es obligatoria"),
});
enum typeFile {
  image = "image",
}

export default function CategoryForm({
  categoryToEdit,
  formData,
  handleSubmit,
  handleCancel,
  showModal,
  setImage,
  selectedImage,
  setSelectedImage,
  urlImage,
  setUrlImage
}: CategoryFormProps) {


  const handleManageFile = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const selected = file[0];
      setImage(selected);
      if (event.target.files && event.target.files[0] && type === typeFile.image  ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result ?? null);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  };
  useEffect(() => {
    if (showModal) setUrlImage(categoryToEdit?.url_image ?? ""); 
  }, [showModal])
  

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
         <p className="mt-2 mb-0">Imagen</p>
            <Field
              className="input-file"
              type="file"
              name="image"
              accept="image/png, image/jpeg, image/jpg, image/web3, image/webp"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleManageFile(e, typeFile.image)}
            />

            {selectedImage ? (
              <RowImage url_image={selectedImage as string} />
            ) : (
              <>
                {urlImage?.length > 0 && (
                  <RowImage url_image={APIURLIMG + urlImage} />
                )}
              </>
            )}


        <div className="modal-btns">
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
