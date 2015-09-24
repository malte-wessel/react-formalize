import React, { Component } from 'react';
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
    it('should be able to change disabled state', (done) => {
        class NoReRender extends Component {
            shouldComponentUpdate() { return false; }
            render() { return <div>{this.props.children}</div>; }
        }

        class Root extends Component {
            constructor(props, context) {
                super(props, context);
                this.state = { disabled: false };
            }
            render() {
                return (
                    <Form disabled={this.state.disabled}>
                        <NoReRender>
                            <Checkbox name="foo"/>
                        </NoReRender>
                    </Form>
                );
            }
        }

        const tree = renderIntoDocument(<Root/>);
        const root = findRenderedComponentWithType(tree, Root);
        const input = findRenderedComponentWithType(tree, Checkbox);
        const $input = findDOMNode(input);
        expect($input.disabled).toEqual(false);

        root.setState({ disabled: true}, () => {
            expect($input.disabled).toEqual(true);
            done();
        });
    });
});
