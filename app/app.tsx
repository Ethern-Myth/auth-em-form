import React from "react";
import AuthForm, { AuthFormProps, Field } from "../src";
import { BsFillEnvelopeFill, BsFillLockFill } from "react-icons/bs";

const App: React.FC = () => {
	const handleSignUp = (
		formData: { [key: string]: string },
		action: "signIn" | "signUp"
	) => {
		// Your sign-up logic here
		console.log("Sign up form submitted with data:", formData);
	};

	const customStyles = {
		button: { variant: "primary", size: "sm" },
		input: { border: "2px solid green", style: { borderRadius: "5px" } },
		error: { color: "red" },
		form: { background: "#f0f0f0", padding: "20px", borderRadius: "10px" },
		icon: { color: "green" },
		theme: { fontFamily: "Arial, sans-serif" },
	};

	const validationErrors: { [key: string]: string } = {};

	const fields: Field[] = [
		{
			name: "email",
			type: "email",
			label: "Email",
			required: true,
			placeholder: "Email",
			iconPosition: "left",
			icon: <BsFillEnvelopeFill />,
		},
		{
			name: "password",
			type: "password",
			label: "Password",
			required: true,
			placeholder: "Password",
			iconPosition: "left",
			icon: <BsFillLockFill />,
		},
		{
			name: "gender",
			type: "select",
			label: "Gender",
			required: true,
			placeholder: "Select Gender",
			options: [
				{ label: "Male", value: "male" },
				{ label: "Female", value: "female" },
			],
		},
		{
			name: "terms",
			type: "checkbox",
			label: "I agree to the terms and conditions",
			required: true,
		},
	];

	const authFormProps: AuthFormProps = {
		headingText: "Sign Up",
		action: "signUp",
		fields: fields,
		onSubmit: handleSignUp,
		customStyles: customStyles,
		validationErrors: validationErrors,
		validation: true,
		encryptPassword: true,
	};

	return <AuthForm {...authFormProps} />;
};

export default App;
