import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { CCard, CContainer, CHeader, CRow, CCol, CCardBody, CForm, CFormInput, CInputGroup, CInputGroupText, CTooltip, CButton } from '@coreui/react'
import { profileUser } from '../../../userProcess'
import CIcon from '@coreui/icons-react'
import { cibBandcamp, cibKeybase, cibKeycdn, cilKeyboard } from '@coreui/icons'


const Profile = () => {
  const username = useSelector((state) => state.siginChange.name)
  const email = useSelector((state) => state.siginChange.email)
  const dispatch = useDispatch()

  useEffect(() => {
    profileUser(dispatch)
  }, [])
  return (
    <>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
            <CCard>
              <CCardBody className=''>
                <CForm>
                  <h1>{username}</h1>
                  <p>{email}</p>
                  <h3>Change Password</h3>
                  <CInputGroup className='mb-4'>
                    <CInputGroupText>
                        <CIcon icon={cilKeyboard}></CIcon>
                    </CInputGroupText>
                    <CTooltip content="Password">
                    <CFormInput></CFormInput>
                    </CTooltip>
                  </CInputGroup>
                  <CInputGroup className='mb-4'>
                    <CInputGroupText>
                        <CIcon icon={cilKeyboard}></CIcon>
                    </CInputGroupText>
                    <CTooltip content="Repeat Password">
                    <CFormInput></CFormInput>
                    </CTooltip>
                  </CInputGroup>
                </CForm>
              <CButton className='btn btn-primary'>Change Password</CButton>
              </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Profile
