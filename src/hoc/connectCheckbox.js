import connectInput from './connectInput';

const serialize = event => {
    const target = event.target;
    const { checked } = target;
    return !!checked;
};

const mapStateToProps = ({ value, disabled }) => ({
    value: true,
    checked: !!value,
    disabled
});

export default function connectCheckbox(Component, options = {}) {
    return connectInput(Component, {
        serialize,
        mapStateToProps,
        ...options
    });
}
