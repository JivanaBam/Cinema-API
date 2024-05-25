import yup from "yup";

export const registerValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required.")
    .trim()
    .max(30, "First name must be at max 30 characters."),
  lastName: yup
    .string()
    .required("Last name is required.")
    .trim()
    .max(30, "Last name must be at max 30 characters."),
  email: yup
    .string()
    .email("Email must be valid.")
    .required("Email is required.")
    .trim()
    .max(65, "Email must be at max 60 characters.")
    .lowercase(),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(20, "Password must be at max 20 characters.")
    .required("Password is required"),
  role: yup
    .string()
    .required("Role is required.")
    .trim()
    .oneOf(["admin", "viewer"], "Role must be either admin or viewer."),
  //   dob: yup.number().required("Date of birth is required."),
});

export const loginUserValidationSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email.")
    .required("Email is required.")
    .trim()
    .max(60, "Email must be at max 60 characters.")
    .lowercase(),
  password: yup.string().required("Password is required.").trim(),
});
