import { useState } from "react";

export const usePasswordValidation = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPasswordError(passwordError);
  };

  return {
    password,
    passwordError,
    handlePasswordChange,
    handlePasswordBlur,
    validatePassword,
  };
};
