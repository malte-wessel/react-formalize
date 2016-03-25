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
    it('should add form to child context', () => {
        class Child extends Component {
            static contextTypes = {
                form: PropTypes.any
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
        expect(child.context.form).toBeA('object');
        expect(child.context.form.getValue).toBeA('function');
        expect(child.context.form.setValue).toBeA('function');
    });

    it('should add the passed values to its state', () => {
        const values = { foo: 'bar' };

        const tree = renderIntoDocument(
            <Form values={values}/>
        );

        const form = findRenderedComponentWithType(tree, Form);
        expect(form.values).toEqual(values);
    });

    it.only('should merge values from its input child components', () => {
        const values = { foo: 'faz', boo: 'baz' };

        const tree = renderIntoDocument(
            <Form values={values}>
                <Text name="boo" value="bar"/>
                <Text name="qux.boo" value="bar"/>
                <Text name="qux.qoo"/>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        expect(form.values).toEqual({
            foo: 'faz',
            boo: 'baz',
            qux: {
                boo: 'bar',
                qoo: ''
            }
        });
    });

    it('should call `onChange` when a value changes', () => {
        let onChangeResult;
        function onChange(values) { onChangeResult = values; }

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

        const before = form.values;
        Simulate.change(input, {target: {value: 'baz'}});
        const after = form.values;

        expect(before === after).toBe(false);
        expect(before.qux === after.qux).toBe(true);
    });

    it('should propagate changes, when values property changes', (done) => {
        class Root extends Component {
            constructor(props, context) {
                super(props, context);
                this.state = {};
            }
            render() {
                return (
                    <Form values={this.state}>
                        <Text name="foo" value="bar"/>
                    </Form>
                );
            }
        }

        const tree = renderIntoDocument(<Root/>);
        const root = findRenderedComponentWithType(tree, Root);
        const form = findRenderedComponentWithType(tree, Form);

        root.setState({ foo: 'baz'}, () => {
            expect(form.values).toEqual({ foo: 'baz' });
            done();
        });
    });

    it('should support children as function', () => {
        const values = {
            foo: 'bar'
        };
        const tree = renderIntoDocument(
            <Form values={values}>{() =>
                <Text name="foo"/>
            }
            </Form>
        );

        const input = findRenderedComponentWithType(tree, Text);
        const $input = findDOMNode(input);
        expect($input.value).toEqual('bar');
    });

    it('should reset registered inputs on rerendering', done => {
        class Root extends Component {
            constructor(props, context) {
                super(props, context);
                this.state = {};
            }
            render() {
                const { odd } = this.state;

                const values = odd
                    ? { foo: 'bar', bar: 'doo' }
                    : { qux: 'fax', bar: 'noo' };

                return (
                    <Form values={values}>
                        {odd ?
                            <Text name="foo" value="bar2"/> :
                            <Text name="qux" value="fax2"/>
                        }
                        <Text name="bar"/>
                    </Form>
                );
            }
        }

        const tree = renderIntoDocument(<Root/>);
        const root = findRenderedComponentWithType(tree, Root);
        const form = findRenderedComponentWithType(tree, Form);
        const inputs = scryRenderedComponentsWithType(tree, Text);
        const text1 = findDOMNode(inputs[0]);
        const text2 = findDOMNode(inputs[1]);

        expect(form.values).toEqual({ qux: 'fax', bar: 'noo' });
        expect(form.inputs).toEqual({ qux: 'fax2', bar: null });
        expect(text1.value).toEqual('fax');
        expect(text2.value).toEqual('noo');

        root.setState({ odd: true}, () => {
            expect(form.values).toEqual({ foo: 'bar', bar: 'doo' });
            expect(form.inputs).toEqual({ foo: 'bar2', bar: 'noo' });
            expect(text1.value).toEqual('bar');
            expect(text2.value).toEqual('doo');
            done();
        });
    });
});
