import React, { createClass } from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react/lib/ReactTestUtils';

import Form from '../../src/components/Form';
import TextArea from '../../src/components/TextArea';

const noop = () => {};

describe('TextArea', () => {
    describe('when rendering for the first time', () => {
        it('should take given value', done => {
            const values = { foo: 'bar' };
            const tree = renderIntoDocument(
                <Form
                    values={values}
                    onChange={noop}>
                    <TextArea name="foo"/>
                </Form>
            );

            const input = findRenderedComponentWithType(tree, TextArea);
            const $input = findDOMNode(input);
            expect($input.value).toEqual('bar');
            done();
        });
    });
    describe('when values change', () => {
        it('should update value', done => {
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
                            <TextArea name="foo"/>
                            <TextArea name="qux"/>
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
    describe('when input changes', () => {
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
                    <TextArea name="foo"/>
                    <TextArea name="qux"/>
                    <TextArea name="doo.foo"/>
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
    describe('when form is disabled', () => {
        it('should be disabled too', done => {
            const values = { foo: 'bar' };
            const tree = renderIntoDocument(
                <Form
                    disabled
                    values={values}
                    onChange={noop}>
                    <TextArea name="foo"/>
                </Form>
            );

            const input = findRenderedComponentWithType(tree, TextArea);
            expect(findDOMNode(input).disabled).toEqual(true);
            done();
        });
    });
});
