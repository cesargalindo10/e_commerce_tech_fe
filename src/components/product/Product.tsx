import { createContext, useCallback, useEffect, useState } from "react";
import { APISERVICE, AxiosService } from "../../service/api.service";
import { Brand, Category, PageInfo, Product } from "../../models/models";
import ProductTable from "./ProductTable";
import Button from "../../shared/btns/Button";
import { BiPlus } from "react-icons/bi";
import { ModalProduct } from "./ModalProduct";
import toast from "react-hot-toast";
import SearchDashboard from "../../shared/searchDashboard/SearchDashboard";
import debounce from "just-debounce-it";

interface AppState {
  products: Product[];
  pageInfo: PageInfo | null;
  product: Product | null;
  categories: Category[];
  brands: Brand[];
  filters: {
    name: string;
  } | null;
}
export interface ContextProductType {
  productToUpdate: Product | null;
  setProductToUpdate: React.Dispatch<React.SetStateAction<Product | null>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  brands: Brand[];
  categories: Category[];
}

export const ContextProduct = createContext<ContextProductType | null>(null);

export function Product() {
  const [products, setProducts] = useState<AppState["products"]>([]);
  const [loading, setLoading] = useState(false);
  const [productToUpdate, setProductToUpdate] =
    useState<AppState["product"]>(null);
  const [showModal, setShowModal] = useState(false);
  const [pageInfo, setpageInfo] = useState<AppState["pageInfo"] | null>(null);
  const [categories, setCategories] = useState<AppState["categories"]>([]);
  const [brands, setBrands] = useState<AppState["brands"]>([]);
  const [filters, setFilters] = useState<AppState["filters"]>(null);
  useEffect(() => {
    getProducts(1);
    getCategories();
    getBrands();
  }, []);

  const getBrands = async () => {
    const url = "api/brands";
    const response = await AxiosService.get(url, "");
    if (true) {
      setBrands(response.data);
    }
  };
  const getCategories = async () => {
    const url = "api/categories-all";

    const response = await AxiosService.get(url, "");
    if (response) {
      setCategories(response.data);
    }
  };

  const getProducts = async (page: number, filtersP: AppState["filters"] = filters) => {
    const url = "api/product";
    const params = {
      page,
      name: filtersP?.name,
    };
    const response: any = await AxiosService.get(url, params);
    if (response) {
      const { data, pageInfo } = response;
      setProducts(data);
      setpageInfo(pageInfo);
    }
  };


  const deleteProduct = async () => {
    /*  try {
        setLoading(true)
        setShowModalConfirm(false);
        let params = `idUser=${customerToDelete}`;
        const {success, message, code} = await APISERVICE.get(userServiceNames.DISABLE, params);
        if ( success ) {
          getproducts(pageInfo.page, filters.nombre);
          toast.success(message);
        }else{
          toast.error(messagesError(code));
        }
      } catch (error) {
        toast.error('Ocurrio un error')
      } finally{
        setLoading(false)
      } */
  };

  const updateCourse = async (
    body: Product,
    image: File | null,
    pdfFile: File | null,
    params: string
  ) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("data", JSON.stringify(body));
      if (image) formData.append("file", image);
      if (pdfFile) formData.append("filePdf", pdfFile);
      const { success, message } = await APISERVICE.posWithImage(
        formData,
        "api/product",
        params,
        "POST"
      );
      if (success) {
        getProducts(pageInfo?.page ?? 1);
        toast.success(message);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const filtercategories = (product: string) => {
    setFilters(filters => ({...filters, name: product}))
    debouncedGetCategogies(product)
  };

  const debouncedGetCategogies = useCallback( debounce((search: string) => {
    getProducts(pageInfo?.page || 1, { name: search });
  },500)
  ,[])


  const clearFilter = () => {
    setFilters(null);
    getProducts(pageInfo?.page || 1, { name: '' });
  };

  return (
    <ContextProduct.Provider
      value={{
        productToUpdate,
        setProductToUpdate,
        showModal,
        setShowModal,
        brands,
        categories,
      }}
    >
      <div className="container-component">
        <h3 className="title-page">Productos</h3>
        <SearchDashboard
          filterSomething={filtercategories}
          placeHolder="Nombre del producto"
          handleClear={clearFilter}
        >
          <Button variant="new" onClick={() => setShowModal(true)} text="Nuevo">
            <BiPlus />
          </Button>
        </SearchDashboard>

        <ProductTable
          products={products}
          getProducts={getProducts}
          deleteProduct={deleteProduct}
          loading={loading}
          pageInfo={pageInfo}
        />
        <ModalProduct updateCourse={updateCourse} />
      </div>
    </ContextProduct.Provider>
  );
}
