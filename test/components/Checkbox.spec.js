import React, { createClass } from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    scryRenderedComponentsWithType,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react/lib/ReactTestUtils';

import Form from '../../src/components/Form';
import Checkbox from '../../src/components/Checkbox';

const noop = () => {};

describe('Checkbox', () => {
    describe('when rendering for the first time', () => {
        it('should take given value', done => {
            const values = { foo: true, qux: false };
            const tree = renderIntoDocument(
                <Form
                    values={values}
                    onChange={noop}>
                    <Checkbox name="foo"/>
                    <Checkbox name="qux"/>
                </Form>
            );

            const inputs = scryRenderedComponentsWithType(tree, Checkbox);
            const $foo = findDOMNode(inputs[0]);
            const $qux = findDOMNode(inputs[1]);
            expect($foo.value).toEqual('true');
            expect($foo.checked).toEqual(true);
            expect($qux.value).toEqual('true');
            expect($qux.checked).toEqual(false);
            done();
        });
    });
    describe('when values change', () => {
        it('should update value', done => {
            const Wrapper = createClass({
                getInitialState() {
                    return {
                        foo: true,
                        qux: false
                    };
                },
                render() {
                    return (
                        <Form
                            values={this.state}
                            onChange={noop}>
                            <Checkbox name="foo"/>
                            <Checkbox name="qux"/>
                        </Form>
                    );
                }
            });
            const tree = renderIntoDocument(<Wrapper/>);
            const wrapper = findRenderedComponentWithType(tree, Wrapper);
            const inputs = scryRenderedComponentsWithType(tree, Checkbox);
            const $foo = findDOMNode(inputs[0]);
            const $qux = findDOMNode(inputs[1]);
            expect($foo.value).toEqual('true');
            expect($foo.checked).toEqual(true);
            expect($qux.value).toEqual('true');
            expect($qux.checked).toEqual(false);

            wrapper.setState({ qux: true }, () => {
                expect($foo.checked).toEqual(true);
                expect($qux.checked).toEqual(true);
                done();
            });
        });
    });
    describe('when input changes', () => {
        it('should propagate changes', done => {
            const spy = createSpy();
            const values = {
                foo: true,
                qux: false,
                doo: {
                    foo: true
                }
            };
            const tree = renderIntoDocument(
                <Form
                    values={values}
                    onChange={spy}>
                    <Checkbox name="foo"/>
                    <Checkbox name="qux"/>
                    <Checkbox name="doo.foo"/>
                </Form>
            );
            const inputs = scryRenderedDOMComponentsWithTag(tree, 'input');
            const input = inputs[0];
            const $input = findDOMNode(input);
            Simulate.change($input, { target: { checked: false } });

            const nextValues = spy.calls[0].arguments[0];
            expect(spy.calls.length).toEqual(1);
            expect(nextValues).toEqual({
                foo: false,
                qux: false,
                doo: {
                    foo: true
                }
            });
            expect(values === nextValues).toEqual(false);
            expect(values.doo === nextValues.doo).toEqual(true);
            done();
        });
    });
    describe('when form is disabled', () => {
        it('should be disabled too', done => {
            const values = { foo: true };
            const tree = renderIntoDocument(
                <Form
                    disabled
                    values={values}
                    onChange={noop}>
                    <Checkbox name="foo"/>
                </Form>
            );

            const input = findRenderedComponentWithType(tree, Checkbox);
            expect(findDOMNode(input).disabled).toEqual(true);
            done();
        });
    });
});
