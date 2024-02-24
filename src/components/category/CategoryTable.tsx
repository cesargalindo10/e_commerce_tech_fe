import { Table } from "react-bootstrap";
import CategoryTableBody from "./CategoryTableBody";
import CategoryTableHeader from "./CategoryTableHeader";
import Pagination from "../../shared/pagination/Pagination";
import { CategoryData, PageInfo } from "../../models/models";

interface Props {
  items: CategoryData[];
  setCategoriToEdit: ([]: any) => void;
  setShowModal: (boolean: any) => void;
  deleteCategory: (id: string) => void;
  pageInfo: PageInfo |null;
  getCategories: (page: number) => void;
  showBillboardCategory:(id:string)=>void;
}
export default function CategoryTable({
  items,
  setCategoriToEdit,
  setShowModal,
  deleteCategory,
  pageInfo,
  getCategories,
  showBillboardCategory
}: Props) {
  return (
    <>
      <Table striped bordered hover>
        <CategoryTableHeader />
        <CategoryTableBody
          categories={items}
          setCategoriToEdit={setCategoriToEdit}
          setShowModal={setShowModal}
          deleteCategory={deleteCategory}
          showBillboardCategory={showBillboardCategory}
        />
      </Table>
      {items.length > 0 && (
        <Pagination pageInfo={pageInfo} getData={getCategories} />
      )}
    </>
  );
}
