import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .max(255)
        .email("Must be a valid email")
        .required("Please Enter Your Email."),
    password: Yup.string()
        .required("Please Enter Your Password")
});

export const forgetSchema = Yup.object().shape({
    email: Yup.string()
        .max(255)
        .email('Must be a valid email')
        .required("Please Enter Your Email")
});

export const resetSchema = Yup.object().shape({
    password: Yup.string()
        .required("Please Enter Your Password")
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
});

export const initialValues = {
    email: '',
    password: '',
    submit: null,
};