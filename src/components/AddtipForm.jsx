import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useState } from 'react'


const AddtipForm = () => {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onCreateTip = async (data) => {
        await addDoc(collection(db, 'tip'),{
            email: data.email,
            tip: data.tip
        })
        
        toast.success("Your tip has been sent!")

    }
  return (
    <>
        <Button variant="info" onClick={handleShow}>
            Give us a tip about a plce!
        </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Give us a tip! Have we missed you favorite food place?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onCreateTip)} noValidate>

                {/* Form for Email */}
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                        <Form.Control
                            {...register("email",{
                                required: "An email is required",
                                minLength: {
                                    value: 2,
                                    message:"Must atlest be 2 characters"
                                }
                            })}
                            placeholder="Email"
                            type="text"
                            />
                </Form.Group>

         {/* Form for tip */}
         <Form.Group>
            <Form.Label>Give us a tip!</Form.Label>
            <Form.Control
            {...register("tip",{
                required: "An tip is required",
                minLength: {
                    value: 2,
                    message:"Must atlest be 2 characters"
                }
            })}
            placeholder="Write your tip here"
            as="textarea"
            />
            
            <Modal.Footer>
                <Button variant="success" type="submit">Send</Button>
            </Modal.Footer>
        </Form.Group>
    </Form>
    </Modal.Body>
    </Modal>
    </>
  )
}

export default AddtipForm