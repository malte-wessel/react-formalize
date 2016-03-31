import connectInput from './connectInput';

const serialize = event => {
    const target = event.target;
    const { value, type } = target;
    if (type === 'select-multiple') {
        const values = [];
        const { options } = target;
        for (let i = 0, l = options.length; i < l; i++) {
            const option = options[i];
            if (option.selected) values.push(option.value);
        }
        return values;
    }
    return value;
};

const mapStateToProps = ({ value, disabled }, { multiple }) => ({
    value: !value && multiple ? [] : value,
    disabled
});

export default function connectSelect(Component, options = {}) {
    return connectInput(Component, {
        serialize,
        mapStateToProps,
        ...options
    });
}
