import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "../src/index";
import bcrypt from "bcryptjs";

describe("AuthForm Component", () => {
	it("should render AuthForm component correctly with default props", () => {
		const mockOnSubmit = jest.fn();

		const { getByText, getByLabelText } = render(
			React.createElement(AuthForm, {
				headingText: "Test AuthForm",
				action: "signIn",
				onSubmit: mockOnSubmit,
			})
		);

		expect(getByText("Test AuthForm")).toBeTruthy();
		expect(getByLabelText("Email")).toBeTruthy();
		expect(getByLabelText("Password")).toBeTruthy();
		expect(getByText("Sign In")).toBeTruthy();
	});

	it("should call onSocialLogin when social login button is clicked", () => {
		const mockOnSocialLogin = jest.fn();
		const mockOnSubmit = jest.fn();

		const { getByText } = render(
			React.createElement(AuthForm, {
				headingText: "Test AuthForm",
				action: "signIn",
				onSubmit: mockOnSubmit,
				socialLoginEnabled: true,
				socialLoginProviders: ["Google", "Facebook"],
				onSocialLogin: mockOnSocialLogin,
			})
		);

		fireEvent.click(getByText("Sign in with Google"));
		expect(mockOnSocialLogin).toHaveBeenCalledWith("Google");

		fireEvent.click(getByText("Sign in with Facebook"));
		expect(mockOnSocialLogin).toHaveBeenCalledWith("Facebook");
	});
});
