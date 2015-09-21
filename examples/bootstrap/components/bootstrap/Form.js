import { Form as FormBase } from 'react-formalize';
import React, { Component, PropTypes } from 'react';

export default class Form extends Component {

    static propTypes = {
        children: PropTypes.node
    }

    render() {
        const { children, ...props } = this.props;
        return (
            <FormBase className="form-horizontal" {...props}>{messages =>
                <div>
                    {Object.keys(messages).length > 0
                        ? <div className="alert alert-danger">
                            Whoops, looks like some fields have errors.
                        </div>
                        : null
                    }
                    {children}
                </div>
            }</FormBase>
        );
    }
}
