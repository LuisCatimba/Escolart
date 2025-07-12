//Css

import "./AdminHome.css";

//Icons

import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import { BsBookHalf } from "react-icons/bs";

//Ícones
const icons = [
  { icon: FaUsers, total: 8.765, label: "Usuários" },
  { icon: FaUsers, total: 765, label: "Alunos" },
  { icon: FaChalkboardTeacher, total: 65, label: "Professores" },
  { icon: BsBookHalf, total: 765, label: "Aulas" },
];

//Components
import Card from "../../ComponentsAdmin/Card";

const AdminHome = () => {
  return (
    <div className="AdminHome">
      <h2 style={{ color: "#52565b" }}>DashBoard</h2>
      <div className="cards">
        {icons.map((icon) => (
          <Card
            icon={icon.icon}
            total={icon.total}
            label={icon.label}
            key={icon.label}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
