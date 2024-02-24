// CategoryList.tsx
import React, { useEffect, useState } from "react";
import "./landingpage.css"; // Asegúrate de tener este archivo para los estilos
import { AppState } from "./LandingPage";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { RowImage } from "../../shared/rowImage/RowImage";
import defaultimg from "../../assets/img/defaulimg.png";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface Props {
  categories: AppState["categoriesWithProducts"];
  categoryListRef: React.RefObject<HTMLUListElement>;
}

const CategoryList: React.FC<Props> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    0
  );
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {}, []);

  useEffect(() => {
    setSelectedCategory(categories[0]?.id);
  }, [categories]);

  const categoriesBillboard = categories.filter(
    (category) => category.billboard === true
  );

  return (
    <>
      <div className="">
        <div
          style={{ zIndex: 1 }}
          className={`backdrop ${showCategories ? "show" : ""}`}
          onClick={() => setShowCategories(false)}
        >
          {" "}
        </div>

        <div className="category-list-container">
          <ul className="category-list-nav">
            <li
              className="d-flex align-items-center gap-2"
              onClick={() => setShowCategories(!showCategories)}
            >
              <span className="mb-1">
                <RxHamburgerMenu />
              </span>
              <p className="m-0">Categorias</p>
            </li>
            {categoriesBillboard?.length > 0 &&
              categoriesBillboard.map((category) => (
                <li
                  key={category.id}
                  onClick={() => navigate(`category/${category.id}`)}
                >
                  {category.name}
                </li>
              ))}
          </ul>
        </div>

        <ul
          style={{ zIndex: 2 }}
          className={`category-list ${showCategories ? "show" : ""}`}
        >
          <li
            className={`menu-title ${showCategories ? "show" : ""}`}
            style={{ textAlign: "center", color: "#7F7F7F" }}
          >
            {" "}
            Menú
          </li>
          {categories?.length > 0 ? (
            categories.map((category) => (
              <li
                key={category.id}
                className={`category-item ${
                  selectedCategory === category.id ? "selected" : ""
                }`}
                onClick={() => navigate(`category/${category.id}`)}
                id={category?.id + "li"}
              >
                <div className="d-flex align-items-center gap-1">
                  {category.url_image ? (
                    <RowImage
                      url_image={APIURLIMG + category.url_image}
                      width={15}
                    />
                  ) : (
                    <RowImage url_image={defaultimg} width={15} />
                  )}
                  <h4 className="m-0">{category.name}</h4>
                </div>
                <Link
                  className="category-card-link"
                  to={`/category/${category.id}`}
                >
                  <span>
                    <BsArrowRight />
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <li className="category-item">No hay categorías</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default CategoryList;
