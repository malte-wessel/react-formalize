import React, { createClass } from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react/lib/ReactTestUtils';

import Form from '../../src/components/Form';
import RadioGroup from '../../src/components/RadioGroup';

const noop = () => {};

describe('RadioGroup', () => {
    describe('options', () => {
        it('should accept options property', done => {
            const values = {
                foo: 'bux'
            };
            const options = {
                bux: 'bar',
                qux: 'qax'
            };
            const tree = renderIntoDocument(
                <Form
                    values={values}
                    onChange={noop}>
                    <RadioGroup name="foo" options={options}/>
                </Form>
            );

            const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
            expect(inputs[0].name).toEqual('foo');
            expect(inputs[0].value).toEqual('bux');
            expect(inputs[1].name).toEqual('foo');
            expect(inputs[1].value).toEqual('qux');
            done();
        });
        it('should accept options as childs', done => {
            const values = {
                foo: 'bux'
            };
            const tree = renderIntoDocument(
                <Form
                    values={values}
                    onChange={noop}>
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
            expect(inputs[0].name).toEqual('foo');
            expect(inputs[0].value).toEqual('bux');
            expect(inputs[1].name).toEqual('foo');
            expect(inputs[1].value).toEqual('qux');
            done();
        });
    });
    describe('when rendering for the first time', () => {
        it('should take given value', done => {
            const values = {
                foo: 'bux'
            };
            const options = {
                bux: 'bar',
                qux: 'qax'
            };
            const tree = renderIntoDocument(
                <Form
                    values={values}
                    onChange={noop}>
                    <RadioGroup name="foo" options={options}/>
                </Form>
            );

            const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
            expect(inputs[0].checked).toEqual(true);
            expect(inputs[1].checked).toEqual(false);
            done();
        });
    });
    describe('when values change', () => {
        it('should update value', done => {
            const options = {
                bux: 'bar',
                qux: 'qax'
            };
            const Wrapper = createClass({
                getInitialState() {
                    return {
                        foo: 'bux'
                    };
                },
                render() {
                    return (
                        <Form
                            values={this.state}
                            onChange={noop}>
                            <RadioGroup name="foo" options={options}/>
                        </Form>
                    );
                }
            });
            const tree = renderIntoDocument(<Wrapper/>);
            const wrapper = findRenderedComponentWithType(tree, Wrapper);
            const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
            expect(inputs[0].checked).toEqual(true);
            expect(inputs[1].checked).toEqual(false);

            wrapper.setState({ foo: 'qux' }, () => {
                // Not sure why, but we need to grab the inputs again
                // in order to receive the actual checked state.
                // See: https://github.com/facebook/react/issues/6321
                const updatedInputs = scryRenderedDOMComponentsWithTag(tree, 'input');
                expect(updatedInputs[0].checked).toEqual(false);
                expect(updatedInputs[1].checked).toEqual(true);
                done();
            });
        });
    });
    describe('when input changes', () => {
        it('should propagate changes', done => {
            const spy = createSpy();
            const options = {
                bux: 'bar',
                qux: 'qax'
            };
            const values = {
                foo: 'bux',
                qux: 'qux',
                doo: {
                    foo: 'bux'
                }
            };
            const tree = renderIntoDocument(
                <Form
                    values={values}
                    onChange={spy}>
                    <RadioGroup name="foo" options={options}/>
                    <RadioGroup name="qux" options={options}/>
                    <RadioGroup name="doo.foo" options={options}/>
                </Form>
            );
            const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
            const input = inputs[1];
            const $input = findDOMNode(input);
            Simulate.change($input, { target: { checked: true } });

            const nextValues = spy.calls[0].arguments[0];
            expect(spy.calls.length).toEqual(1);
            expect(nextValues).toEqual({
                foo: 'qux',
                qux: 'qux',
                doo: {
                    foo: 'bux'
                }
            });
            expect(values === nextValues).toEqual(false);
            expect(values.doo === nextValues.doo).toEqual(true);
            done();
        });
    });
    describe('when form is disabled', () => {
        it('should be disabled too', done => {
            const values = {
                foo: 'bux'
            };
            const options = {
                bux: 'bar',
                qux: 'qax'
            };
            const tree = renderIntoDocument(
                <Form
                    disabled
                    values={values}
                    onChange={noop}>
                    <RadioGroup name="foo" options={options}/>
                </Form>
            );

            const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
            expect(inputs[0].disabled).toEqual(true);
            expect(inputs[1].disabled).toEqual(true);
            done();
        });
    });
});
