import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//     email: {
//         required: {
//             value: true,
//             message: 'Email là bắt buộc'
//         },
//         pattern: {
//             value: /^\S+@\S+\.\S+$/,
//             message: 'Email không đúng định dạng'
//         },
//         maxLength: {
//             value: 150,
//             message: 'Độ dài từ 5 đến 150 ký tự'
//         },
//         minLength: {
//             value: 5,
//             message: 'Độ dài từ 5 đến 150 ký tự'
//         }
//     },
//     password: {
//         required: {
//             value: true,
//             message: 'Password là bắt buộc'
//         },
//         maxLength: {
//             value: 160,
//             message: 'Độ dài từ 6 đến 150 ký tự'
//         },
//         minLength: {
//             value: 6,
//             message: 'Độ dài từ 6 đến 150 ký tự'
//         }
//     },
//     confirm_password: {
//         required: {
//             value: true,
//             message: 'Confirm Password là bắt buộc'
//         },
//         maxLength: {
//             value: 160,
//             message: 'Độ dài từ 6 đến 150 ký tự'
//         },
//         minLength: {
//             value: 6,
//             message: 'Độ dài từ 6 đến 150 ký tự'
//         },
//         validate:
//             typeof getValues === 'function'
//                 ? (value) => value === getValues('password') || 'Nhập lại password không đúng'
//                 : undefined
//     }
// })

export const schema = yup
    .object({
        email: yup
            .string()
            .required('Email là bắt buộc')
            .email('Email không đúng định dạng')
            .min(5, 'Độ dài từ 5 đến 160 ký tự')
            .max(160, 'Độ dài từ 5 đến 160 ký tự'),
        password: yup
            .string()
            .required('Password là bắt buộc')
            .min(6, 'Độ dài từ 6 đến 160 ký tự')
            .max(160, 'Độ dài từ 6 đến 160 ký tự'),
        confirm_password: yup
            .string()
            .required('Confirm password là bắt buộc')
            .min(6, 'Độ dài từ 6 đến 160 ký tự')
            .max(160, 'Độ dài từ 6 đến 160 ký tự')
            .oneOf([yup.ref('password')], 'Nhập lại password không khớppp')
    })
    .required()

// const loginSchema = schema.omit(['confirm_password'])
// loginSchema.getDefault()

export type Schema = yup.InferType<typeof schema>
