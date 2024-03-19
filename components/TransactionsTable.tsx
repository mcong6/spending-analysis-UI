"use client";
import React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Container } from "@mui/material";
import trans from "../data/transactions.json";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BuildIcon from "@mui/icons-material/Build";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const columns: GridColDef[] = [
  { field: "id", headerName: "id", width: 90, hide: true },
  { field: "Transaction Date", headerName: "Transaction Date", width: 120 },
  // {
  //   field: "Post Date",
  //   headerName: "Post Date",
  //   type:'date',
  //   editable: true,
  // },
  {
    field: "Description",
    headerName: "Description",
    // width: 300,
    flex: 0.5,
    // minWidth: 50,
    // editable: true,
    // getRowHeight={() => 'auto'}
  },
  {
    field: "Category",
    headerName: "Category",
    width: 120,
    editable: true,
  },
  {
    field: "Type",
    headerName: "Type",
    renderCell: (params) => {
      if (params.value === "Sale") {
        return (
          <div>
            {params.value} <ReceiptIcon color="primary" />
          </div>
        );
      } else if (params.value === "Payment") {
        return (
          <div>
            {params.value} <PaymentIcon color="primary" />
          </div>
        );
      } else if (params.value === "Fee") {
        return (
          <div>
            {params.value} <AccountBalanceIcon color="primary" />
          </div>
        );
      } else if (params.value === "Adjustment") {
        return (
          <div>
            {params.value} <BuildIcon color="primary" />
          </div>
        );
      } else if (params.value === "Return") {
        return (
          <div>
            {params.value} <KeyboardReturnIcon color="primary" />
          </div>
        );
      }
    },
    editable: true,
  },
  {
    field: "Amount",
    headerName: "Amount",
    width: 90,
    type: "number",
    valueGetter: ({ value }) => value.toFixed(2),
  },
  {
    field: "Source",
    headerName: "Source",
    width: 140,
    editable: true,
  },
  {
    field: "Memo",
    headerName: "Memo",
    editable: true,
  },
];

// const rows = trans;
const TransactionsTable = ({ rows }) => {
  return (
    <Container className="mt-5 shadow-md p-0">
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          columnVisibilityModel={{
            id: false,
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default TransactionsTable;
