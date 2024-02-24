//import "./Category.css"

const columns = [
  {
    title: "#",
    id: 1,
  },
    {
      title: "Name",
      id: 2,
    },
    {
      title: "description",
      id: 3,
    },
    {
      title: "Imagen",
      id: 4,
    },
    {
      title:"State",
      id:5
    }, 
    {
      title:"Billboard",
      id:6
    }, 
    {
        title:"Actions",
        id:7
    },
 
  ];
export default function CategoryTableHeader() {

    
  return (
    <thead>
      <tr>
        {columns && columns.map((column) => (
          <th key={column.id}>{column.title}</th>
        ))}
      </tr>
    </thead>
  )
}