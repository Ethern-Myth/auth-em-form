# Auth Form

<div align="center">

![Logo](/assets/logo/AuthForm.png)

</div>
---

## `auth-em-form-cli` Documentation

### Optional Installation

### Overview

`auth-em-form-cli` is a Command-Line Interface (CLI) tool designed to simplify the process of generating authentication form components for React applications using `auth-em-form` library. This tool provides an interactive interface to configure various options for generating the authentication form component.

### Installation

To use `auth-em-form-cli`, you need to have Node.js installed on your system. You can install `auth-em-form-cli` globally using npm by running the following command:

<br/>

```bash
npm install -g auth-em-form-cli
OR
yarn global add auth-em-form-cli
OR
pnpm add -g auth-em-form-cli
```

### Usage

Once installed, you can use `auth-em-form-cli` from the command line. Simply run the following command:

<br/>

```bash
npx auth-em-form-cli
OR
pnpm exec auth-form-cli
```

### Prompts

When you run `auth-em-form-cli`, you will be prompted to provide various options for generating the authentication form component. Below are the expected prompts and their descriptions:

1. **Folder to Add Component:**
   - Description: Enter the folder where the generated component will be added. You can use the "components" folder by default.
   - Prompt: `Enter the folder to add the created component (or use "components" folder by default):`

2. **File Name for Component:**
   - Description: Enter the file name for the component.
   - Prompt: `Enter the file name for the component:`

3. **Component Name:**
   - Description: Enter the name of the component.
   - Prompt: `Enter the component name:`

4. **Language:**
   - Description: Choose the language to create the component (JavaScript or TypeScript).
   - Prompt: `Choose the language to create the component:`

5. **File Extension:**
   - Description: Choose the file extension for the component file.
   - Prompt: `Choose the file extension:`

6. **Heading Text for Form:**
   - Description: Enter the heading text for the authentication form.
   - Prompt: `Enter the heading text for the form:`

7. **Action Type:**
   - Description: Select the action type of the form (Sign In or Sign Up).
   - Prompt: `Select the action type:`

8. **Encrypt Password:**
   - Description: Choose whether to encrypt passwords for sign-up.
   - Prompt: `Encrypt password for sign-up? (y/n):`

9. **Salt Rounds:**
   - Description: Enter the number of salt rounds for password encryption.
   - Prompt: `Enter the number of salt rounds for password encryption:`

10. **Enable Validation:**
    - Description: Choose whether to enable form validation.
    - Prompt: `Enable validation? (y/n):`

11. **Enable Social Login:**
    - Description: Choose whether to enable social login integration.
    - Prompt: `Enable social login? (y/n):`

12. **Social Login Position:**
    - Description: Select the position of social login buttons.
    - Prompt: `Select the position of social login buttons:`

### Examples

Below are some examples of how to use `auth-em-form-cli` with different options:

- Generate a JavaScript authentication form component in the default "components" folder with default settings:

  ```bash
  auth-em-form-cli
  ```

- Generate a TypeScript authentication form component named "AuthForm" in the "auth" folder with encryption enabled and social login disabled:

  ```bash
  auth-em-form-cli
  Enter the folder to add the created component (or use "components" folder by default): auth
  Enter the file name for the component: AuthForm
  Enter the component name: AuthForm
  Choose the language to create the component: TypeScript
  Choose the file extension: ts
  Enter the heading text for the form: User Authentication
  Select the action type: Sign Up
  Encrypt password for sign-up? (y/n): y
  Enter the number of salt rounds for password encryption: 12
  Enable validation? (y/n): y
  Enable social login? (y/n): n
  ```

### Additional Information

For additional information and options, you can use the `-h, --help` option to display help information:

```bash
auth-em-form-cli --help
```

---

# Auth-Em-Form

## Overview

