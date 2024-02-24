import React, { useMemo } from "react";
import {
	Formik,
	Form,
	Field as FormikField,
	FieldProps,
	ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { Button, ButtonProps } from "react-bootstrap";
import bcrypt from "bcryptjs";
import SocialLoginButtons from "./social";
import "bootstrap/dist/css/bootstrap.min.css";

export interface IntegratedComponents {
	[key: string]: any;
}

interface FieldOption {
	label: string;
	value: string;
}

export interface Field {
	name: string;
	type: string;
	label?: string;
	required?: boolean;
	onChange?: (value: any) => void;
	regexPattern?: RegExp;
	options?: FieldOption[];
	icon?: any;
	iconPosition?: "left" | "right";
	[key: string]: any;
}

export interface SocialLoginProvider {
	name?: string;
	icon?: any;
	[key: string]: any;
}

export interface IntegratedComponentObject {
	name: string;
	type: string;
	component: any;
}

export interface AuthFormProps {
	headingText: string;
	action: "signIn" | "signUp";
	fields?: Field[];
	onSubmit?: (
		formData: { [key: string]: string },
		action: "signIn" | "signUp"
	) => void;
	customStyles?: {
		button?: ButtonProps;
		input?: any;
		error?: any;
		form?: any;
		icon?: any;
		socialLoginButton?: any;
		[key: string]: any;
	};
	validation?: boolean;
	validationErrors?: { [key: string]: string };
	submitIcon?: any;
	submitIconPosition?: "left" | "right";
	encryptPassword?: boolean;
	saltRounds?: number;
	customValidationSchema?: (formData: { [key: string]: string }) => any;
	socialLoginEnabled?: boolean;
	socialLoginPosition?: "top" | "bottom";
	socialLoginStyles?: any;
	socialLoginProviders?: (SocialLoginProvider | string)[];
	socialButtonOptions?: ButtonProps;
	onSocialLogin?: (provider: string) => void;
	integratedComponents?: IntegratedComponentObject[];
	[key: string]: any;
}

const AuthForm: React.FC<AuthFormProps> = React.memo(
	({
		headingText,
		action,
		fields = [
			{
				name: "email",
				type: "email",
				label: "Email",
				required: true,
				placeholder: "Email",
			},
			{
				name: "password",
				type: "password",
				label: "Password",
				required: true,
				placeholder: "Password",
			},
		],
		onSubmit,
		customStyles = {},
		validation = true,
		validationErrors = {},
		submitIcon: SubmitIcon,
		submitIconPosition = "left",
		encryptPassword = false,
		saltRounds = 10,
		customValidationSchema,
		socialLoginEnabled = false,
		socialLoginPosition = "bottom",
		socialLoginStyles = {},
		socialLoginProviders = [],
		socialButtonOptions,
		onSocialLogin,
		integratedComponents = [],
	}) => {
		const [validationSchema, setValidationSchema] = React.useState<
			Yup.ObjectSchema<any> | undefined
		>(undefined);

		const emailRegexPattern =
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		const initialValues = useMemo(() => {
			const initialValuesObject: { [key: string]: string } = {};
			fields.forEach((field) => {
				initialValuesObject[field.name] = "";
			});
			return initialValuesObject;
		}, [fields]);

		const defaultValidationSchema = Yup.object().shape({
			email: Yup.string()
				.matches(emailRegexPattern, "Invalid email format")
				.required("Email is required"),
			password: Yup.string().required("Password is required"),
		});

		const handleAuth = async (
			formDataToSubmit: { [key: string]: string },
			resetForm: () => void
		) => {
			if (onSubmit) {
				try {
					if (encryptPassword && action === "signUp") {
						const hashPassword = await bcrypt.hash(
							formDataToSubmit["password"],
							saltRounds
						);
						formDataToSubmit = {
							...formDataToSubmit,
							hashPassword: hashPassword,
						};
					}

					if (validation) {
						if (customValidationSchema) {
							const hasEmailField = fields.some(
								(field) => field.name === "email"
							);
							let customSchema = customValidationSchema(initialValues);
							if (hasEmailField) {
								const emailValidationSchema = Yup.object().shape({
									email: defaultValidationSchema.fields.email,
								});
								customSchema = customSchema.concat(emailValidationSchema);
							}
							setValidationSchema(customSchema);
						} else {
							const hasEmailField = fields.some(
								(field) => field.name === "email"
							);
							const hasPasswordField = fields.some(
								(field) => field.name === "password"
							);

							if (hasEmailField && hasPasswordField) {
								setValidationSchema(defaultValidationSchema);
							}
							if (hasEmailField) {
								const emailValidationSchema = Yup.object().shape({
									email: defaultValidationSchema.fields.email,
								});
								setValidationSchema(emailValidationSchema);
							} else {
								setValidationSchema(dynamicValidationSchema(formDataToSubmit));
							}
						}
					}

					if (validationSchema) {
						await validationSchema
							.validate(formDataToSubmit, {
								abortEarly: false,
							})
							.catch((errors) => {
								errors.inner.forEach((error: any) => {
									validationErrors[error.path] = error.message;
								});
							});
					}

					if (Object.keys(validationErrors).length > 0) {
						throw new Error("Form validation failed.");
					} else {
						onSubmit(formDataToSubmit, action);
						resetForm();
					}
				} catch (error: any) {
					throw new Error("Submission failed. Please try again.");
				}
			}
		};

		const dynamicValidationSchema = (formData: { [key: string]: any }) => {
			const schemaObject: any = {};

			for (const fieldName in formData) {
				if (formData.hasOwnProperty(fieldName)) {
					const fieldValue = formData[fieldName];

					// Check the type of fieldValue and create appropriate validation rule
					switch (Object.prototype.toString.call(fieldValue)) {
						case "[object String]":
							schemaObject[fieldName] = Yup.string().required(
								`${fieldName} is required`
							);
							break;
						case "[object Number]":
							schemaObject[fieldName] = Yup.number().required(
								`${fieldName} is required`
							);
							break;
						case "[object Boolean]":
							schemaObject[fieldName] = Yup.boolean().required(
								`${fieldName} is required`
							);
							break;
						case "[object Array]":
							schemaObject[fieldName] = Yup.array().required(
								`${fieldName} is required`
							);
							break;
						case "[object Null]":
							schemaObject[fieldName] = Yup.mixed()
								.nullable()
								.required(`${fieldName} is required`);
							break;
						case "[object Date]":
							schemaObject[fieldName] = Yup.date().required(
								`${fieldName} is required`
							);
							break;
						case "[object Object]":
							schemaObject[fieldName] = Yup.object().shape(fieldValue);
							break;
						default:
							schemaObject[fieldName] = Yup.mixed().required(
								`${fieldName} is required`
							);
							break;
					}
				}
			}

			return Yup.object().shape(schemaObject);
		};

		const allFields = [...fields, ...Object.values(integratedComponents)];

		const renderField = (field: Field) => {
			if (integratedComponents.length > 0) {
				integratedComponents.map((component: IntegratedComponentObject) => {
					const IntegratedComponent = component.component;
					return <IntegratedComponent key={component.name} {...component} />;
				});
			}

			const fieldProps: Field = Object.entries(field).reduce(
				(acc, [key, value]) => {
					if (key !== "icon" && key !== "iconPosition") {
						acc[key as keyof Field] = value;
					}
					return acc;
				},
				{} as { [key: string]: any } as Field
			);

			switch (field.type) {
				case "select":
					const selectComponent = useMemo(
						() => (
							<div
								className="d-flex justify-content-center align-items-center flex-column"
								key={field.name}
							>
								<div className="d-flex justify-content-center align-items-center flex-column">
									{field.label && (
										<label className="mt-1 mb-1" htmlFor={field.name}>
											{field.label}
										</label>
									)}
									<FormikField
										as="select"
										id={field.name}
										className="form-select"
										aria-label={`Select ${field.label}`}
										{...fieldProps}
										{...customStyles.select}
									>
										<option value="">Select {field.name}</option>
										{field.options?.map((option: any) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</FormikField>
								</div>
								<div className="mb-3">
									<ErrorMessage name={field.name} className="text-danger" />
								</div>
							</div>
						),
						[field]
					);
					return selectComponent;
				case "checkbox":
					const checkComponent = useMemo(
						() => (
							<div
								className="d-flex justify-content-center align-items-center flex-column"
								key={field.name}
							>
								<div className="mb-3">
									<FormikField name={field.name}>
										{(props: FieldProps) => (
											<div className="form-check">
												<input
													className="form-check-input"
													type="checkbox"
													id={field.name}
													checked={field.value}
													{...props.field}
													{...customStyles.checkbox}
												/>
												<label
													className="form-check-label"
													htmlFor={field.name}
												>
													{field.label}
												</label>
											</div>
										)}
									</FormikField>
								</div>
								<div className="mb-3">
									<ErrorMessage name={field.name} className="text-danger" />
								</div>
							</div>
						),
						[field]
					);
					return checkComponent;
				default:
					const anyComponent = useMemo(
						() => (
							<div
								className="d-flex justify-content-center align-items-center flex-column"
								key={field.name}
							>
								<div className="d-flex align-items-center justify-content-center flex-column">
									{field.label && (
										<label className="mt-1 mb-1" htmlFor={field.name}>
											{field.label}
										</label>
									)}
									<div
										key={field.name}
										className="d-flex align-items-center justify-content-center"
									>
										{field.iconPosition === "left" && field.icon && (
											<div className="mr-2 p-2">{field.icon}</div>
										)}
										<FormikField
											as="input"
											id={field.name}
											className="form-control"
											placeholder={field.placeholder}
											{...fieldProps}
											{...customStyles.input}
										/>
										{field.iconPosition === "right" && field.icon && (
											<div className="ml-2 p-2">{field.icon}</div>
										)}
									</div>
								</div>
								<div className="mt-2 mb-2">
									<small className="text-danger">
										<ErrorMessage name={field.name} />
									</small>
								</div>
							</div>
						),
						[field]
					);
					return anyComponent;
			}
		};

		const validationSchemaMemo = React.useMemo(() => {
			if (validation) {
				if (customValidationSchema) {
					const hasEmailField = fields.some((field) => field.name === "email");
					let customSchema = customValidationSchema(initialValues);
					if (hasEmailField) {
						const emailValidationSchema = Yup.object().shape({
							email: defaultValidationSchema.fields.email,
						});
						customSchema = customSchema.concat(emailValidationSchema);
					}
					return customSchema;
				} else {
					const hasEmailField = fields.some((field) => field.name === "email");
					const hasPasswordField = fields.some(
						(field) => field.name === "password"
					);
					if (hasEmailField && hasPasswordField) {
						return defaultValidationSchema;
					}
					if (hasEmailField) {
						const emailValidationSchema = Yup.object().shape({
							email: defaultValidationSchema.fields.email,
						});
						return emailValidationSchema;
					} else {
						return dynamicValidationSchema(initialValues);
					}
				}
			}
			return null;
		}, [initialValues]);

		return (
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchemaMemo}
				validateOnChange
				validateOnBlur
				validateOnMount
				onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
					try {
						await handleAuth(values, resetForm);
					} catch (error) {
						if (error instanceof Yup.ValidationError) {
							const validationErrors: { [key: string]: string } = {};
							error.inner.forEach((err) => {
								validationErrors[err.path!] = err.message;
							});
							setErrors(validationErrors);
						} else {
							setErrors({ form: (error as any).message });
						}
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form data-testid="auth-form" key="auth-form">
						<div
							className="d-flex flex-column align-items-center justify-content-center"
							style={{
								height: "100vh",
								padding: "20px",
								width: "100%",
								...customStyles.form,
							}}
						>
							<h1
								className="fw-bold"
								style={{ fontSize: "24px", marginBottom: "10px" }}
							>
								{headingText}
							</h1>
							{Object.keys(validationErrors).length > 0 && (
								<div className="alert alert-danger mt-3">
									<strong>Error</strong>
									<p>{Object.values(validationErrors).join(", ")}</p>
								</div>
							)}
							{socialLoginEnabled && socialLoginPosition === "top" && (
								<SocialLoginButtons
									socialLoginProviders={socialLoginProviders}
									onSocialLogin={onSocialLogin}
									socialLoginStyles={socialLoginStyles}
									socialButtonOptions={socialButtonOptions}
								/>
							)}
							{allFields.map(renderField)}
							{(fields.length > 0 || integratedComponents) && (
								<Button
									type="submit"
									disabled={isSubmitting}
									className="btn btn-primary mt-3"
									{...(customStyles.button as ButtonProps)}
								>
									{SubmitIcon && submitIconPosition === "left" && (
										<span className="me-2">
											<SubmitIcon />
										</span>
									)}
									{action === "signUp" ? "Sign Up" : "Sign In"}
									{SubmitIcon && submitIconPosition === "right" && (
										<span className="ms-2">
											<SubmitIcon />
										</span>
									)}
								</Button>
							)}
							{socialLoginEnabled && socialLoginPosition === "bottom" && (
								<SocialLoginButtons
									socialLoginProviders={socialLoginProviders}
									onSocialLogin={onSocialLogin}
									socialLoginStyles={socialLoginStyles}
									socialButtonOptions={socialButtonOptions}
								/>
							)}
						</div>
					</Form>
				)}
			</Formik>
		);
	}
);

export default AuthForm;
