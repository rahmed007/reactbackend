import axios from 'axios'

export const logoutUser = (dispatch, navigate) => {
  try {
    let data = sessionStorage.getItem('currentUser')
    console.log(data)
    data = JSON.parse(data)
    let header = { Accept: 'application/json', Authorization: `Bearer ${data.token}` }
    console.log(header)
    axios
      .get('http://localhost:8000/api/logout', { headers: header })
      .then((data) => {
        console.log(data)
        dispatch({ type: 'logout' })
        sessionStorage.removeItem('currentUser')
        navigate('/dashboard')
      })
      .catch((err) => {
        console.log('error arrived')
        console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
}

export const processlogin = (userDetails, dispatch, navigate) => {
  console.log(userDetails)
  axios
    .post('http://localhost:8000/api/login', userDetails)
    .then((data) => {
      console.log(data)
      if (data.data.status == 'true') {
        // alert(data.data.message)
        sessionStorage.setItem(
          'currentUser',
          JSON.stringify({ token: data.data.token, username: userDetails.email }),
        )
        navigate('/dashboard')
        dispatch({ type: 'login', name: userDetails.email, email: userDetails.email })
      } else {
        alert('please login again')
      }
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status == 401) {
        alert(err.response.data.message)
      }
    })
}

export const profileUser = (dispatch) => {
  try {
    let data1 = sessionStorage.getItem('currentUser')
    console.log(data1)
    data1 = JSON.parse(data1)
    let header = { Accept: 'application/json', Authorization: `Bearer ${data1.token}` }
    console.log(header)
    axios
      .get('http://localhost:8000/api/profile', { headers: header })
      .then((data) => {
        console.log(data.data.date)
        dispatch({
          type: 'login',
          name: data.data.date.name,
          email: data.data.date.email,
          token: data1.token,
        })
      })
      .catch((err) => {
        console.log('error arrived during profile')
        console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
}
