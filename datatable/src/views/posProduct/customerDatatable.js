import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import dayjs from 'dayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
// import 'reactjs-popup/dist/index.css'
import { Icon, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { AddAPhoto, Edit } from '@mui/icons-material'
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

const customerDatatable = () => {
  let [customerData, updateCustomerData] = useState([])

  useEffect(() => {
    getCustomerData()
  }, [])

  const getCustomerData = () => {
    axios
      .get('http://localhost:8000/api/customers')
      .then((res) => {
        updateCustomerData(res.data)
      })
      .catch((err) => console.log(err))
  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'customer_type', headerName: 'Type' },
    { field: 'name', headerName: 'Name' },
    { field: 'contact', headerName: 'Contact' },
    { field: 'address', headerName: 'Address' },
    // { field: 'purchase', headerName: 'Purchase' },
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
          rows={customerData}
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

export default customerDatatable
