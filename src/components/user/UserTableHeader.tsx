//import "./Category.css"

const columns = [
  {
    title: "#",
    id: 1,
  },
  {
    title: "Firstname",
    id: 2,
  },
  {
    title: "Lastname",
    id: 3,
  },

  {
    title: "Username",
    id: 4,
  },
  {
    title: "Phone",
    id: 5,
  },
  {
    title: "Email",
    id: 6,
  },
  {
    title: "Address",
    id: 7,
  },
  {
    title: "Actions",
    id: 8,
  },
];
export default function UserTableHeader() {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.id}>{column.title}</th>
        ))}
      </tr>
    </thead>
  );
}
