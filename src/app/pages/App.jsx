import { useState, useEffect } from "react";
import { Container, Title, Description, ControlsContainer, UserInfo, LogoutButton } from "./styles";
import { Button } from "../../components/button";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Table } from "../../components/table";
import { FilterModal } from "../../components/FilterModal";
import { AddUserModal } from "../../components/AddUserModal";
import { EmptyState } from "../../components/EmptyState";
import { NoResultsState } from "../../components/NoResultsState";
import { LoadingState } from "../../components/LoadingState";
import {
  ToastManager,
  showToast,
  ToastType,
} from "../../components/ToastManager";
import { FiFilter } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import { AddUserButton } from "../../components/AddUserButton";
import { searchPeople } from "../../services/api";
import { AuthPage } from "../../pages/AuthPage";
import { useAuth } from "../../context/AuthContext";

export function App() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const { isLoggedIn, userCpf, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    naturality: "",
    nationality: "",
    cpf: "",
  });
  async function getUsers() {
    if (loading) return;
    
    try {
      setLoading(true);
      setLoadError(false);

      const query = formData.name ? { name: formData.name } : {};
      const data = await searchPeople(query);

      setUsers(data);
      setIsFiltered(!!formData.name);

      if (data.length > 0 && document.visibilityState === 'visible') {
        showToast("Usuários carregados com sucesso!", ToastType.SUCCESS);
      }
    } 
    catch (err) {
      setLoadError(true);

      if (users.length > 0 && err.message !== "Failed to fetch" && document.visibilityState === 'visible') {
        showToast("Erro ao resgatar usuários: " + err.message, ToastType.ERROR);
      }
    } finally {
      setLoading(false);
    }
  }
  async function clearAllFilters() {
    setFormData({
      name: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      naturality: "",
      nationality: "",
      cpf: "",
    });
    setIsFiltered(false);
    
    if (loading) return;
    
    try {
      setLoading(true);
      setLoadError(false);

      const data = await searchPeople({});
      setUsers(data);
    } catch (err) {
      setLoadError(true);

      if (err.message !== "Failed to fetch" && document.visibilityState === 'visible') {
        showToast("Erro ao limpar filtros: " + err.message, ToastType.ERROR);
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    let reconnectTimer;

    if (loadError) {
      reconnectTimer = setTimeout(() => {
        getUsers();
      }, 5000);
    }

    return () => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
    };
  }, [loadError]);

  useEffect(() => {
    if (isLoggedIn) {
      getUsers();
    }
  }, [isLoggedIn]);
  
  const handleLogout = () => {
    logout();
  };

  if (!isLoggedIn) {
    return <AuthPage onAuthSuccess={null} />;
  }

  return (
    <Container>
      <ToastManager />
      <div className="header-container">
        <div>
          <Title>Gerenciamento de Usuários</Title>
          <Description>
            Gerencie os membros da sua equipe e suas permissões de conta aqui.
          </Description>
        </div>
        <UserInfo>
          <FaCircleUser size={24} />
          <span>CPF: {userCpf}</span>
          <LogoutButton onClick={handleLogout} title="Sair">
            <FaSignOutAlt size={18} />
          </LogoutButton>
        </UserInfo>
      </div>
      
      {loading || loadError ? (
        <LoadingState
          message={
            loadError
              ? "Erro ao conectar com o servidor"
              : "Carregando usuários..."
          }
          subtitle={
            loadError
              ? "Tentando reconectar automaticamente..."
              : "Por favor, aguarde enquanto buscamos as informações."
          }
          isError={loadError}
          onRetry={() => getUsers()}
        />
      ) : users.length === 0 && !isFiltered ? (
        <EmptyState onAddClick={() => setIsAddUserModalOpen(true)} />
      ) : (
        <>
          <ControlsContainer>
            <div>
              <AddUserButton onClick={() => setIsAddUserModalOpen(true)} />
              <Button
                title={isFiltered ? "Editar Filtros" : "Adicionar Filtros"}
                icon={<FiFilter />}
                colorButton="#02ffff"
                onClick={() => setIsFilterModalOpen(true)}
              />
              {isFiltered && (
                <span className="filter-badge">
                  Filtros Ativos
                  <MdClear
                    className="clear-icon"
                    onClick={clearAllFilters}
                    title="Limpar filtros"
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                  />
                </span>
              )}
            </div>
          </ControlsContainer>
          {          
          }
          {users.length > 0 ? (
            <Table
              users={users}
              onLastUserDeleted={() => {
                setUsers([]);
                setIsFiltered(false);
                showToast(
                  "Todos os usuários foram removidos!",
                  ToastType.SUCCESS,
                );
              }}              onUserUpdated={(updatedUser) => {
                setUsers(prevUsers => 
                  prevUsers.map(user => 
                    user.cpf === updatedUser.cpf ? updatedUser : user
                  )
                );
              }}
              onUserDeleted={(deletedUserCpf) => {
                setUsers(prevUsers => 
                  prevUsers.filter(user => user.cpf !== deletedUserCpf)
                );
              }}
            />
          ) : (
            <NoResultsState
              onClearFilter={clearAllFilters}
              onShowFilter={() => setIsFilterModalOpen(true)}
            />
          )}
        </>
      )}
      {isFilterModalOpen && (
        <FilterModal
          onClose={() => setIsFilterModalOpen(false)}
          onFilterApplied={(filteredResults) => {
            setUsers(filteredResults);
            setIsFiltered(true);
          }}
        />
      )}
      {isAddUserModalOpen && (
        <AddUserModal
          onClose={() => setIsAddUserModalOpen(false)}
          onUserAdded={getUsers}
        />
      )}
    </Container>
  );
}
