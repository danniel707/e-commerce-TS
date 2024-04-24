import styled from 'styled-components';
import Button from '../button/button.component'
import { CardElement } from '@stripe/react-stripe-js';

export const PaymentFormContainer = styled.div`
	height: 300px;
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: center;

`;

export const FormContainer = styled.form`
	height: 130px;
	min-width: 500px;
	border: 1px solid black;
	padding: 0px 20px  0px 20px;
	background-color: white;
	border-radius: 4px; 

	h2 {
		margin-top: 20px;
		margin-bottom: 30px;		
	}	

`

export const StyledCardElement = styled(CardElement)`
    height: 40px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 4px;    

    &.StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
    }

    &.StripeElement--invalid {
        border-color: #fa755a;
    }

    &.StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }
`;

export const PaymentButton = styled(Button)`
	margin-left: auto;
	margin-top: 50px;

`