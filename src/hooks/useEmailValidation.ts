import { useState } from "react";

export const useEmailValidation = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailError(emailError);
  };

  return {
    email,
    emailError,
    handleEmailChange,
    handleEmailBlur,
    validateEmail,
  };
};
