// CategoryList.tsx
import React, { useEffect, useRef, useState } from 'react';
import './landingpage.css'; // Asegúrate de tener este archivo para los estilos
import { AppState } from './LandingPage';

interface Props {
    categories: AppState["categoriesWithProducts"];
    categoryListRef: React.RefObject<HTMLUListElement>;
  }

  const linear = (t: number, b: number, c: number, d: number) => {
    return c * (t / d) + b;
  };

const CategoryList: React.FC<Props> = ({ categories, categoryListRef}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(0);
  const handleNavClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, targetId: number) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId + '');

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY -  150;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;

      const startTime = performance.now();

      function scrollStep(timestamp: number) {
        const currentTime = timestamp - startTime;
        const easeInOutCubic = linear(currentTime, startPosition, distance, 100);

        window.scrollTo(0, easeInOutCubic);

        if (currentTime < 100) {
          requestAnimationFrame(scrollStep);
        }
      }

      requestAnimationFrame(scrollStep);
    }

  }

  let prevScrollPos = window.scrollY;
  let before =  categoryListRef.current?.querySelectorAll('.category-card')[0]?.querySelector('h4')?.
  getBoundingClientRect().width || 0;
  
  let other = 0;
  const categoryReffff= useRef<HTMLUListElement>()
  let direction = 'down';
  const handleScroll = () => {
    if (categoryListRef.current) {
      const categoryItems = categoryListRef.current.querySelectorAll('.category-card');
      let found = false;
  
      categoryItems.forEach((item: any) => {
        const rect = item.getBoundingClientRect();
        
        if (rect.top <= 0 && rect.bottom >= 0 && !found) {
          // La categoría es visible en la ventana
          const currentScrollPos = window.scrollY;
          const scrollDirection = currentScrollPos > prevScrollPos ? 'down' : 'up';
          direction = scrollDirection;
          const px = item.querySelector('h4')?.getBoundingClientRect();
           // test(scrollDirection)
          // Actualiza el estado y detiene la iteración
          //setSelectedCategory(Number(item.id));
          found = true;
          prevScrollPos = window.scrollY;
         // console.log(before, px.width)
          if(before !== px.width){
            //other += px.width;
            //console.log('pass element')
            //item.style.left = 0
            /* setTimeout(() => {
            },300);
            */
          //test(scrollDirection, before = scrollDirection === 'down' ?  before : px.width)
            //console.log(other)
          }
          before = px.width;
        }
      });
      other = 0;
      // Actualiza la posición anterior al final de la función
      prevScrollPos = window.scrollY;
    }
  };
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setSelectedCategory(categories[0]?.id);
  },[categories])

  const handleCategoryClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, categoryId: number | undefined) => {
    if(categoryId === undefined)return;
    handleNavClick(e, categoryId)
    setSelectedCategory(categoryId);
  };


const test = ( type: string, px: number ) => {
/*   console.log(type, px)
  if(px !== before)
  console.log(before, px) */

  if(categoryReffff.current){
    let value = type === 'down' ?  px : - px;
    categoryReffff.current.scrollLeft += value;
  }
}
  return (
    <>
    <div className="category-list-container" /* ref={categoryReffff} */>
      <ul className="category-list">
        {categories?.length > 0 ? categories.map(category => (
          <li
          key={category.id}
          className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
          onClick={(e) => handleCategoryClick(e, category?.id)}
          id={category?.id + "li"}
          >
            {category.name}
          </li>
        ))
        :
        <li className='category-item'>No hay categorías</li>
      }
      </ul>
    </div>
      </>
  );
};

export default CategoryList;
