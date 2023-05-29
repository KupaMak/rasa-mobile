import * as Yup from "yup";



//login validation
export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required("Enter email").email().label("Email"),
    password: Yup.string().required("Enter password").min(8).label("Password")
})

//signup validation

const passwordSchema = Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/, 'Password must contain at least one letter and one number')
    .test('passwords-match', 'Passwords do not  match', function (value) {
        return this.parent.password2 === value;
    })
    .test('not-common-password', 'Password is too common', function (value) {
        const commonPasswords = ['123456', 'password', '123456789', '12345678', '12345', '1234567', '1234567890', '1234', 'password1', 'password123', '123'];
        return !commonPasswords.includes(value);
    });

export const signupValidationSchema = Yup.object().shape({

    full_name: Yup.string().required("Full name is required").label("Full name"),
    email: Yup.string().required("Email is required").email().label("Email"),
    password: passwordSchema.required('Password is required'),
    password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
})

//additional information validation

const mobileRegex = /^07\d{8}$/;
export const additionalInfoValidationSchema = Yup.object().shape({

    whatsapp_number: Yup.string().matches(mobileRegex, 'WhatsApp number is not valid').required('WhatsApp number is required'),
    gender: Yup.string().required("Please select gender").label("Gender"),
    address: Yup.string().required().label("Address")

})

export const resetPasswordValidationSchema = Yup.object().shape({

    password: Yup.string().required().min(8).label("Password"),
    password2: Yup.string().required().min(8).label("Password")
})

export const addProductValidationSchema = Yup.object().shape({
    name: Yup.string().required("Enter product name").min(3, "Enter a valid product name"),
    description: Yup.string().required("Describe your product").min(10, "Briefly describe your product "),
    currency: Yup.string().required("Select Currency"),
    price: Yup.number().required("Enter Price").positive("Invalid price"),
    condition: Yup.string().required("Select Condition"),
    category: Yup.string().required("Select Category"),
    quantity: Yup.number().required("Enter Quantity").positive("Invalid quantity"),

})



