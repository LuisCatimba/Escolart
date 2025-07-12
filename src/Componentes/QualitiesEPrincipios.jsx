//Ícones

import {
  FaGraduationCap,
  FaClock,
  FaMoneyBillWave,
  FaUserCheck,
  FaShieldAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaHandshake,
  FaHeart,
  FaLightbulb,
  FaUniversalAccess,
  FaCog,
  FaUserEdit,
  FaSignOutAlt,
  FaLock,
} from "react-icons/fa";

//Informações para Cards sobre qualidades da escolart

export const CardsQualidadesEscolart = [
  {
    titulo: "Professores Qualificados",
    descricao:
      "Contamos com uma equipa experiente, apaixonada e dedicada ao sucesso dos alunos.",
    icon: <FaGraduationCap size={40} color="#2563eb" />,
  },
  {
    titulo: "Horários Flexíveis",
    descricao:
      "Aulas que se adaptam à sua rotina, garantindo conforto e praticidade no seu aprendizado.",
    icon: <FaClock size={40} color="#10b981" />,
  },
  {
    titulo: "Devolução do dinheiro",
    descricao:
      "Caso não esteja satisfeito com as aulas, garantimos a devolução do seu dinheiro.",
    icon: <FaMoneyBillWave size={40} color="#f59e0b" />,
  },
  {
    titulo: "Apoio ao Aluno Personalizado",
    descricao:
      "Cada aluno recebe atenção individualizada, respeitando seu ritmo e suas necessidades.",
    icon: <FaUserCheck size={40} color="#8b5cf6" />,
  },
  {
    titulo: "Segurança e Confiabilidade",
    descricao:
      "Sistema seguro e transparente para garantir tranquilidade aos nossos alunos e responsáveis.",
    icon: <FaShieldAlt size={40} color="#ef4444" />,
  },
];

//Informações sobre nossos proincípios

export const NossosPrincipios = [
  {
    titulo: "Compromisso com o Aluno",
    descricao:
      "Acreditamos que cada aluno é único e merece atenção personalizada para alcançar seu potencial máximo.",
    icon: <FaUserGraduate size={40} color="#2563eb" />,
  },
  {
    titulo: "Qualidade no Ensino",
    descricao:
      "Oferecemos aulas com professores capacitados, metodologias atualizadas e foco no aprendizado real.",
    icon: <FaChalkboardTeacher size={40} color="#10b981" />,
  },
  {
    titulo: "Transparência",
    descricao:
      "Mantemos uma comunicação clara e honesta com alunos, pais e professores em todas as etapas do processo.",
    icon: <FaHandshake size={40} color="#f59e0b" />,
  },
  {
    titulo: "Empatia e Respeito",
    descricao:
      "Valorizamos a escuta ativa, o respeito às diferenças e a construção de um ambiente acolhedor e colaborativo.",
    icon: <FaHeart size={40} color="#ef4444" />,
  },
  {
    titulo: "Inovação",
    descricao:
      "Estamos sempre em busca de novas formas de ensinar, aprender e evoluir com a tecnologia e as boas práticas da educação.",
    icon: <FaLightbulb size={40} color="#8b5cf6" />,
  },
  {
    titulo: "Acessibilidade",
    descricao:
      "Nosso objetivo é levar o conhecimento a todos, superando barreiras geográficas e financeiras.",
    icon: <FaUniversalAccess size={40} color="#0ea5e9" />,
  },
];

//Dados para o componente AccountMenu

export const userMenuOptions = [
  {
    label: "Editar Perfil",
    icon: <FaUserEdit size={18} color="#4B5563" />,
    action: "edit-profile",
  },
  {
    label: "Alterar Senha",
    icon: <FaLock size={18} color="#4B5563" />,
    action: "change-password",
  },
  {
    label: "Configurações",
    icon: <FaCog size={18} color="#4B5563" />,
    action: "settings",
  },
  {
    label: "Sair",
    icon: <FaSignOutAlt size={18} color="#4B5563" />,
    action: "logout",
  },
];
