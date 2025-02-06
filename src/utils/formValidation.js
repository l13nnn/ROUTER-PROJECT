import * as Yup from 'Yup';

export const formSchema = Yup.object().shape ({
    name: Yup.string()
    .min(3, 'Name must be at least 3 character')
    .required('Name is required'),
    email: Yup.string()
    .required('Email is required'),
    role: Yup.string()
    .required('Role is required'),
});