import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// context
import { useAuthContext } from '../contexts/AuthContext'
// bootstrap
import { Container, Row, Col, Form, Button, Card, Alert, Image } from 'react-bootstrap'

const LoginPage = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { login } = useAuthContext()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null);

		try {
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			navigate('/')

		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
	}

	return (
		<Container className="py-3 center-y">

			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Log In</Card.Title>

							{error && (<Alert variant="danger">{error}</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<Button disabled={loading} type="submit" className='btn-color'>Log In</Button>
							</Form>

							<div className="text-center mt-3">
								<Link to="/forgot-password">Forgot Password?</Link>
							</div>
						</Card.Body>
					</Card>

					<div className="text-center mt-3">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default LoginPage
