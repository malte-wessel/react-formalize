import { PropTypes } from 'react';

export default PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    getFormProps: PropTypes.func.isRequired
}).isRequired;
