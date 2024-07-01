import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useActionData, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  })
  const navigate = useNavigate()

  const onRegisterChange = (evt) => {
    let cname = evt.target.name
    let cvalue = evt.target.value
    setRegisterData((previous) => {
      return {
        ...previous,
        [cname]: cvalue,
      }
    })
  }
  const requestRegistration = () => {
    const buf = registerData
    if (buf.password != buf.passwordRepeat) {
      alert('password donot match')
      return
    }
    console.log(buf)
    delete buf.passwordRepeat
    console.log(buf)
    axios
      .post('http://localhost:8000/api/register', buf)
      .then(() => {
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.message)
      })
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      name={'name'}
                      value={registerData.name}
                      onChange={onRegisterChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      name={'email'}
                      value={registerData.email}
                      onChange={onRegisterChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name={'password'}
                      value={registerData.password}
                      onChange={onRegisterChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name={'passwordRepeat'}
                      value={registerData.passwordRepeat}
                      onChange={onRegisterChange}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={requestRegistration}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
