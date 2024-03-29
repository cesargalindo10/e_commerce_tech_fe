import { Field, Form, Formik } from "formik";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Brand, Category, Product } from "../../models/models";
import { Modal } from "react-bootstrap";
import { ContextProduct, ContextProductType } from "./Product";
import { ErroMessages as EM } from "../../utilities/messageError";
import FormField from "../../shared/FormField";
import Button from "../../shared/btns/Button";
import { RowImage } from "../../shared/rowImage/RowImage";
import { FaFileArrowDown } from "react-icons/fa6";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface Props {
  updateCourse: (product: Product, image: File | null,pdfFile: File | null,  params: string) => void;
}
interface ProdModal {
  id?:number,
  name: string,
  code: string,
  url_image?: string,
  url_pdf?: string,
  sale_price: number,
  cost_price: number,
  state: boolean | string,
  description?: string,
  brand_id?: string
  category_id?: string
}
let initialState: ProdModal = {
  name: "",
  code: "",
  url_image: "",
  url_pdf: "",
  sale_price: 0,
  cost_price: 0,
  state: "",
  description: "",
  category_id: "",
  brand_id: "",
};

enum typeFile {
  image = "image",
  pdf = "pdf",
} 

let initialValues = initialState;
export const ModalProduct = ({ updateCourse }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [urlImage, setUrlImage] = useState("");
  const contextValue = useContext<ContextProductType | null>(ContextProduct);
  const [pdfFile, setPdfFile] = useState<File | null>(null);  
  const [fileNameDescription, setFileDescription] = useState('');
  if (!contextValue) return;

  const {
    showModal,
    setShowModal,
    productToUpdate,
    setProductToUpdate,
    brands,
    categories,
  } = contextValue;

  const categoryMapped: [string, string][] = categories?.map(
    (category: Category) => {
      return [String(category.id), category.name];
    }
  );
  const brandMapped: [string, string][] = brands?.map((brand: Brand) => {
    return [String(brand.id), brand.name];
  });

  useEffect(() => {
    if (showModal) setUrlImage(productToUpdate?.url_image ?? "");
  }, [showModal]);

  if (productToUpdate) {
    initialValues = {
      name: productToUpdate.name,
      code: productToUpdate.code,
      sale_price: productToUpdate.sale_price,
      cost_price: productToUpdate.cost_price,
      state: productToUpdate.state ? "1" : "0",
      description: productToUpdate.description,
      category_id: String(productToUpdate.category_id),
      brand_id: String(productToUpdate.brand_id),
    };
  }

  const handleSend = (values: ProdModal) => {
    /* new */
    const product: Product = {
      name: values.name,
      code: values.code,
      sale_price: values.sale_price,
      cost_price: values.cost_price,
      state: values.state,
      description: values.description,
      category_id: Number(values.category_id),
      brand_id: Number(values.brand_id),
    };
    if (productToUpdate === null) {
      updateCourse(product, image,pdfFile ,"");
    } else {
      const params = `/${productToUpdate.id}`;
      updateCourse(product, image, pdfFile,  params);
    }
    reset();
  };

  const reset = () => {
    setShowModal(false);
    initialValues = initialState;
    setSelectedImage(null);
    setImage(null);
    setUrlImage("");
    setProductToUpdate(null);
    setFileDescription('');
  };

  const yupSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, EM.tooLongMessage)
      .required(EM.requiredMessage)
      .strict(true),
    code: Yup.string().max(50, EM.tooLongMessage).nullable().strict(true),
    sale_price: Yup.number()
      .min(1, 'La cantidad debe ser mayor a 0')
      .max(100000, EM.tooLongMessage)
      .required(EM.requiredMessage),
    cost_price: Yup.number()
      .min(1, EM.tooSortMessage)
      .max(10000, EM.tooLongMessage)
      .required(EM.requiredMessage),
    description: Yup.string().max(150, EM.tooLongMessage).nullable(),
    state: Yup.string()
      .required(EM.requiredMessage)
      .oneOf(["0", "1"], "Seleccione un estado"),
    brand_id: Yup.string()
      .required(EM.requiredMessage)
      .oneOf( [...brandMapped.map((brand) => brand[0])], "Seleccione una marca"),
    category_id: Yup.string()
      .required(EM.requiredMessage)
      .oneOf([...categoryMapped.map((cat) => cat[0])], "Seleccione una categoria"),
  });

  const handleManageFile = (event: ChangeEvent<HTMLInputElement>, set: React.Dispatch<React.SetStateAction<File | null>>, type: string) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const selected = file[0];
      set(selected);
      if (event.target.files && event.target.files[0] && type === typeFile.image  ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result ?? null);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  };
  return (
    <Modal show={showModal} centered>
      <Modal.Header>
        <h5 className="title-header__modal">
          {productToUpdate ? "Actualizar producto" : "Crear nuevo producto"}
        </h5>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: ProdModal) => handleSend(values)}
          validationSchema={yupSchema}
        >
          <Form>
            <FormField
              name="name"
              type="text"
              placeHolder="Ejm: Camara Ip ptz 4mp"
              label="Nombre de producto"
            />
            <FormField
              name="code"
              type="text"
              placeHolder="Ejm: DH-32234234"
              label="Codigo"
            />
            <FormField
              name="sale_price"
              type="number"
              placeHolder="Ejm: 52,1"
              label="Precio de venta"
            />
            <FormField
              name="cost_price"
              type="number"
              placeHolder="Ejm: 45,2"
              label="Precio de compra"
            />
            <FormField
              name="description"
              type="textarea"
              placeHolder="Ejm: Camara Ip Ptz 4mp sensor 1/8 starvis cmos zomm optico 45mx"
              label="Descripcion"
            />
            <FormField
              name="state"
              type="select"
              label="Estado"
              selectOptions={[
                ["2", "Seleccione un estado"],
                ["1", "Activo"],
                ["0", "Inactivo"],
              ]}
            />

            <FormField
              name="category_id"
              type="select"
              label="Categoria"
              selectOptions={[
                ["x", "Seleccione una categoria"],
                ...categoryMapped,
              ]}
            />

            <FormField
              name="brand_id"
              type="select"
              label="Marca"
              selectOptions={[["x", "Seleccione una marca"], ...brandMapped]}
            />

            <p className="mt-2 mb-0">Imagen</p>
            <Field
              className="input-file"
              type="file"
              name="image"
              accept="image/png, image/jpeg, image/jpg, image/web3, image/webp"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleManageFile(e, setImage, typeFile.image)}
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

          {/*   <Field
              className="input-file"
              type="file"
              name="pdfFile"
              accept=".pdf"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleManageFile(e, setPdfFile, typeFile.pdf)}
            /> */}

            <label 
                className="custom-file"
                htmlFor="justifiactionfile"
                >
                <span className="custom-file-icon">
                   <FaFileArrowDown />
                </span>
                {fileNameDescription.length > 0 ? fileNameDescription : "Seleccione un archivo" }
            </label>
            <input 
              onChange={(e: ChangeEvent<HTMLInputElement>) => {handleManageFile(e, setPdfFile, typeFile.pdf), setFileDescription(e.target.value)}}
              type="file" 
              id="justifiactionfile"
              accept=".pdf"
              hidden
              />

            <div className="modal-btns">
              <Button variant="error" onClick={reset} text="Cancelar" />{" "}
              <Button
                variant="main"
                type="submit"
                text={productToUpdate?.id ? "Actualizar" : "Crear"}
              />
            </div>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
