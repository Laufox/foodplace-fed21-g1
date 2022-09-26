import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import mapsAPI from '../services/mapsAPI'

const CreatePlaceForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

//     const onCreateTip = async (data) => {
//         // making a firestore doc
//     await addDoc(collection(db, 'tip'), {
//         adress: data.adress,
//         cuisine: data.cuisine,
//         description: data.description,
//         email: data.email,
//         facebook: data.facebook,
//         instagram: data.instagram,
//         name: data.name,
//         phonenumber: data.phonenumber,
//         supply: data.supply,
//         town: data.town,
//         type: data.type,
//         website: data.website,

//     })

//     toast.success("A new Tip was created! Waiting for admin to approve!")
//     reset()
// }

    const onCreatePlace = async (data) => {
            // making a firestore doc
        await addDoc(collection(db, 'places'), {
            adress: data.adress,
            cuisine: data.cuisine,
            description: data.description,
            email: data.email,
            facebook: data.facebook,
            instagram: data.instagram,
            name: data.name,
            phonenumber: data.phonenumber,
            supply: data.supply,
            town: data.town,
            type: data.type,
            website: data.website,
            coords: await mapsAPI.getLatAndLng(data.adress + data.town)
        })

        toast.success("A new Place was created! Yey!")
        //reset()
    }
    return (
        <Form onSubmit={handleSubmit(onCreatePlace)} noValidate>

            {/* Form for name */}
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                {...register("name", {
                    required: "A name is required",
                    minLength: {
                        value: 2,
                        message: "Must atlest be 2 charatcers"
                    }
                })}
                placeholder="Name"
                type="text"
                />
            </Form.Group>

                {/* Form for adress */}
            <Form.Group>
            <Form.Label>Adress</Form.Label>
                <Form.Control
                {...register("adress", {
                    required: "A adress is required",
                    minLength: {
                        value: 2,
                        message: "Must atlest be 2 charatcers"
                    }
                })}
                placeholder="Adress"
                type="text"
                />

            </Form.Group>

               {/* Form for Town */}
               <Form.Group>
            <Form.Label>Town</Form.Label>
                <Form.Control
                {...register("town", {
                    required: "A town is required",
                    minLength: {
                        value: 2,
                        message: "Must atlest be 2 charatcers"
                    }
                })}
                placeholder="Town"
                type="text"
                />

            </Form.Group>

                {/* Form for Cuisine */}
             <Form.Group>
            <Form.Label>Cuisine</Form.Label>
                <Form.Control
                {...register("cuisine", {
                    required: "A cuisine is required",
                })}
                placeholder="Cusine"
                type="text"
                />

                </Form.Group>

                {/* Form for Supply */}

                <Form.Group>
            <Form.Label>Supply</Form.Label>
                <Form.Control
                {...register("supply", {
                    required: "You must choose a supply",
                })}
                placeholder="Supply"
                type="text"
                />
            </Form.Group>

                {/* Form for Phonenumber */}
            <Form.Group>
            <Form.Label>Phonenumber</Form.Label>
                <Form.Control
                {...register("phonenumber",)}
                placeholder="Phonenumber"
                type="text"
                />
            </Form.Group>

            {/* Form for Facebook */}
            <Form.Group>
            <Form.Label>Facebook</Form.Label>
                <Form.Control
                {...register("facebook",)}
                placeholder="Facebbok"
                type="text"
                />
            </Form.Group>

            {/* Form for Instagram */}
            <Form.Group>
            <Form.Label>Instagram</Form.Label>
                <Form.Control
                {...register("instagram",)}
                placeholder="instagram"
                type="text"
                />
            </Form.Group>


            {/* Form for E-mail */}
            <Form.Group>
            <Form.Label>Email</Form.Label>
                <Form.Control
                {...register("email",)}
                placeholder="email"
                type="text"
                />
            </Form.Group>

            {/* Form for Website */}
            <Form.Group>
            <Form.Label>Website</Form.Label>
                <Form.Control
                {...register("website",)}
                placeholder="website"
                type="text"
                />
            </Form.Group>

            {/* Form for type */}
             <Form.Group>
            <Form.Label>Type</Form.Label>
                <Form.Control
                {...register("type", {
                    required: "A Type is required",
                })}
                placeholder="Type"
                type="text"
                />

            </Form.Group>

            {/* Form for Description */}
            <Form.Group>
            <Form.Label>Description</Form.Label>
                <Form.Control
                {...register("description", {
                    required: "A description is required",
                    minLength: {
                        value: 2,
                        message: "Must atlest be 2 charatcers"
                    }
                })}
                placeholder="Description"
                type="text"
                as="textarea"
                rows={3}
                />
            </Form.Group>

            <Button variant="success" type="submit">Create</Button>
        </Form>
    )
}

export default CreatePlaceForm