import { RadioGroup as RadioGroupBase } from 'react-formalize';
import React, { Component, PropTypes } from 'react';

export default class RadioGroup extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        options: PropTypes.object.isRequired
    }

    renderOptions(options, Radio) {
        const children = [];
        for (let value in options) {
            if (!options.hasOwnProperty(value)) continue;
            const label = options[value];
            children.push(
                <div className="radio" key={value}>
                    <label>
                        <Radio value={value}/>
                        {' '}
                        {label}
                    </label>
                </div>
            );
        }
        return <div>{children}</div>;
    }

    render() {
        const { name, options, children, ...props } = this.props;
        return (
            <RadioGroupBase name={name}>
                {this.renderOptions.bind(this, options)}
            </RadioGroupBase>
        );
    }
}
