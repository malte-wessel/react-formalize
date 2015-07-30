import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    scryRenderedComponentsWithType,
    Simulate
} from 'react/lib/ReactTestUtils';

import Form from '../../src/components/Form';
import Text from '../../src/components/inputs/Text';

describe('Form', () => {
    it('should add register, getState and setState to the child context', () => {
        class Child extends Component {
            static contextTypes = {
                register: PropTypes.func,
                getValue: PropTypes.func,
                setValue: PropTypes.func
            };

            render() {
                return <div/>;
            }
        }

        const tree = renderIntoDocument(
            <Form>
                <div>
                    <Child/>
                </div>
            </Form>
        );

        const child = findRenderedComponentWithType(tree, Child);
        expect(child.context.register).toBeA('function');
        expect(child.context.getValue).toBeA('function');
        expect(child.context.setValue).toBeA('function');
    });

    it('should add the passed data to its state', () => {
        const data = { foo: 'bar' };

        const tree = renderIntoDocument(
            <Form data={data}/>
        );

        const form = findRenderedComponentWithType(tree, Form);
        expect(form.state.data).toEqual(data);
    });

    it('should merge data from its input child components', () => {
        const data = { foo: 'faz', boo: 'baz' };

        const tree = renderIntoDocument(
            <Form data={data}>
                <Text name="boo" value="bar"/>
                <Text name="qux.boo" value="bar"/>
                <Text name="qux.qoo"/>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        expect(form.state.data).toEqual({
            foo: 'faz',
            boo: 'baz',
            qux: {
                boo: 'bar',
                qoo: null
            }
        });
    });

    it('should call `onChange` when a value changes', () => {
        let onChangeResult;
        function onChange(data) { onChangeResult = data; }

        const tree = renderIntoDocument(
            <Form onChange={onChange}>
                <Text name="foo" value="bar"/>
                <Text name="bar" value="foo"/>
            </Form>
        );

        const inputs = scryRenderedComponentsWithType(tree, Text);
        const input = findDOMNode(inputs[0]);
        Simulate.change(input, {target: {value: 'baz'}});
        expect(onChangeResult).toEqual({
            foo: 'baz',
            bar: 'foo'
        });
    });

    it('should not mutate the state when a value changes', () => {
        const tree = renderIntoDocument(
            <Form>
                <Text name="boo" value="bar"/>
                <Text name="qux.boo" value="bar"/>
                <Text name="qux.qoo"/>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        const inputs = scryRenderedComponentsWithType(tree, Text);
        const input = findDOMNode(inputs[0]);

        const before = form.state.data;
        Simulate.change(input, {target: {value: 'baz'}});
        const after = form.state.data;

        expect(before === after).toBe(false);
        expect(before.qux === after.qux).toBe(true);
    });

    it('should propagate changes, when data property changes', (done) => {
        class Root extends Component {
            constructor(props, context) {
                super(props, context);
                this.state = {};
            }
            render() {
                return (
                    <Form data={this.state}>
                        <Text name="foo" value="bar"/>
                    </Form>
                );
            }
        }

        const tree = renderIntoDocument(<Root/>);
        const root = findRenderedComponentWithType(tree, Root);
        const form = findRenderedComponentWithType(tree, Form);

        root.setState({ foo: 'baz'}, () => {
            expect(form.state.data).toEqual({ foo: 'baz' });
            done();
        });
    });
});
