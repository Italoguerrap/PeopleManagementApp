import { useState, useEffect } from 'react'
import { 
  Container,
  Title,
  Description,
  ControlsContainer
} from './styles';
import { Button } from '../../components/button';
import { FaCircleUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Table } from '../../components/table';
import { FilterModal } from '../../components/FilterModal'; 
import { AddUserModal } from '../../components/AddUserModal';
import { FiFilter } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    naturality: '',
    nationality: '',
    country: '',
    cpf: ''
  });


  async function getUsers() {
    const params = new URLSearchParams();

    if (formData.name) params.append("query", formData.name);

    try {
      const response = await fetch(`http://localhost:5097/api/v1/People?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao buscar usuários: ${errorText}`);
      }

      const data = await response.json();
      setUsers(data);

      toast.success("Usuários resgatars com sucesso!");

    } catch (err) {
      console.error(err);
      toast.error("Erro ao resgatar usuários!");
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>

      <Title>Gerenciamento de Usuários</Title>
      <Description>Gerencie os membros da sua equipe e suas permissões de conta aqui.</Description>
      <ToastContainer />
      <ControlsContainer>
        <div>
          <Button title="Add User" icon={<FaPlus /> }  colorButton="#02ffff" onClick={() => setIsAddUserModalOpen(true)}/>
          <Button title=" Add Filter" icon={<FiFilter />}  colorButton="#02ffff" onClick={() => setIsFilterModalOpen(true)} />
        </div>

      </ControlsContainer>

      {users.length > 0 && <Table users={users} />}

      {isFilterModalOpen && (<FilterModal onClose={() => setIsFilterModalOpen(false)} />)}
      {isAddUserModalOpen && (<AddUserModal onClose={() => setIsAddUserModalOpen(false)} onUserAdded={getUsers} />  )}
    </Container>
    );
}