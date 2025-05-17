import styled from "styled-components";
import { FaCircleUser } from "react-icons/fa6";

export const Container = styled.div`
  width: 95%;
  align-items: center;
  justify-content: center;
  margin-left: 2.5%;
`;

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Thead = styled.thead`
  background-color: #f5f5f5;
`;

export const Tbody = styled.tbody`
  background-color: #fff;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #444;
  vertical-align: middle;

  svg {
    vertical-align: middle;
  }
`;

export const StatusBadge = styled.span`
  font-weight: 600;
  text-align: center;
  width: 100%;

  & > :nth-child(1) {
    color: blue;
    font-size: 1.3rem;
  }

  & > :nth-child(2) {
    color: red;
    font-size: 2rem;
  }
`;

export const Photo = styled(FaCircleUser)`
  font-size: 24px;
  color: #333;
  margin-right: 8px;
`;

export const PaginationFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: -10px;
  margin-top: 10px;
`;