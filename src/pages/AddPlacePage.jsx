import Container from 'react-bootstrap/Container'
import CreatePlaceForm from '../components/CreatePlaceForm'
import { useAuthContext } from '../contexts/AuthContext'
// hooks
import useAdmin from '../hooks/useAdmin'
import useUsers from '../hooks/useUsers'
// loader
import BeatLoader from 'react-spinners/BeatLoader'


const AddPlacePage = () => {
  const{ data: users, loading } = useUsers()
  const { currentUser } = useAuthContext()
  const id = currentUser.uid
  const { isAdmin } = useAdmin(id) 


  return (
    <Container className="py-3">
            <h1 className='h-text-color-dark'>Add a new place</h1>

            {loading && <BeatLoader  color='#F27166' /> }
      
      {!loading && 
        <>
          {/* switching between general users and admins */}
          {isAdmin &&
            <CreatePlaceForm />
          }      
        </>
      }    
    </Container>
  )
}

export default AddPlacePage
