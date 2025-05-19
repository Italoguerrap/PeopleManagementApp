import { css } from "styled-components";
import { device } from "./responsive";

export const responsiveTableStyles = css`
  @media ${device.mobileL} {
    .responsive-table {
      display: block;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: -ms-autohiding-scrollbar; /* Para IE11 */
    }

    .table-scroll-indicator {
      display: block;
      text-align: center;
      color: #666;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      padding: 5px;
      background-color: rgba(245, 245, 245, 0.8);
      border-radius: 20px;
      animation: fadeInOut 3s infinite;
    }

    @keyframes fadeInOut {
      0%,
      100% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
    }
  }
`;

export const tableToCards = css`
  @media ${device.mobileL} {
    .table-to-cards {
      thead {
        display: none;
      }

      tr {
        display: block;
        margin-bottom: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        background-color: #fff;
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;

        &:hover,
        &:active {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      }

      td {
        display: block;
        text-align: right;
        padding: 0.8rem 0.5rem;
        position: relative;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }

        &:before {
          content: attr(data-label);
          float: left;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 0.75rem;
          color: #666;
          padding-right: 10px;
        }

        &[data-value] {
          font-weight: 500;
          color: #333;
        }
      }

      .action-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 0.5rem;
      }
    }
  }
`;

export const horizontalResponsiveTable = css`
  @media ${device.tablet} {
    .responsive-columns {
      th,
      td {
        &.priority-low {
          display: none;
        }
      }
    }
  }

  @media ${device.mobileL} {
    .responsive-columns {
      th,
      td {
        &.priority-medium {
          display: none;
        }
      }

      th,
      td {
        padding: 8px 6px;
        font-size: 0.9rem;

        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export const responsiveNumericData = css`
  @media ${device.mobileL} {
    .numeric-data {
      text-align: right;
      font-variant-numeric: tabular-nums;

      &.currency:before {
        content: "R$";
        margin-right: 2px;
        opacity: 0.7;
      }

      &.percentage:after {
        content: "%";
        margin-left: 2px;
        opacity: 0.7;
      }
    }
  }
`;

export default {
  responsiveTableStyles,
  tableToCards,
  horizontalResponsiveTable,
  responsiveNumericData,
};