The `AuthForm` component is a versatile and reusable React component with support for other frameworks designed to streamline the implementation of authentication forms within web applications. It provides a robust foundation for both sign-in and sign-up actions, offering customization options for form fields, validation, and integration with social login providers.

## Features

- **Customizable Form Fields**: Define form fields with various configurations such as label, type, and required status.
- **Validation Support**: Built-in support for form validation using Yup schema validation.
- **Password Encryption**: Option to encrypt passwords using bcrypt for enhanced security.
- **Social Login Integration**: Seamlessly integrate social login functionality with configurable options.
- **Integrated Components**: Flexibility to integrate additional components within the authentication form.
- **Error Handling**: Comprehensive error handling for form submissions and validation errors.

## Installation

To install the `AuthForm` component in your React project, use npm:

```bash
npm install auth-em-form
```

## Usage

```jsx
import AuthForm from 'auth-em-form';

const handleFormSubmit = (formData, action) => {
  // Handle form submission
};

const MyComponent = () => {
  return (
    <AuthForm
      headingText="Authentication"
      action="signIn"
      onSubmit={handleFormSubmit}
      // Add additional props as needed
    />
  );
};

export default MyComponent;
```

## Props

- **headingText**: *(string)* The heading text displayed on the authentication form.
- **action**: *(string)* The action type of the form, either `"signIn"` or `"signUp"`.
- **fields**: *(array of objects)* An array of field configurations defining the form fields.
- **onSubmit**: *(function)* Callback function invoked when the form is submitted.
- **customStyles**: *(object)* Custom styles to apply to form elements.
- **validation**: *(boolean)* Enable or disable form validation.
- **validationErrors**: *(object)* Object containing validation errors for form fields.
- **submitIcon**: *(element)* Icon component to display next to the submit button.
- **submitIconPosition**: *(string)* Position of the submit icon, either `"left"` or `"right"`.
- **encryptPassword**: *(boolean)* Boolean indicating whether to encrypt passwords using bcrypt.
- **saltRounds**: *(number)* Number of salt rounds used for password encryption.
- **customValidationSchema**: *(function)* Custom Yup validation schema for form fields.
- **socialLoginEnabled**: *(boolean)* Enable or disable social login integration.
- **socialLoginPosition**: *(string)* Position of social login buttons, either `"top"` or `"bottom"`.
- **socialLoginStyles**: *(object)* Custom styles to apply to social login buttons.
- **socialLoginProviders**: *(array of objects or strings)* Array of social login provider configurations or provider names.
- **socialButtonOptions**: *(object)* Options for social login buttons.
- **onSocialLogin**: *(function)* Callback function invoked when a social login provider button is clicked.
- **integratedComponents**: *(array of objects)* Integrated components to include in the form.

## Benefits

- **Saves Development Time**: Eliminates the need to build authentication forms from scratch, saving development time and effort.
- **Flexible Customization**: Offers extensive customization options for form fields, validation, and integration, catering to diverse project requirements.
- **Enhanced Security**: Supports password encryption using bcrypt, ensuring robust security measures for user data.
- **Seamless Integration**: Easily integrates with existing React projects, allowing for seamless implementation of authentication functionality.

## Future Features

- **Multi-step Authentication**: Implement support for multi-step authentication processes.
- **Additional Social Login Providers**: Expand social login integration to include more third-party providers.
- **Enhanced Error Handling**: Improve error handling capabilities for better user experience.
- **Localization Support**: Introduce support for multi-language localization in authentication forms.

# Social Login Buttons Component

### Overview

The `SocialLoginButtons` component is a React component designed to render social login buttons for various providers. It allows users to authenticate using different social media platforms.

#### Props

- **socialLoginProviders**: *(array of objects or strings)* An array of social login provider configurations or provider names.
- **onSocialLogin**: *(function)* Callback function invoked when a social login provider button is clicked.
- **socialLoginStyles**: *(object)* Custom styles to apply to the container of social login buttons.
- **socialButtonOptions**: *(object)* Options for the social login buttons, such as button styles.

