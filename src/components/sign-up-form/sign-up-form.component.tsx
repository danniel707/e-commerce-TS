import { FC, FormEvent, ChangeEvent, useState } from 'react';

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { setSignUpLoading } from '../../store/user/user.action';

import { 
	createAuthUserWithEmailAndPassword, 
	createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'

import './sign-up-form.styles.scss'


const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

const SignUpForm: FC = () => {

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if(password !== confirmPassword) {
			alert("passwords do not match");
			return;
		}

		try {
			const result  = await createAuthUserWithEmailAndPassword(email, 
				password,	
				{ displayName, role: 'visitor' }								
			);
		   	dispatch(setSignUpLoading(true))
		    if (result?.user) {		        
		    	const { user } = result;await createUserDocumentFromAuth(user, { displayName, role: 'visitor' });
				resetFormFields();
				dispatch(setSignUpLoading(false))
				navigate("/")
			}

		} catch (error){
			if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
				alert('Cannot create user, email already in use');
			} else {
				console.log('user creation encountered an error', error);
			}			
		}
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;

		setFormFields({...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>				
				<FormInput 
					label="Display Name"
					type="text" 
					required 
					onChange={handleChange} 
					name="displayName" 
					id="displayName"
					value={displayName}
				/>				
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
				<FormInput 
					label="Confirm Password"
					type="password" 
					required 
					onChange={handleChange} 
					name="confirmPassword" 
					id="confirmPassword"  
					value={confirmPassword}/>
				<Button  type="submit">Sign Up</Button>
			</form>
		</div>
	)
}

export default SignUpForm;