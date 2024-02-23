import * as yup from 'yup';

let currentDate = new Date();
let maxDate = currentDate.setMonth(currentDate.getMonth() + 3);

export const ORDER_VALIDATION_SCHEMA = yup.object({
    //fullName: yup.string('Allow values just a string').min(2, 'Min length is 2 symbols').max(10, 'Max length is 10 symbols').required('Full Name Is Required'),
    //date: yup.date().min(new Date(), 'Please choose valid date').max(new Date(maxDate), 'The maximum allowable date should not exceed a three-month period from the current date').required()
    po: yup.string('Allow values just a number').min(5, 'Min 5 symbols').max(10, 'Max 10 symbols at this moment').required('PO Number Is Required')
});