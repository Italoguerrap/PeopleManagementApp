import {
  Container,
  TableContainer,
  PaginationFooter,
  Thead,
  Tbody,
  Tr,
  HeaderTr,
  Th,
  Td,
  StatusBadge,
  Photo,
  PaginationButton,
} from "./styles";
import { IoClose } from "react-icons/io5";
import {
  FiEdit,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";
import { EditModal } from "../../components/EditModal";
import { DeleteConfirmationModal } from "../../components/DeleteConfirmationModal";
import { useState, useEffect } from "react";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { deletePerson, getGenderText } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import SwipeableTable from "../SwipeableTable";

export function Table({ users, onLastUserDeleted }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [usersData, setUsersData] = useState(users);

  function handleUsersPerPageChange(event) {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1);
  }

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers =
    usersData.length > 0
      ? usersData.slice(indexOfFirstUser, indexOfLastUser)
      : users.slice(indexOfFirstUser, indexOfLastUser);

  function handleEditClick(user) {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }

  function handleDeleteClick(user) {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  }

  function handleUserDeleted() {
    const updatedUsers = usersData.filter(
      (user) => user.cpf !== selectedUser.cpf,
    );
    setUsersData(updatedUsers);

    const maxPage = Math.ceil(updatedUsers.length / usersPerPage);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }

    if (updatedUsers.length === 0 && onLastUserDeleted) {
      onLastUserDeleted();
    }

    toast.success("Usuário removido da lista com sucesso!");
  }

  return (
    <Container>
      <ToastContainer />
      <SwipeableTable>
        <TableContainer className="responsive-table responsive-columns">
          <Thead>
            <HeaderTr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th className="priority-medium">Sexo</Th>
              <Th className="priority-medium">Data de Nascimento</Th>
              <Th className="priority-low">Naturalidade</Th>
              <Th className="priority-low">Nacionalidade</Th>
              <Th>CPF</Th>
              <Th>Ações</Th>
            </HeaderTr>
          </Thead>
          <Tbody>
            {currentUsers.map((user, index) => (
              <Tr key={user.cpf} $index={index}>
                <Td data-label="Nome">
                  <Photo />
                  {user.name}
                </Td>
                <Td data-label="Email">
                  {user.email || <TfiLayoutLineSolid />}
                </Td>
                <Td className="priority-medium" data-label="Sexo">
                  {user.gender === 0 || user.gender === "other" ? (
                    <TfiLayoutLineSolid />
                  ) : (
                    getGenderText(user.gender) || <TfiLayoutLineSolid />
                  )}
                </Td>{" "}
                <Td className="priority-medium" data-label="Data de Nascimento">
                  {user.dateOfBirth ? (
                    new Date(user.dateOfBirth).toLocaleDateString("pt-BR")
                  ) : (
                    <TfiLayoutLineSolid />
                  )}
                </Td>
                <Td className="priority-low" data-label="Naturalidade">
                  {user.naturality || <TfiLayoutLineSolid />}
                </Td>
                <Td className="priority-low" data-label="Nacionalidade">
                  {user.nationality || <TfiLayoutLineSolid />}
                </Td>
                <Td data-label="CPF">{user.cpf || <TfiLayoutLineSolid />}</Td>
                <Td data-label="Ações">
                  <StatusBadge>
                    <FiEdit
                      onClick={() => handleEditClick(user)}
                      style={{ cursor: "pointer" }}
                      title="Editar usuário"
                    />
                    <IoClose
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteClick(user)}
                      title="Excluir usuário"
                    />
                  </StatusBadge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableContainer>
      </SwipeableTable>

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
        <div
          style={{ display: "flex", gap: 8, alignItems: "center" }}
          className="pagination-controls"
        >
          {currentPage > 1 && (
            <PaginationButton onClick={() => setCurrentPage(currentPage - 1)}>
              <FiChevronLeft />
            </PaginationButton>
          )}

          {Array.from(
            { length: Math.ceil(usersData.length / usersPerPage) },
            (_, i) => i + 1,
          ).map((pageNumber) => (
            <PaginationButton
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              $active={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginationButton>
          ))}

          {currentPage < Math.ceil(usersData.length / usersPerPage) && (
            <PaginationButton onClick={() => setCurrentPage(currentPage + 1)}>
              <FiChevronRight />
            </PaginationButton>
          )}
        </div>
      </PaginationFooter>

      {isEditModalOpen && selectedUser && (
        <EditModal
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onUserUpdated={(updatedUser) => {
            setIsEditModalOpen(false);
            if (updatedUser) {
              const updatedUsers = usersData.map((user) =>
                user.cpf === updatedUser.cpf ? updatedUser : user,
              );
              setUsersData(updatedUsers);
              toast.success("Lista de usuários atualizada com sucesso!");
            }
          }}
        />
      )}

      {isDeleteModalOpen && selectedUser && (
        <DeleteConfirmationModal
          user={selectedUser}
          onClose={() => setIsDeleteModalOpen(false)}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </Container>
  );
}
