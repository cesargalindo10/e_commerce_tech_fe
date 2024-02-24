import { MdOutlineClosedCaptionDisabled, MdModeEdit } from "react-icons/md";
import { CategoryData } from "../../models/models";
import Button from "../../shared/btns/Button";
import { RowImage } from "../../shared/rowImage/RowImage";
import defaultimg from "../../assets/img/defaulimg.png";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;

interface Props {
  categories: CategoryData[];
  setCategoriToEdit: ([]: any) => void;
  setShowModal: (boolean: any) => void;
  deleteCategory: (id: string) => void;
  showBillboardCategory:(id:string)=>void;
}
export default function CategoryTableBody({
  categories,
  setCategoriToEdit,
  setShowModal,
  deleteCategory,
  showBillboardCategory
}: Props) {
  const onEdit = (category: any) => {
    setCategoriToEdit(category);
    setShowModal(true);
  };
  const onDelete = (id: string) => {
    deleteCategory(id);
  };
  const showBillboard = (id:string)=>{
    showBillboardCategory(id)
  }
  return (
    <tbody>
      {categories &&
        categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>
              {category.url_image ? (
                <RowImage
                  url_image={APIURLIMG + category.url_image}
                  type="row"
                />
              ) : (
                <RowImage url_image={defaultimg} type="row" />
              )}
            </td>
            <td style={{cursor:"default"}}>
              {category.state ? (
                <button style={{cursor:"default"}} className="btn-gral btn--success ">Activo</button>
              ) : (
                <button style={{cursor:"default"}}  className="btn-gral btn--error">Inactivo</button>
              )}
            </td>
            <td>
              {category.billboard ? (
                <Button text="Ocultar" variant="main"onClick={()=>showBillboard("" + category.id)} />
              ) : (
                <Button text="Mostrar" variant="error" onClick={()=>showBillboard("" + category.id)} />
              )}
            </td>
            <td className="col-2" >
              <Button variant="main" onClick={() => onEdit(category)}>
                <MdModeEdit />
              </Button>
              {' '}
              <Button
                variant="error"
                onClick={() => onDelete("" + category.id)}
              >
                <MdOutlineClosedCaptionDisabled />
              </Button>
            </td>
          </tr>
        ))}
    </tbody>
  );
}
