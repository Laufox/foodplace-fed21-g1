import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useState } from 'react'
import { toast } from 'react-toastify'


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
        toast.info('Thanks for your suggestion!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        reset()
    }
  return (
    <>
        <Button variant="outline-primary tip-button" onClick={handleShow} className="mt-3 col-12 col-md-3">
            Give us a tip!
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
                            {errors.email && <div className="invalid">{errors.email.message}</div>}
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
            {errors.tip && <div className="invalid">{errors.tip.message}</div>}
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