import React from 'react';
import { findDOMNode, unmountComponentAtNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType
} from 'react/lib/ReactTestUtils';

import Form from '../../src/components/Form';
import Input from '../../src/components/Input';

describe('Input', () => {
    it('should register', () => {
        const tree = renderIntoDocument(
            <Form>
                <Input name="foo" value="bar">{props => <div {...props}/>}</Input>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        expect(form.inputs).toEqual({ foo: 'bar' });
        expect(form.state.data).toEqual({ foo: 'bar' });
    });

    it('should register', () => {
        const tree = renderIntoDocument(
            <Form>
                <Input name="foo" value="bar">{props => <div {...props}/>}</Input>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        expect(form.inputs).toEqual({ foo: 'bar' });
        expect(form.state.data).toEqual({ foo: 'bar' });
    });

    it('should unregister on unmount', () => {
        const tree = renderIntoDocument(
            <Form>
                <Input name="foo" value="bar">{props => <div {...props}/>}</Input>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        unmountComponentAtNode(findDOMNode(tree).parentNode);
        expect(form.inputs.foo).toBeA('undefined');
    });
});
