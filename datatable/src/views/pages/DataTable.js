import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CContainer,
  CHeader,
  CSpinner,
  CTable,
  useColorModes,
} from '@coreui/react'

import { DataGrid } from '@mui/x-data-grid'
import { Icon, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { reference } from '@popperjs/core'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Edit } from '@mui/icons-material'
// import './scss/style.scss'

const Datatable = () => {
  let [citem, updateItems] = useState([])

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'formula', headerName: 'Formula' },
    { field: 'manufacturer', headerName: 'Manufacturer' },
    { field: 'expiry_date', headerName: 'Expiry' },
    {
      field: 'edit',
      headerName: 'Edit',
      Selection: false,
      // renderCell: (params) => {
      //     return <EditMedicine rowData={params.row} updateData={refreshTable}></EditMedicine>;
      // },
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
              // alert("I am clicked to delete the selected row");
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

  const refreshTable = () => {
    console.log('refreshing')
    axios
      .get('http://localhost:8000/api/medicines')
      .then((res) => {
        console.log(res)
        updateItems(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <CContainer className="justify-content-center d-flex flex-column align-items-center">
          <CCard className="col-md-10">
            <CCardBody>
              <CCardTitle className="my-2">Medicine Data Table</CCardTitle>
              <CButton
                color="success mx-2"
                onClick={() => {
                  refreshTable()
                }}
              >
                Refresh
              </CButton>
              <CButton color="primary mx-2"> Add New</CButton>
              {/* <CButton color="danger mx-2"> Delete</CButton> */}
            </CCardBody>
          </CCard>
          <DataGrid
            className="col-md-10 mx-4"
            columns={columns}
            rows={citem}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection={true}
          ></DataGrid>
        </CContainer>
      </div>
    </>
  )
}

export default Datatable
