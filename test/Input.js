import React from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    scryRenderedComponentsWithType,
    Simulate } from 'react/lib/ReactTestUtils';

import Input from '../src/components/Input';
import Form from '../src/components/Form';

class TextInput extends React.Component {
    render() {
        return (
            <Input {...this.props}>
                {props => <input {...props}/>}
            </Input>
        );
    }
}

describe('Input', () => {
    it('works', () => {
        const data = {
            zoo: 'zar',
            boo: 'bar',
            foo: {
                doo: 'dar'
            }
        };

        const tree = renderIntoDocument(
            <Form data={data}>
                <TextInput name="boo"/>
                <TextInput name="foo.doo" value="daz"/>
                <TextInput name="foo.qoo" value="qaz"/>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        const inputs = scryRenderedComponentsWithType(tree, TextInput);

        expect(form.state.data).toEqual({
            zoo: 'zar',
            boo: 'bar',
            foo: {
                doo: 'dar',
                qoo: 'qaz'
            }
        });

        const input = findDOMNode(inputs[1]);
        Simulate.change(input, {target: {value: 'duz'}});

        expect(form.state.data).toEqual({
            zoo: 'zar',
            boo: 'bar',
            foo: {
                doo: 'duz',
                qoo: 'qaz'
            }
        });
    });
});
