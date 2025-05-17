import { useState } from 'react'
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

export function App() {

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);


  const users = [
    {
      id: 1,    name: 'Liam Smith',    email: 'liam@example.com',    sex: 'Masculino',    birthDate: '15 Mar 1990',    naturality: 'São Paulo',    nationality: 'Brasileiro',    cpf: '123.456.789-00',
    },
    {
      id: 2, name: 'Nathan Anderson', email: 'nathan@example.com', sex: 'Masculino', birthDate: '22 Jan 1988', naturality: 'Fortaleza', nationality: 'Brasileiro', cpf: '321.654.987-11',
    },
    {
      id: 3,    name: 'John Smith',    email: 'john@example.com',    sex: 'Masculino',    birthDate: '05 May 1985',    naturality: 'Rio de Janeiro',    nationality: 'Brasileiro',    cpf: '987.654.321-99',
    },
    {
      id: 4,    name: 'Liam Smith',    email: 'liam@example.com',    sex: 'Masculino',    birthDate: '15 Mar 1990',    naturality: 'São Paulo',    nationality: 'Brasileiro',    cpf: '123.456.789-00',
    },
    {
      id: 5, name: 'Nathan Anderson', email: 'nathan@example.com', sex: 'Masculino', birthDate: '22 Jan 1988', naturality: 'Fortaleza', nationality: 'Brasileiro', cpf: '321.654.987-11',
    },
    {
      id: 6,    name: 'John Smith',    email: 'john@example.com',    sex: 'Masculino',    birthDate: '05 May 1985',    naturality: 'Rio de Janeiro',    nationality: 'Brasileiro',    cpf: '987.654.321-99',
    },
    {
      id: 7,    name: 'Liam Smith',    email: 'liam@example.com',    sex: 'Masculino',    birthDate: '15 Mar 1990',    naturality: 'São Paulo',    nationality: 'Brasileiro',    cpf: '123.456.789-00',
    },
    {
      id: 8, name: 'Nathan Anderson', email: 'nathan@example.com', sex: 'Masculino', birthDate: '22 Jan 1988', naturality: 'Fortaleza', nationality: 'Brasileiro', cpf: '321.654.987-11',
    },
    {
      id: 9,    name: 'John Smith',    email: 'john@example.com',    sex: 'Masculino',    birthDate: '05 May 1985',    naturality: 'Rio de Janeiro',    nationality: 'Brasileiro',    cpf: '987.654.321-99',
    },
    {
      id: 10,    name: 'Liam Smith',    email: 'liam@example.com',    sex: 'Masculino',    birthDate: '15 Mar 1990',    naturality: 'São Paulo',    nationality: 'Brasileiro',    cpf: '123.456.789-00',
    },
    {
      id: 11, name: 'Nathan Anderson', email: 'nathan@example.com', sex: 'Masculino', birthDate: '22 Jan 1988', naturality: 'Fortaleza', nationality: 'Brasileiro', cpf: '321.654.987-11',
    },
    {
      id: 12,    name: 'John Smith',    email: 'john@example.com',    sex: 'Masculino',    birthDate: '05 May 1985',    naturality: 'Rio de Janeiro',    nationality: 'Brasileiro',    cpf: '987.654.321-99',
    },
  ];

  return (
    <Container>

      <Title>Gerenciamento de Usuários</Title>
      <Description>Gerencie os membros da sua equipe e suas permissões de conta aqui.</Description>
      <ControlsContainer>
        <div>
          <Button title="Add User" icon={<FaPlus /> }  colorButton="#02ffff" onClick={() => setIsAddUserModalOpen(true)}/>
          <Button title=" Add Filter" icon={<FiFilter />}  colorButton="#02ffff" onClick={() => setIsFilterModalOpen(true)} />
        </div>

      </ControlsContainer>

      <Table users={users} />

      {isFilterModalOpen && (<FilterModal onClose={() => setIsFilterModalOpen(false)} />)}
      {isAddUserModalOpen && (<AddUserModal onClose={() => setIsAddUserModalOpen(false)} />  )}
    </Container>
    );
}