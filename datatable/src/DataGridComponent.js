import { React, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import dayjs from "dayjs";
import "./TableComponent.css";
// import Clock from "react-live-clock";

const rows = [
  { name: "Elizabeth", start: 1565, end: 1603, id: 0 },
  { name: "James I", start: 1603, end: 1625, id: 1 },
  { name: "Charles I", start: 1625, end: 1649, id: 2 },
  {
    name: "Cromwell",
    start: 1649,
    end: 1660,
    commonwealth: true,
    id: 3,
  },
  { name: "Charles II", start: 1660, end: 1685, id: 4 },
  { name: "James II", start: 1685, end: 1689, id: 5 },
  { name: "W&M", start: 1689, end: 1702, id: 6 },
  { name: "Anne", start: 1702, end: 1714, id: 7 },
  { name: "George I", start: 1714, end: 1727, id: 8 },
  { name: "George II", start: 1727, end: 1760, id: 9 },
  { name: "George III", start: 1760, end: 1820, id: 10 },
  { name: "George IV", start: 1820, end: 1820, id: 11 },
];

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "start", headerName: "Start" },
  { field: "end", headerName: "end" },
];

const DataGridComponent = (props) => {
  return (
    <>
      
      {/* <h1>{dataTable.length}</h1> */}
      <DataGrid
        columns={columns}
        rows={props.datatable}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={true}
      ></DataGrid>
    </>
  );
};

export default DataGridComponent;
