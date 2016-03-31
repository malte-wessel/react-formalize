import React from 'react';
import createForm from '../hoc/createForm';

const Form = props => <form {...props}/>;
export default createForm(Form);
