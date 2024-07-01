import React, { useEffect, useState } from 'react'
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import { DataGrid } from '@mui/x-data-grid'
import { Autocomplete, TextField } from '@mui/material'
import { auto } from '@popperjs/core'
import axios from 'axios'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { DialogActions } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogContentText } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import { YoutubeSearchedForSharp } from '@mui/icons-material'
import ProductsTable from './productsTable'

const InsertSaleItem = () => {
  let [citem, updateItems] = useState([])
  const [open, setOpen] = React.useState(false)
  const [dispValue, updateValue] = useState(undefined)
  const [editVisibility, updateEditVisibility] = useState(undefined)
  const [modalAvailability, setModalAvailability] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const refreshTable = (evt) => {
    console.log(evt)
    console.log('refreshing')
    axios
      // .get('http://localhost:8000/api/medicines')
      .get('http://localhost:8000/api/products')
      .then((res) => {
        console.log(res)
        updateItems(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    refreshTable()
    if (dispValue != undefined) {
      alert(dispValue)
    }
  }, [dispValue])

  // code to allow user input data for product entry
  let productFields = ['pname', 'unitrate', 'quantity', 'discount', 'unittotal']
  let [productFieldsInput, updateProductFieldsInput] = useState({
    pname: '',
    unitrate: '',
    quantity: '',
    discount: '',
    unittotal: '',
  })
  const onProductInput = (event) => {
    let cname = event.target.name
    let cvalue = event.target.value
    console.log(`${cname}+${cvalue}`)
    console.log(cvalue)
    // console.log(cvalue)
    updateProductFieldsInput((previousData) => {
      return {
        ...previousData,
        [cname]: cvalue,
      }
    })
  }
  return (
    <>
      <CContainer>
        <CForm>
          <CInputGroup className="mb-2">
            <CInputGroupText className="col-sm-4">Product</CInputGroupText>
            <CFormInput
              placeholder="Select Product"
              name={productFields[0]}
              value={productFieldsInput.pname}
              // onChange={onProductInput}
              onClick={() => setModalAvailability(!modalAvailability)}
            ></CFormInput>
            <CModal
              alignment="center"
              size="lg"
              scrollable
              backdrop={'static'}
              keyboard={false}
              visible={modalAvailability}
              className="col-md-8 flex-column d-flex justify-content-center align-items-center mx-4 my-4"
            >
              <CModalTitle className="d-flex justify-content-center align-items-center my-4">
                Insert Data
              </CModalTitle>
              <CModalBody>
                <ProductsTable item={citem} editItem={updateEditVisibility}></ProductsTable>
              </CModalBody>
              <CModalFooter className='d-flex justify-content-around'>
                <CButton color='primary'>Select</CButton>
                <CButton color='danger'>Close</CButton>
              </CModalFooter>
            </CModal>
            {/* <div className="d-flex flex-grow-1">
              <Autocomplete
                fullWidth
                sx={{ backgroundColor: 'white', margin: 0, padding: 0 }}
                options={citem}
                getOptionLabel={(option) => option.description}
                renderOption={(prop, option) => (
                  <>
                    <div {...prop}>
                      <span>
                        {option.product_name}|{option.description}|{option.rack_location}
                      </span>
                    </div>
                  </>
                )}
                onChange={(evt, selected) => {
                  evt.target.name = productFields[0]
                  evt.target.value = selected.product_name
                  onProductInput(evt)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    sx={{ margin: 0, padding: 0 }}
                  ></TextField>
                )}
              ></Autocomplete>
            </div> */}
          </CInputGroup>
          <CInputGroup className="mb-2">
            <CInputGroupText className="col-sm-4">Rate/Unit</CInputGroupText>
            <CFormInput
              placeholder="Cost/Unit"
              name={productFields[1]}
              value={productFieldsInput.unitrate}
              onChange={onProductInput}
            ></CFormInput>
          </CInputGroup>
          <CInputGroup className="mb-2">
            <CInputGroupText className="col-sm-4">Quantity</CInputGroupText>
            <CFormInput
              placeholder="Quantity"
              name={productFields[2]}
              value={productFieldsInput.quantity}
              onChange={onProductInput}
            ></CFormInput>
          </CInputGroup>
          <CInputGroup className="mb-2">
            <CInputGroupText className="col-sm-4">Discount</CInputGroupText>
            <CFormInput
              placeholder="Discount"
              name={productFields[3]}
              value={productFieldsInput.discount}
              onChange={onProductInput}
            ></CFormInput>
          </CInputGroup>
          <CInputGroup className="mb-2">
            <CInputGroupText className="col-sm-4">Total Price</CInputGroupText>
            <CFormInput
              placeholder="Total Price"
              name={productFields[4]}
              value={productFieldsInput.unittotal}
              onChange={onProductInput}
            ></CFormInput>
          </CInputGroup>
        </CForm>
        <div className="container d-flex flex-row justify-content-center mx-1 mb-4">
          <CButton color="primary" className="mx-1" onClick={() => console.log(productFieldsInput)}>
            <CIcon icon={cibAddthis}></CIcon>
          </CButton>
          <CButton
            color="warning"
            className="mx-1"
            onClick={() => {
              updateProductFieldsInput({
                pname: '',
                unitrate: '',
                quantity: '',
                discount: '',
                unittotal: '',
              })
            }}
          >
            <CIcon icon={cilRecycle}></CIcon>
          </CButton>
          <CButton color="success" className="mx-1">
            <CIcon icon={cilWallpaper}></CIcon>
          </CButton>

          <CButton
            onClick={() => {
              setOpen(true)
            }}
          >
            <PersonIcon></PersonIcon>
          </CButton>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle id="alert-dialog-title">{'Delete Record?'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Are you sure?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  updateValue('yes')
                  handleClose()
                }}
              >
                Yes
              </Button>
              <Button
                autoFocus
                onClick={() => {
                  updateValue('no')
                  handleClose()
                }}
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </CContainer>
    </>
  )
}

export default InsertSaleItem
