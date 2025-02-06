import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { createUsers, fetchUsers, deleteUsers } from '../services/userService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formSchema } from '../utils/formValidation';

const Home = () => {
  const [users, setUsers] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [search, setSearch] = useState('')

  const handleFetch = async () => {
    const response = await fetchUsers()
    setUsers(response)
  }

  const handleCreate = async (values) => {
    const response = await createUsers(values)
    setUsers([...users, response])
    setPopUp(false)
  }
  
  const deleteUser = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE'
    })
    setUsers(users.filter((user) => user.id !== id))
  }

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    )

  useEffect(() => {
    handleFetch()
  }, [])

  const openPopUp = () => {
    setPopUp(true)
  }

  const closePopUp = () => {
    setPopUp(false)
  }

  return (
    <div>
      <div className='search-container'>
        <input type='text' placeholder='Search name, email, or role here' value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div className='container-table'>
      <button className='add-button' onClick={openPopUp}>+ Add Member</button>
      <table>
      <thead>
        <tr className='table-header'>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ROLE</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      {filteredUsers.map((user) => (
      <tbody>
            <tr key={ user.id }>
              <td>{ user.name }</td>
              <td>{ user.email }</td>
              <td>{ user.role }</td>
              <td className='edit-button'><Link to={`/${user.id}`}>Edit</Link>
              <a className='delete-button'href="#" onClick={() => deleteUser(user.id)}>Delete</a></td>
            </tr>
      </tbody>
       ))}
      </table>
      </div>
      <Formik
       initialValues={{name: '', email: '', role: ''}}
       onSubmit={handleCreate}
       validationSchema={formSchema}
      >
      <div style={{ display: popUp ? 'block' : 'none'}} className='add-popup'>
        <div className='form-popup'>
          <Form>
            <h1>Add New Team Member</h1>
            <br></br>
            <label>
              Name
              <br></br>
            </label>
              <br></br>
            <Field type='text' name='name'  />
            <ErrorMessage name='name' component={'div'} style={{color: 'red'}}/>
            <br></br>
            <br></br>
            <label>
              Email
              <br></br>
            </label>
              <br></br>
            <Field type='text' name='email' />
            <ErrorMessage name='email' component={'div'} style={{color: 'red'}}/>
            <br></br>
            <br></br>
            <label>
              Role
              <br></br>
            </label>
              <br></br>
            <Field type='text' name='role' />
            <ErrorMessage name='role' component={'div'} style={{color: 'red'}}/>
            <br></br>
            <br></br>
            <button className='cancel-button' href="#" type='button' onClick={closePopUp}>Cancel</button>
            <button className='addmem-button' type="submit">Add Member</button>
          </Form>
        </div>
      </div>
      </Formik>
    </div>
  )
}

export default Home;