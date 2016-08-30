import { get as getPath } from 'object-path';
import connect from './connect';

const mapFormPropsToState = (wrapperProps, formProps) => {
    const { messages, disabled } = formProps;
    const { name } = wrapperProps;
    const message = name && messages && (getPath(messages, name) || messages[name]);
    return { message, disabled };
};

export default function connectMessage(Component, options = {}) {
    return connect(Component, {
        mapFormPropsToState,
        ...options
    });
}
