import { useState, FC, FormEvent, ChangeEvent } from 'react';

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { useNavigate } from 'react-router-dom';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss'

type FormFields = {
  email: string;
  password: string;
};

const defaultFormFields = {	
	email: '',
	password: '',	
}

const SignInForm: FC = () => {
	
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	const navigate = useNavigate();

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
		navigate("/")
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		try {			
			const userCredential = await signInAuthUserWithEmailAndPassword(email, password);
			const user = userCredential?.user;
		    
		    if (user) {
		        resetFormFields();
		        // Redirect to the desired page after successful sign-in		       
		        navigate('/');
		    }

		} catch (error){			
			console.log('user sign in failed', error);			
			alert("Incorrect password or email")			
		}
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;

		setFormFields({...formFields, [name]: value })
	}

	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>											
				<FormInput 
					label="Email"
					type="email" 
					required 
					onChange={handleChange} 
					name="email" 
					id="email"
					value={email}
				/>				
				<FormInput 
					label="Password"
					type="password" 
					required 
					onChange={handleChange} 
					name="password" 
					id="password" 
					value={password}
					/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button 
						type='button' buttonType={BUTTON_TYPE_CLASSES.google} 
						onClick={signInWithGoogle}
						>
						Google Sign In
						</Button>
				</div>								
			</form>
		</div>
	)
}

export default SignInForm;