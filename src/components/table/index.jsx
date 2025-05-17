import { Container,TableContainer, PaginationFooter, Thead, Tbody, Tr, Th, Td, StatusBadge, Photo } from "./styles";
import { IoClose } from "react-icons/io5";
import { FiEdit  } from "react-icons/fi";
import { EditModal } from '../../components/EditModal';
import { useState } from 'react'

export function Table({ users }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);//paginação melçhorar
  const [usersPerPage, setUsersPerPage] = useState(5); // Default 5

    // Ajustar currentPage se usersPerPage mudar para evitar páginas inválidas
  function handleUsersPerPageChange(event) {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1); // resetar página para 1 ao mudar a quantidade por página
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  function handleEditClick(user) {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }

  return (
    <Container>
      <TableContainer>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Sexo</Th>
            <Th>Data de Nascimento</Th>
            <Th>Naturalidade</Th>
            <Th>Nacionalidade</Th>
            <Th>CPF</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentUsers.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td> <Photo/>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.sex}</Td>
              <Td>{user.birthDate}</Td>
              <Td>{user.naturality}</Td>
              <Td>{user.nationality}</Td>
              <Td>{user.cpf}</Td>
              <Td>
                <StatusBadge>
                  <FiEdit 
                    onClick={() => handleEditClick(user)}
                    style={{ cursor: 'pointer' }}
                  />
                <IoClose style={{ cursor: 'pointer' }} />
                </StatusBadge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableContainer>

      <PaginationFooter>
        <div>
          <label htmlFor="usersPerPageSelect">Usuários por página: </label>
          <select
            id="usersPerPageSelect"
            value={usersPerPage}
            onChange={handleUsersPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
          </select>
        </div>
       
        <div style={{ display: 'flex', gap: 8 }}>
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              style={{
                padding: '6px 12px',
                border: '1px solid #ccc',
                backgroundColor: pageNumber === currentPage ? '#007bff' : '#fff',
                color: pageNumber === currentPage ? '#fff' : '#000',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              {pageNumber}
            </button>
          ))}
        </div>

      </PaginationFooter>

      {isEditModalOpen && selectedUser && (
        <EditModal
          user={selectedUser}            
          onClose={() => setIsEditModalOpen(false)}
        />
      )}   
  </Container>
  );

}
