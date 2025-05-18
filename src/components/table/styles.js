import styled, { keyframes } from "styled-components";
import { FaCircleUser } from "react-icons/fa6";
import { device } from "../../styles/responsive";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideDown = keyframes`
  from { 
    transform: translateY(-20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-x: auto;
  animation: ${fadeIn} 0.5s ease;

  @media ${device.tablet} {
    padding: 0.5rem;
  }

  @media ${device.mobileL} {
    padding: 0.25rem;
    -webkit-overflow-scrolling: touch; /* Improve scroll on iOS */
  }
`;

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  animation: ${slideDown} 0.5s ease;
  position: relative;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  @media ${device.tablet} {
    font-size: 0.9rem;
    border-radius: 8px;
  }

  @media ${device.mobileL} {
    font-size: 0.8rem;
    margin-top: 0.5rem;
    width: 100%;
    min-width: 320px;
    max-width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

export const Thead = styled.thead`
  background: linear-gradient(90deg, #02ffff, #0088ff);
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const Tbody = styled.tbody`
  background-color: #fff;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
  animation-fill-mode: both;
  animation-delay: ${(props) => props.$index * 0.05}s;

  &:hover {
    background-color: ${(props) =>
      props.$isHeader ? "transparent" : "#f5f9ff"};
    transform: ${(props) => (props.$isHeader ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) =>
      props.$isHeader ? "none" : "0 4px 6px rgba(0, 0, 0, 0.05)"};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const HeaderTr = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(90deg, #02ffff, #0088ff);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  &:hover {
    background: linear-gradient(90deg, #02ffff, #0088ff);
  }
`;

export const Th = styled.th`
  padding: 1rem 1.2rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
  text-transform: uppercase;

  @media ${device.tablet} {
    padding: 0.8rem 1rem;
    font-size: 0.85rem;
  }

  @media ${device.mobileL} {
    padding: 0.6rem 0.75rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }
`;

export const Td = styled.td`
  padding: 1rem 1.2rem;
  font-size: 0.95rem;

  @media ${device.tablet} {
    padding: 0.8rem 1rem;
    font-size: 0.85rem;
  }

  @media ${device.mobileL} {
    padding: 0.6rem 0.75rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }
  color: #555;
  vertical-align: middle;
  transition: all 0.2s;
  svg {
    vertical-align: middle;
    transition: all 0.3s ease;
    color: #ccc;

    &:hover {
      transform: scale(1.15);
    }
  }
`;

export const StatusBadge = styled.span`
  font-weight: 600;
  text-align: center;
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;

  & > :nth-child(1) {
    color: #0088ff;
    font-size: 1.4rem;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 24px;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #0066cc;
      transform: scale(1.2);
    }

    @media ${device.mobileL} {
      font-size: 1.6rem;
      min-width: 34px;
      min-height: 34px;
      padding: 4px;
    }
  }

  & > :nth-child(2) {
    color: #ff3a30;
    font-size: 1.4rem;
    min-width: 24px;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.mobileL} {
      font-size: 1.6rem;
      min-width: 34px;
      min-height: 34px;
      padding: 4px;
    }
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: #cc0000;
      transform: scale(1.2) rotate(90deg);
    }
  }

  @media ${device.mobileL} {
    gap: 1.2rem;
  }
`;

export const Photo = styled(FaCircleUser)`
  font-size: 1.8rem;
  color: #0088ff;
  margin-right: 0.8rem;
  vertical-align: middle;
  filter: drop-shadow(0 2px 4px rgba(0, 136, 255, 0.3));
`;

export const PaginationFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-top: 1rem;
  animation: ${fadeIn} 0.7s ease;

  @media ${device.tablet} {
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }

  @media ${device.mobileL} {
    flex-direction: column;
    gap: 15px;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
  }

  select {
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    font-size: 0.9rem;
    transition: all 0.2s;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #0088ff;
      box-shadow: 0 0 0 3px rgba(0, 136, 255, 0.2);
    }

    &:hover {
      border-color: #0088ff;
    }

    @media ${device.mobileL} {
      font-size: 0.8rem;
      padding: 0.7rem;
      margin-bottom: 10px;
      min-width: 100px;
    }
  }
`;

export const PaginationButton = styled.button`
  padding: 8px 14px;
  border: 1px solid #ddd;
  background-color: ${(props) =>
    props.$active ? "linear-gradient(90deg, #02ffff, #0088ff)" : "#fff"};
  background: ${(props) =>
    props.$active ? "linear-gradient(90deg, #02ffff, #0088ff)" : "#fff"};
  color: ${(props) => (props.$active ? "#fff" : "#555")};
  border-radius: 8px;
  cursor: pointer;
  margin: 0 3px;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$active
      ? "0 4px 8px rgba(0, 136, 255, 0.3)"
      : "0 2px 4px rgba(0, 0, 0, 0.05)"};
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 136, 255, 0.2);
    border-color: #0088ff;
  }

  &:active {
    transform: translateY(0);
  }

  @media ${device.mobileL} {
    padding: 8px 12px;
    font-size: 0.9rem;
    margin: 0 4px;
    min-width: 40px;
    min-height: 40px;
  }
`;
