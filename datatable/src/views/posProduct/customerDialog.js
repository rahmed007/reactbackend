import { cibAddthis, cilNoteAdd } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CContainer,
  CButton,
  CFooter,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CForm,
  CTooltip,
} from '@coreui/react'
import { CallToAction, PersonAdd, WidthFull } from '@mui/icons-material'
import { ListItemSecondaryAction } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useState } from 'react'

const CustomerDialog = (props) => {
  let [customerData, updateCustomerData] = useState([])
  const [visibility, setVisibility] = useState(false)
  const [addVisibility, setAddVisibility] = useState(true)
  const [customerName, setCustomerName] = useState('walkin customer')
  let [newCustomerData, setNewCustomerData] = useState({
    customer_type: '',
    name: '',
    contact: '',
    address: '',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const getCustomerData = () => {
    axios
      .get('http://localhost:8000/api/customers')
      .then((res) => {
        updateCustomerData(res.data)
      })
      .catch((err) => console.log(err))
  }

  const newCustomerInput = (evt) => {
    let cname = evt.target.name
    let cvalue = evt.target.value
    // console.log(`${cname}:${cvalue}`)
    // console.log(`${addVisibility}`)
    setNewCustomerData((previousData) => {
      return {
        ...previousData,
        [cname]: cvalue,
      }
    })
  }

  const postcreate = (param) => {
    /// post to add new customer
    const postHeader = { 'Access-Control-Allow-Origin': '*' }
    console.log('this will delete last data')
    try {
      axios
        // .post('http://localhost:8000/api/medicines', drugData)
        .post('http://localhost:8000/api/customer', param)
        .then((res) => {
          console.log(res)
          alert(res.data.message)
        })
        .catch((error) => {
          console.log(error)
          // console.log(error.response.data);
          // alert(error.response.data.message);
        })
    } catch (error) {
      alert(error.response.data)
    }
    console.log('post complete')
  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'customer_type', headerName: 'Type' },
    { field: 'name', headerName: 'Name' },
    { field: 'contact', headerName: 'Contact' },
    { field: 'address', headerName: 'Address', WidthFull: true },
  ]

  const searchInData = (term) => {
    let dataNew = customerData.map((val) => {
      if (
        val.name.toLowerCase().indexOf(term) > -1 ||
        val.contact.toLowerCase().indexOf(searchTerm) > -1
      ) {
        return val
      }
    })
    dataNew = dataNew.filter((val) => val != undefined)
    console.log(dataNew)
    return dataNew
  }

  return (
    <>
      <CInputGroup className="mb-2 px-2">
        <CInputGroupText className="col-sm-4">Customer</CInputGroupText>
        <CFormInput
          onClick={() => {
            setVisibility(true)
            setAddVisibility(true)
            setNewCustomerData({
              customer_type: '',
              name: '',
              contact: '',
              address: '',
            })
            getCustomerData()
            setSearchTerm('')
          }}
          value={customerName}
        ></CFormInput>
      </CInputGroup>
      <CModal
        alignment="center"
        size="lg"
        scrollable
        backdrop={'static'}
        keyboard={false}
        visible={visibility}
        onClose={() => setVisibility(false)}
      >
        <CModalHeader>
          <CModalTitle>Select Customer</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer className="mb-2">
            <div className="d-flex">
              <CTooltip content="Add New Customer">
                <CButton
                  onClick={() => {
                    setAddVisibility(!addVisibility)
                  }}
                >
                  <PersonAdd></PersonAdd>
                </CButton>
              </CTooltip>
              <CFormInput
                autoFocus={true}
                placeholder="Search Customer"
                value={searchTerm}
                onChange={(evt) => {
                  setSearchTerm(evt.target.value)
                  searchInData(searchTerm)
                }}
              ></CFormInput>
            </div>
          </CContainer>
          <CContainer hidden={addVisibility}>
            <CForm>
              <CInputGroup className="mb-2">
                <CInputGroupText className="col-sm-4">Name</CInputGroupText>
                <CFormInput
                  value={newCustomerData.name}
                  name={columns[2].field}
                  onChange={newCustomerInput}
                ></CFormInput>
              </CInputGroup>
              <CInputGroup className="mb-2">
                <CInputGroupText className="col-sm-4">Contact</CInputGroupText>
                <CFormInput
                  value={newCustomerData.contact}
                  name={columns[3].field}
                  onChange={newCustomerInput}
                ></CFormInput>
              </CInputGroup>
              <CInputGroup className="mb-2">
                <CInputGroupText className="col-sm-4">Type</CInputGroupText>
                <CFormInput
                  value={newCustomerData.customer_type}
                  name={columns[1].field}
                  onChange={newCustomerInput}
                ></CFormInput>
              </CInputGroup>
              <CInputGroup className="mb-2">
                <CInputGroupText className="col-sm-4">Address</CInputGroupText>
                <CFormInput
                  value={newCustomerData.address}
                  name={columns[4].field}
                  onChange={newCustomerInput}
                ></CFormInput>
              </CInputGroup>
            </CForm>
          </CContainer>
          <CContainer hidden={!addVisibility}>
            <DataGrid
              autoHeight
              checkboxSelection={true}
              disableMultipleRowSelection={true}
              disableRowSelectionOnClick={false}
              columns={columns}
              rows={searchInData(searchTerm)}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10]}
              onRowSelectionModelChange={(id) => {
                console.log(id)
                try {
                  setCustomerName(customerData[id[0] - 1].name)
                } catch (err) {
                  setCustomerName(undefined)
                }
                console.log(customerName)
              }}
            ></DataGrid>
          </CContainer>
        </CModalBody>
        <CFooter>
          <CButton
            color="secondary"
            onClick={() => {
              console.log('inclose')
              console.log(customerName)
              props.updateCurrentCustomer('walkin customer')
              setVisibility(false)
            }}
          >
            Close
          </CButton>
          <CButton
            disabled={false}
            color="primary"
            onClick={() => {
              if (addVisibility === false) {
                postcreate(newCustomerData)
              }
              console.log(customerName)
              if (customerName != undefined) {
                console.log('inadd')
                console.log(customerName)
                props.updateCurrentCustomer(customerName)
                setVisibility(false)
              }
            }}
          >
            Add
          </CButton>
        </CFooter>
      </CModal>
    </>
  )
}

export default CustomerDialog
