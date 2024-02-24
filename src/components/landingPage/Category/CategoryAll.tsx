import Product from '../product/Product'
import { AppState } from '../LandingPage';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';


interface Props {
  categories: AppState["categoriesWithProducts"];
}

function CategoriesAll({ categories }: Props) {

  return (
    <ul className='categories-all'>
        {
            categories?.length > 0 ? categories.map(category => (
              <li key={category.id} className='category-card' id={category?.id+"" }>
                <div  className='category-card-header'>
                  <h4 className='category-card-title'>{category.name}</h4>
                  <Link className='category-card-link' to={`/category/${category.id}`}>
                    <p>Ver todas</p>
                    <span>
                      <BsArrowRight />
                    </span>
                  </Link>
                </div>
                <ul className='category-products'>
                {
                  category.products.length > 0 ? category.products.map(product => (
                    <Product product={product} key={product.id}/>
                    )):
                    <li>No hay productos</li>
                  }
                </ul>
              </li>  
            ))
            :
            <li>No hay categorías</li>
        }
    </ul>
  )
}

export default CategoriesAll