import React, { useEffect, useState } from 'react'
import ProductsTable from './productsTable'
import AddMedicine from './AddMedicine'
import { CButton, CContainer, CRow, CTooltip } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibAddthis, cibClojure, cilLibraryAdd, cilRecycle, cilReload } from '@coreui/icons'
import axios from 'axios'
import { Icon, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { AddAPhoto, Edit } from '@mui/icons-material'
import EditMedicine from './EditMedicine'

const Products = () => {
  let [citem, updateItems] = useState([])

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

  let [addVisibility, updateAddVisibility] = useState(false)
  let [editVisibility, updateEditVisibility] = useState(undefined)

  useEffect(() => {
    refreshTable()
  }, [addVisibility, editVisibility])

  return (
    <>
      <div>
        <div className="container col-md-12 col-sm-8">
          <CRow className="justify-content-start mb-3">
            <div className="col-md-1">
              <CTooltip content="Click to Add New Product" placement="top">
                <CButton
                  color={!addVisibility ? 'success' : 'danger'}
                  onClick={() => {
                    updateAddVisibility(!addVisibility)
                    updateEditVisibility(undefined)
                  }}
                >
                  {!addVisibility ? (
                    <CIcon icon={cibAddthis}></CIcon>
                  ) : (
                    <CIcon icon={cilRecycle}></CIcon>
                  )}
                </CButton>
              </CTooltip>
              <CTooltip content="Refresh" placement="auto">
                <CButton
                  color="warning"
                  onClick={() => {
                    refreshTable()
                  }}
                >
                  <CIcon icon={cilReload}></CIcon>
                </CButton>
              </CTooltip>
            </div>
            <div className="col-md-8">
              {addVisibility && <AddMedicine addItem={updateAddVisibility}></AddMedicine>}
              {editVisibility != undefined && (
                <EditMedicine editItem={updateEditVisibility} item={editVisibility}></EditMedicine>
              )}
            </div>
          </CRow>
        </div>
        <ProductsTable item={citem} editItem={updateEditVisibility}></ProductsTable>
      </div>
    </>
  )
}

export default Products
