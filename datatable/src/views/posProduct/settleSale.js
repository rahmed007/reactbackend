import React from 'react'
import ProductsTable from '../posProduct/productsTable'
import salePOS from './salePOS'

const settleSale = () => {
  return (
    <>
      <h1>This is to return items sold earlier</h1>
      
      <ProductsTable item={[]} />
      <salePOS></salePOS>
    </>
  )
}

export default settleSale
