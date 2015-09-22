import React from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType
} from 'react/lib/ReactTestUtils';

import Form from '../../../src/components/Form';
import Checkbox from '../../../src/components/inputs/Checkbox';

describe('Checkbox', () => {
    it('should accept default value', () => {
        const values = {
            foo: true
        };
        const tree = renderIntoDocument(
            <Form values={values}>
                <Checkbox name="foo"/>
            </Form>
        );

        const input = findRenderedComponentWithType(tree, Checkbox);
        const $input = findDOMNode(input);
        expect($input.checked).toEqual(true);
    });
    it('should propagate own value', () => {
        const tree = renderIntoDocument(
            <Form>
                <Checkbox name="foo" checked/>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        expect(form.values).toEqual({ foo: true });
    });
    it('should be disabled if form is', () => {
        const tree = renderIntoDocument(
            <Form disabled>
                <Checkbox name="foo"/>
            </Form>
        );

        const input = findRenderedComponentWithType(tree, Checkbox);
        expect(findDOMNode(input).disabled).toEqual(true);
    });
    it('should not be disabled if form is not', () => {
        const tree = renderIntoDocument(
            <Form>
                <Checkbox name="foo"/>
            </Form>
        );

        const input = findRenderedComponentWithType(tree, Checkbox);
        expect(findDOMNode(input).disabled).toEqual(false);
    });
});
