import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { Button } from "../button";

export function AddUserButton({ onClick, disabled = false }) {
  return (
    <Button
      title="Adicionar Usuário"
      icon={<FaUserPlus />}
      colorButton="#02ffff"
      onClick={onClick}
      disabled={disabled}
      primary={true}
    />
  );
}
