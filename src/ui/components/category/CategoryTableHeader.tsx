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
        title:"Actions",
        id:4
    }
  ];
export default function CategoryTableHeader() {

    
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.id}>{column.title}</th>
        ))}
      </tr>
    </thead>
  )
}