#### Usage

```jsx
import SocialLoginButtons from 'auth-em-form/social';

const MyComponent = () => {
  const handleSocialLogin = (provider) => {
    // Handle social login with the selected provider
  };

  return (
    <SocialLoginButtons
      socialLoginProviders={['Google', 'Facebook']}
      onSocialLogin={handleSocialLogin}
      socialLoginStyles={{ backgroundColor: 'lightgray' }}
      socialButtonOptions={{ size: 'lg' }}
    />
  );
};

export default MyComponent;
```

#### Supported Social Login Providers

- The `socialLoginProviders` prop accepts an array of strings representing the names of supported social login providers (e.g., `"Google"`, `"Facebook"`).

#### Customization

- You can customize the appearance of social login buttons using the `socialLoginStyles` prop to apply custom styles to the container of social login buttons.
- Additionally, the `socialButtonOptions` prop allows for further customization of individual social login buttons using React Bootstrap's `ButtonProps`.

---

### Possible Supported Frameworks

1. **Next.js**: Next.js is a React framework for building server-side rendered (SSR) or statically generated (SSG) web applications. The `AuthForm` component can be directly used within Next.js applications without significant modifications, making it suitable for handling authentication forms in Next.js projects.

2. **Gatsby**: Gatsby is a React-based framework for building static websites and web applications. Similar to Next.js, the `AuthForm` component can be seamlessly integrated into Gatsby projects as a standard React component for authentication forms.

3. **Create React App (CRA)**: Create React App is a tool developed by Facebook to quickly set up new React projects. The `AuthForm` component can be easily included in projects created with CRA without any additional configurations, providing a straightforward solution for managing authentication forms in CRA-generated projects.

4. **React Native**: React Native is a framework for building native mobile applications using React. While primarily designed for mobile app development, React Native also supports web development via libraries like React Native Web. If you're using React Native for web development (React Native Web), you can adapt the `AuthForm` component for use in React Native web projects by incorporating it into your React Native Web application codebase.

5. **Remix**: Remix is a full-stack React framework that emphasizes server-rendered React applications. Remix integrates seamlessly with React, allowing React components like the `AuthForm` component to be used within Remix applications without significant modifications. The `AuthForm` component can be seamlessly integrated into Remix applications for handling authentication forms.

6. **RedwoodJS**: RedwoodJS is a full-stack JavaScript framework built on React, GraphQL, and Prisma. The `AuthForm` component can be integrated into RedwoodJS projects for managing authentication forms, leveraging React's component-based architecture within the RedwoodJS framework.

7. **Blitz.js**: Blitz.js is a full-stack React framework that aims to make building full-stack React apps easy and scalable. With Blitz.js, the `AuthForm` component can be utilized for authentication-related functionalities within Blitz.js applications, taking advantage of React's capabilities for building user interfaces.

8. **After.js**: After.js is a Next.js-like framework built with React Router. It enables server-rendered React applications with client-side hydration. The `AuthForm` component can be integrated into After.js applications for managing authentication forms, leveraging React's component-based approach within After.js projects.

9. **Razzle**: Razzle is a tool for building server-rendered universal JavaScript applications with React. The `AuthForm` component can be seamlessly incorporated into Razzle projects for handling authentication forms, utilizing React's capabilities for building dynamic user interfaces.

10. **Neutrino**: Neutrino is a toolkit for building JavaScript applications with minimal configuration. The `AuthForm` component can be integrated into Neutrino projects for managing authentication forms, leveraging React's component-based architecture within Neutrino applications.

These React-based frameworks and platforms provide different approaches to building web applications, and the `AuthForm` component can be seamlessly integrated into them to handle authentication forms with minimal effort.

## Creator

AuthForm component is created and maintained by [Ethern Myth](https://github.com/Ethern-Myth). Feel free to reach out with any questions or feedback!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
