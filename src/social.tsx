import React from "react";
import { Container, Col, Button, ButtonProps } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Provider {
	name?: string;
	icon?: any;
	[key: string]: any;
}

interface Props {
	socialLoginProviders: (Provider | string)[];
	onSocialLogin?: (provider: string) => void;
	socialLoginStyles?: any;
	socialButtonOptions?: ButtonProps;
	[key: string]: any;
}

const SocialLoginButtons: React.FC<Props> = ({
	socialLoginProviders,
	onSocialLogin,
	socialLoginStyles,
	socialButtonOptions,
}) => {
	return (
		<Container style={{ ...socialLoginStyles }}>
			<Col className="d-flex flex-column justify-content-center align-items-center mt-4 mb-4">
				{socialLoginProviders.map((provider) => (
					<Col key={typeof provider === "string" ? provider : provider.name}>
						<Button
							onClick={() =>
								onSocialLogin?.(
									typeof provider === "string" ? provider : provider.name || ""
								)
							}
							className="mt-2 mb-2"
							{...socialButtonOptions}
						>
							{typeof provider === "string" ? (
								`Sign in with ${provider}`
							) : (
								<div
									className="d-flex align-items-center justify-content-center"
									style={{ ...socialLoginStyles?.icon }}
								>
									{provider.icon}
								</div>
							)}
						</Button>
					</Col>
				))}
			</Col>
		</Container>
	);
};

export default SocialLoginButtons;
