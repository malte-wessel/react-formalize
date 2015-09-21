import React from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType
} from 'react/lib/ReactTestUtils';

import Form from '../../../src/components/Form';
import TextArea from '../../../src/components/inputs/TextArea';

describe('TextArea', () => {
    it('should accept default value', () => {
        const values = {
            foo: 'bar'
        };
        const tree = renderIntoDocument(
            <Form values={values}>
                <TextArea name="foo"/>
            </Form>
        );

        const input = findRenderedComponentWithType(tree, TextArea);
        const $input = findDOMNode(input);
        expect($input.value).toEqual('bar');
    });
    it('should propagate own value', () => {
        const tree = renderIntoDocument(
            <Form>
                <TextArea name="foo" value="bar"/>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        expect(form.state.values).toEqual({ foo: 'bar' });
    });
    it('should be disabled if form is', () => {
        const tree = renderIntoDocument(
            <Form disabled>
                <TextArea name="foo"/>
            </Form>
        );

        const input = findRenderedComponentWithType(tree, TextArea);
        expect(findDOMNode(input).disabled).toEqual(true);
    });
    it('should not be disabled if form is not', () => {
        const tree = renderIntoDocument(
            <Form>
                <TextArea name="foo"/>
            </Form>
        );

        const input = findRenderedComponentWithType(tree, TextArea);
        expect(findDOMNode(input).disabled).toEqual(false);
    });
});
