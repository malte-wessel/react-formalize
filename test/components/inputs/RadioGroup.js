import React from 'react';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    scryRenderedDOMComponentsWithTag
} from 'react/lib/ReactTestUtils';

import Form from '../../../src/components/Form';
import RadioGroup from '../../../src/components/inputs/RadioGroup';

describe('RadioGroup', () => {
    it('should accept options property', () => {
        const values = {
            foo: 'bux'
        };
        const options = {
            bux: 'bar',
            qux: 'qax'
        };
        const tree = renderIntoDocument(
            <Form values={values}>
                <RadioGroup name="foo" options={options}/>
            </Form>
        );

        const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
        expect(inputs[0].checked).toEqual(true);
        expect(inputs[1].checked).toEqual(false);
    });
    it('should accept options as childs', () => {
        const values = {
            foo: 'bux'
        };
        const tree = renderIntoDocument(
            <Form values={values}>
                <RadioGroup name="foo">
                    {Radio => (
                        <div>
                            <Radio value="bux"/> bar
                            <Radio value="qux"/> qax
                        </div>
                    )}
                </RadioGroup>
            </Form>
        );

        const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
        expect(inputs[0].checked).toEqual(true);
        expect(inputs[1].checked).toEqual(false);
    });
    it('should accept default value', () => {
        const values = {
            foo: 'bux'
        };
        const options = {
            bux: 'bar',
            qux: 'qax'
        };
        const tree = renderIntoDocument(
            <Form values={values}>
                <RadioGroup name="foo" options={options}/>
            </Form>
        );

        const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
        expect(inputs[0].checked).toEqual(true);
        expect(inputs[1].checked).toEqual(false);
    });
    it('should propagate own value', () => {
        const options = {
            bux: 'bar',
            qux: 'qax'
        };
        const tree = renderIntoDocument(
            <Form>
                <RadioGroup name="foo" value="bux" options={options}/>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        expect(form.state.values).toEqual({ foo: 'bux' });
    });
    it('should be disabled if form is', () => {
        const options = {
            bux: 'bar',
            qux: 'qax'
        };
        const tree = renderIntoDocument(
            <Form disabled>
                <RadioGroup name="foo" options={options}/>
            </Form>
        );

        const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
        expect(inputs[0].disabled).toEqual(true);
        expect(inputs[1].disabled).toEqual(true);
    });
    it('should not be disabled if form is not', () => {
        const options = {
            bux: 'bar',
            qux: 'qax'
        };
        const tree = renderIntoDocument(
            <Form>
                <RadioGroup name="foo" options={options}/>
            </Form>
        );

        const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
        expect(inputs[0].disabled).toEqual(false);
        expect(inputs[1].disabled).toEqual(false);
    });
});
