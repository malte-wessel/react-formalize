import { PropTypes } from 'react';

export default PropTypes.shape({
    register: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    getMessage: PropTypes.func.isRequired,
    getFormProps: PropTypes.func.isRequired
}).isRequired;
