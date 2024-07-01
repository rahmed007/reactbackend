import {
  cibAddthis,
  cibCplusplus,
  cilNoteAdd,
  cilPaperclip,
  cilRecycle,
  cilReportSlash,
  cilUser,
  cilUserPlus,
  cilWallpaper,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormText,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DataGrid } from '@mui/x-data-grid'
import { TextField } from '@mui/material'
import { Autocomplete } from '@mui/material'

import axios from 'axios'

import React, { useState, useEffect } from 'react'
import InsertSaleItem from './insertSaleItem'
import CustomerDialog from './customerDialog'

const salePOS = () => {
  let [saleItems, updateSaleItems] = useState([])
  let [selectedCustomer, updateSelectedCustomer] = useState({ name: 'walkin', contact: '000-0000' })

  // get customer data to be added
  let [customerData, updateCustomerData] = useState([])
  const [customerName, setCustomerName] = useState('walkin customer') // selected customer

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

  // checkout data change handling
  let checkoutFields = ['grandTotal', 'discount', 'paid', 'change']
  let [checkoutData, updateCheckout] = useState({
    grandTotal: '',
    discount: '',
    paid: '',
    change: '',
  })

  const changeCheckoutText = (event) => {
    let cname = event.target.name
    let cvalue = event.target.value

    updateCheckout((previousData) => {
      return {
        ...previousData,
        [cname]: cvalue,
      }
    })
  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'rate', headerName: 'Unit Cost' },
    { field: 'count', headerName: 'Quantity' },
    { field: 'totalcost', headerName: 'Total Cost' },
    // {field: 'inventory', headerName:'Inventory'},
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
  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-align-items-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1>Rukhsar Point of Sale</h1>
        </div>
        <CRow>
          <CContainer className="my-4 col-md-4 col-sm-6">
            <CustomerDialog
              data={customerData}              
              updateCurrentCustomer={setCustomerName}
            ></CustomerDialog>
            <InsertSaleItem></InsertSaleItem>
          </CContainer>
          <CContainer className="my-4 col-md-8 col-sm-6">
            <DataGrid
              className="mb-4"
              columns={columns}
              rows={saleItems}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 10 } },
              }}
              pageSizeOptions={[5, 10]}
              autoHeight
              // checkboxSelection={true}
            ></DataGrid>
            <CForm className="mx-4">
              <CInputGroup className="my-2">
                <CInputGroupText className="col-sm-2">Grand Total</CInputGroupText>
                <CFormInput
                  name={checkoutFields[0]}
                  value={checkoutData.grandTotal}
                  onChange={changeCheckoutText}
                ></CFormInput>
              </CInputGroup>
              <CInputGroup className="my-2">
                <CInputGroupText className="col-sm-2">Discount</CInputGroupText>
                <CFormInput
                  name={checkoutFields[1]}
                  value={checkoutData.discount}
                  onChange={changeCheckoutText}
                ></CFormInput>
              </CInputGroup>
              <CInputGroup className="my-2">
                <CInputGroupText className="col-sm-2">Payment</CInputGroupText>
                <CFormInput
                  name={checkoutFields[2]}
                  value={checkoutData.paid}
                  onChange={changeCheckoutText}
                ></CFormInput>
              </CInputGroup>
              <CInputGroup className="my-2">
                <CInputGroupText className="col-sm-2">Change</CInputGroupText>
                <CFormInput
                  name={checkoutFields[3]}
                  value={checkoutData.change}
                  onChange={changeCheckoutText}
                ></CFormInput>
              </CInputGroup>
            </CForm>
            <CRow className="justify-content-end mx-1">
              <CButton color="primary" className="m-1 col-sm-2">
                Previous
              </CButton>
              <CButton color="primary" className="m-1 col-md-2">
                Hold
              </CButton>
              <div className="col-md-5"></div>
              <CButton color="success" className="m-1 col-md-2">
                Checkout
              </CButton>
            </CRow>
          </CContainer>
        </CRow>
      </div>
    </>
  )
}

export default salePOS
