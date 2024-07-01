import React, { useState } from 'react'
import axios from 'axios'
import 'reactjs-popup/dist/index.css'
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
  CRow,
} from '@coreui/react'
import ProductsTable from './productsTable'

// const postcreate = (drugData) => {
//   const postHeader = { 'Access-Control-Allow-Origin': '*' }
//   console.log('this will delete last data')
//   try {
//     axios
//       .post('http://localhost:8000/create', drugData, postHeader)
//       .then((res) => {
//         alert(res.data.message)
//       })
//       .catch((error) => {
//         // console.log(error.response.data);
//         // alert(error.response.data.message);
//         console.log(error)
//       })
//   } catch (error) {
//     alert(error.response.data)
//   }
//   console.log('post complete')
// }
const AddMedicine = (props) => {
  const postcreate = (drugData) => {
    const postHeader = { 'Access-Control-Allow-Origin': '*' }
    console.log('this will delete last data')
    try {
      axios
        // .post('http://localhost:8000/api/medicines', drugData)
        .post('http://localhost:8000/api/products', drugData)
        .then((res) => {
          console.log(res)
          alert(res.data.message)
          props.refreshTable()
        })
        .catch((error) => {
          console.log(error)
          props.refreshTable()
          // console.log(error.response.data);
          // alert(error.response.data.message);
        })
    } catch (error) {
      alert(error.response.data)
    }
    console.log('post complete')
  }

  /// following code allows user inputs
  // let fields = ['name', 'formula', 'manufacturer', 'expiry_date', 'unitquantity', 'unitrate']
  let fieldsHeader = [
    'Category',
    'Barcode',
    'Name',
    'Desciption',
    'Manufacturer',
    'Rack',
    'Purchase',
    'Retail Price',
    'Expiry',
  ]
  let fields = [
    'category',
    'barcode',
    'product_name',
    'description',
    'manufacturer',
    'rack_location',
    'purchase_price',
    'retail_price',
    'expiry_date',
  ]
  let [cfields, updatedcfields] = useState({
    category: '',
    barcode: '',
    product_name: '',
    description: '',
    manufacturer: '',
    rack_location: '',
    purchase_price: '',
    retail_price: '',
    expiry_date: '',
  })

  const onChangeEvent = (event) => {
    let cname = event.target.name
    let cvalue = event.target.value
    updatedcfields((previousData) => {
      return {
        ...previousData,
        [cname]: cvalue,
      }
    })
  }
  // end of user input part
  return (
    <>
      <CCard>
        <CCardHeader>Add Products</CCardHeader>
        <CCardBody>
          <CForm>
            <div className="d-flex col-12">
              <CInputGroup className="mb-2 me-1">
                <CInputGroupText className="col-sm-6">{fieldsHeader[0]}</CInputGroupText>
                <CFormInput
                  name={fields[0]}
                  onChange={onChangeEvent}
                  value={cfields.category}
                ></CFormInput>
              </CInputGroup>
              <CInputGroup className="mb-2 ms-1">
                <CInputGroupText className="col-sm-6">{fieldsHeader[1]}</CInputGroupText>
                <CFormInput
                  name={fields[1]}
                  onChange={onChangeEvent}
                  value={cfields.barcode}
                ></CFormInput>
              </CInputGroup>
            </div>
            <CInputGroup className="mb-2">
              <CInputGroupText className="col-sm-3">{fieldsHeader[2]}</CInputGroupText>
              <CFormInput
                name={fields[2]}
                onChange={onChangeEvent}
                value={cfields.product_name}
              ></CFormInput>
            </CInputGroup>
            <CInputGroup className="mb-2">
              <CInputGroupText className="col-sm-3">{fieldsHeader[3]}</CInputGroupText>
              <CFormInput
                name={fields[3]}
                onChange={onChangeEvent}
                value={cfields.description}
              ></CFormInput>
            </CInputGroup>
            <div className="d-flex col-12">
              <CInputGroup className="mb-2 me-1">
                <CInputGroupText className="col-sm-6">{fieldsHeader[4]}</CInputGroupText>
                <CFormInput
                  name={fields[4]}
                  onChange={onChangeEvent}
                  value={cfields.manufacturer}
                ></CFormInput>
              </CInputGroup>
              <CInputGroup className="mb-2 ms-1">
                <CInputGroupText className="col-sm-6">{fieldsHeader[5]}</CInputGroupText>
                <CFormInput
                  name={fields[5]}
                  onChange={onChangeEvent}
                  value={cfields.rack_location}
                ></CFormInput>
              </CInputGroup>
            </div>
            <div className="col-12 d-flex">
              <CInputGroup className="mb-2 me-1">
                <CInputGroupText className="col-sm-6">{fieldsHeader[6]}</CInputGroupText>
                <CFormInput
                  name={fields[6]}
                  onChange={onChangeEvent}
                  value={cfields.purchase_price}
                ></CFormInput>
              </CInputGroup>
              {/* </div>
              <div className="col-4"> */}
              <CInputGroup className="mb-2 ms-1">
                <CInputGroupText className="col-sm-6">{fieldsHeader[7]}</CInputGroupText>
                <CFormInput
                  name={fields[7]}
                  onChange={onChangeEvent}
                  value={cfields.retail_price}
                ></CFormInput>
              </CInputGroup>
            </div>
            <CInputGroup className="mb-2">
              <CInputGroupText className="col-sm-3">{fieldsHeader[8]}</CInputGroupText>
              <CFormInput
                name={fields[8]}
                onChange={onChangeEvent}
                value={cfields.expiry_date}
              ></CFormInput>
            </CInputGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton
            color="primary"
            className="mx-2"
            onClick={() => {
              console.log(cfields)
              postcreate(cfields)
              props.addItem(false)
            }}
          >
            Add
          </CButton>
          <CButton
            color="warning   "
            className="mx-2"
            onClick={() => {
              updatedcfields({
                name: '',
                formula: '',
                manufacturer: '',
                expiry_date: '',
                unitquantity: '',
                unitrate: '',
              })
            }}
          >
            Clear
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default AddMedicine
