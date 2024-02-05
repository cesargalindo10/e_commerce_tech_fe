//import "./Category.css"

const columns = [
  {
    title: "Name",
    id: 1,
  },
  {
    title: "Username",
    id: 2,
  },
  {
    title: "Phone",
    id: 3,
  },
  {
    title: "Role",
    id: 4,
  },
  {
    title: "state",
    id: 5,
  },

  {
    title: "Actions",
    id: 6,
  },
];
export default function CategoryTableHeader() {
  return (
    <thead>
      <tr>
        {columns &&
          columns.map((column) => <th key={column.id}>{column.title}</th>)}
      </tr>
    </thead>
  );
}
