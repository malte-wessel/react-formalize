import React, { createClass } from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    findRenderedDOMComponentWithTag,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react/lib/ReactTestUtils';

import Form from '../../src/components/Form';
import connectInput from '../../src/hoc/connectInput';

const Component = props => <input type="text" {...props}/>;
const Input = connectInput(Component);
const noop = () => {};

describe('connectInput', () => {
    describe('when rendering for the first time', () => {
        it('should receive given value', done => {
            const values = { foo: 'bar' };
            const tree = renderIntoDocument(
                <Form
                    values={values}
                    onChange={noop}>
                    <Input name="foo"/>
                </Form>
            );
            const input = findRenderedDOMComponentWithTag(tree, 'input');
            expect(input.value).toEqual('bar');
            done();
        });
    });

    describe('when values change', () => {
        it('should update respective components', done => {
            const Wrapper = createClass({
                getInitialState() {
                    return {
                        foo: 'bar',
                        qux: 'qax'
                    };
                },
                render() {
                    return (
                        <Form
                            values={this.state}
                            onChange={noop}>
                            <Input name="foo"/>
                            <Input name="qux"/>
                        </Form>
                    );
                }
            });
            const tree = renderIntoDocument(<Wrapper/>);
            const wrapper = findRenderedComponentWithType(tree, Wrapper);
            const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
            expect(inputs[0].value).toEqual('bar');
            expect(inputs[1].value).toEqual('qax');

            wrapper.setState({ foo: 'doo' }, () => {
                expect(inputs[0].value).toEqual('doo');
                expect(inputs[1].value).toEqual('qax');
                done();
            });
        });
    });

    describe('when an input changes', () => {
        it('should propagate changes', done => {
            const spy = createSpy();
            const values = {
                foo: 'bar',
                qux: 'qax',
                doo: {
                    foo: 'bar'
                }
            };
            const tree = renderIntoDocument(
                <Form
                    values={values}
                    onChange={spy}>
                    <Input name="foo"/>
                    <Input name="qux"/>
                    <Input name="doo.foo"/>
                </Form>
            );
            const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
            const input = inputs[0];
            const $input = findDOMNode(input);
            Simulate.change($input, { target: { value: 'doo' } });

            const nextValues = spy.calls[0].arguments[0];
            expect(spy.calls.length).toEqual(1);
            expect(nextValues).toEqual({
                foo: 'doo',
                qux: 'qax',
                doo: {
                    foo: 'bar'
                }
            });
            expect(values === nextValues).toEqual(false);
            expect(values.doo === nextValues.doo).toEqual(true);
            done();
        });
    });

    describe('when the name of an input is changed', () => {
        it('should update the value', done => {
            const values = {
                foo: 'bar',
                qux: 'qax'
            };
            const Wrapper = createClass({
                getInitialState() {
                    return {
                        name: 'foo'
                    };
                },
                render() {
                    const { name } = this.state;
                    return (
                        <Form
                            values={values}
                            onChange={noop}>
                            <Input name={name}/>
                        </Form>
                    );
                }
            });
            const tree = renderIntoDocument(<Wrapper/>);
            const wrapper = findRenderedComponentWithType(tree, Wrapper);
            const input = findRenderedDOMComponentWithTag(tree, 'input');
            expect(input.value).toEqual('bar');
            wrapper.setState({ name: 'qux' }, () => {
                expect(input.value).toEqual('qax');
                done();
            });
        });
    });
});
