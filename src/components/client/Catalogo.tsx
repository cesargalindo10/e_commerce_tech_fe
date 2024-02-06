import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/state/client";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

interface Category {
  id: number;
  name: string;
}

export default function Catalogo (){
  const categories: Category[] = [
    { id: 1, name: "Microfonos" },
    { id: 2, name: "Celulares" },
  ];

  const dispatch = useDispatch() 
  const navigate = useNavigate()
  const handleClick=(cate:string,id:number)=>{
        dispatch(createClient({id:id,name:cate}))
        navigate(`${cate}`)
  }

  return (
    <div>
        <Link to={`/search-product`}>{<FaSearch/>}</Link>
        <ul>
        {categories.map((categoria) => (
          <li key={categoria.id}>
            <Link to={`/category/${categoria.name}`} onClick={()=>handleClick(categoria.name,categoria.id) }>{categoria.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
