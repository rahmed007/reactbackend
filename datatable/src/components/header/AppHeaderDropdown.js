import React, { useDebugValue, useEffect } from 'react'
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTableDataCell,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useNavigate } from 'react-router-dom'
// import avatar8 from './../../assets/images/avatars/8.jpg'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from './../../../src/userProcess'

const AppHeaderDropdown = () => {
  const username = useSelector((state) => state.siginChange.name)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (username == 'Login') {
      console.log('User is not login')
      try {
        let data = sessionStorage.getItem('currentUser')
        if (data != null) {
          console.log(data)
          data = JSON.parse(data)
          console.log(data)
          console.log(data.token)
          console.log(data.username)
          console.log('logging in')
          dispatch({ type: 'login', name: data.username })
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('user is loged in')
    }
    // if (data != null) {
    //   if (data.username === 'logout') {
    //     dispatch({ type: 'logout' })
    //   }
    //   dispatch(z{ type: 'login', token: data.token, name: data.username })
    //   console.log(username)
    // } else {
    //   dispatch({ type: 'logout' })
    // }
  }, [username])
  return (
    <>
      {username === 'Login' && (
        <CButton color="primary" onClick={() => navigate('/login')}>
          Sign In
        </CButton>
      )}
      {username != 'Login' && (
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
            {/* <CAvatar src={avatar8} size="md" /> */}
            <CAvatar color="secondary" textColor="white" size="lg">
              {username.charAt(0).toUpperCase()}
            </CAvatar>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            {/* <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
              Account
            </CDropdownHeader>
            <CDropdownItem href="#">
              <CIcon icon={cilBell} className="me-2" />
              Updates
              <CBadge color="info" className="ms-2">
                42
              </CBadge>
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilEnvelopeOpen} className="me-2" />
              Messages
              <CBadge color="success" className="ms-2">
                42
              </CBadge>
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilTask} className="me-2" />
              Tasks
              <CBadge color="danger" className="ms-2">
                42
              </CBadge>
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilCommentSquare} className="me-2" />
              Comments
              <CBadge color="warning" className="ms-2">
                42
              </CBadge>
            </CDropdownItem> */}
            <CDropdownHeader className="bg-body-secondary fw-semibold my-2">
              Settings
            </CDropdownHeader>
            <CDropdownItem onClick={()=>navigate("/profile")}>
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilSettings} className="me-2" />
              Settings
            </CDropdownItem>
            {/* <CDropdownItem href="#">
              <CIcon icon={cilCreditCard} className="me-2" />
              Payments
              <CBadge color="secondary" className="ms-2">
                42
              </CBadge>
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilFile} className="me-2" />
              Projects
              <CBadge color="primary" className="ms-2">
                42
              </CBadge>
            </CDropdownItem> */}
            <CDropdownDivider />
            <CDropdownItem
              onClick={() => {
                logoutUser(dispatch, navigate)
              }}
            >
              <CIcon icon={cilLockLocked} className="me-2" />
              Logout
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      )}
    </>
  )
}

export default AppHeaderDropdown
