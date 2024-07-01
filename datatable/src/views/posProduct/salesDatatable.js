import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import dayjs from 'dayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
// import 'reactjs-popup/dist/index.css'
// import "./Popup.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { DataGrid } from '@mui/x-data-grid'

const salesDatatble = () => {
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'contact', headerName: 'Contact No.' },
    { field: 'itemssold', headerName: 'Item Count' },
    { field: 'grandtotal', headerName: 'Total' },
    // { field: 'paid', headerName: 'Payment' },
    // { field: 'discount', headerName: 'Discount' },
    // { field: 'change', headerName: 'Change' },
    { field: 'date', headerName: 'Date' },
    {
      field: 'edit',
      headerName: 'Edit',
      Selection: false,
      renderCell: () => {
        return (
          <IconButton>
            <EditIcon color="success"></EditIcon>
          </IconButton>
        )
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      Selection: false,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              console.log(params.row)
              sendDelete(params.row)
            }}
          >
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        )
      },
    },
  ]
  return (
    <div>
      <CContainer>
        <DataGrid
          columns={columns}
          rows={[]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          autoHeight
        ></DataGrid>
      </CContainer>
    </div>
  )
}

export default salesDatatble
