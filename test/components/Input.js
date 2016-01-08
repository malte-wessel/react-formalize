import React, { Component } from 'react';
import { findDOMNode, unmountComponentAtNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    findRenderedDOMComponentWithTag,
    Simulate
} from 'react/lib/ReactTestUtils';

import Form from '../../src/components/Form';
import Input from '../../src/components/Input';

describe('Input', () => {
    it('should register on mount', () => {
        const tree = renderIntoDocument(
            <Form>
                <Input name="foo" value="bar">{props => <div {...props}/>}</Input>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        expect(form.inputs).toEqual({ foo: 'bar' });
        expect(form.values).toEqual({ foo: 'bar' });
    });

    it('should unregister on unmount', () => {
        const tree = renderIntoDocument(
            <Form>
                <Input name="foo" value="bar">{props => <div {...props}/>}</Input>
            </Form>
        );

        const form = findRenderedComponentWithType(tree, Form);
        unmountComponentAtNode(findDOMNode(tree).parentNode);
        expect(form.inputs.foo).toBeA('undefined');
        expect(form.listeners.length).toEqual(0);
    });

    it('should pass onChange, value and rest props to children', () => {
        const values = { foo: 'bar' };

        let propsResult;
        function children(props) {
            propsResult = props;
            return <div/>;
        }

        renderIntoDocument(
            <Form values={values}>
                <Input name="foo" baz="qux">{children}</Input>
            </Form>
        );
        expect(propsResult.value).toEqual('bar');
        expect(propsResult.onChange).toBeA('function');
        expect(propsResult.baz).toEqual('qux');
    });

    it('should propagate onChange', () => {
        const tree = renderIntoDocument(
            <Form>
                <Input name="foo">
                    {props => <input {...props}/>}
                </Input>
            </Form>
        );

        const domInput = findDOMNode(findRenderedDOMComponentWithTag(tree, 'input'));
        Simulate.change(domInput, {target: {value: 'bar'}});

        const input = findRenderedComponentWithType(tree, Input);
        const form = findRenderedComponentWithType(tree, Form);

        expect(input.state.value).toEqual('bar');
        expect(form.values).toEqual({ foo: 'bar' });
    });

    it('should propagate onPaste', () => {
        const tree = renderIntoDocument(
            <Form>
                <Input name="foo">
                    {props => <input {...props}/>}
                </Input>
            </Form>
        );

        const domInput = findDOMNode(findRenderedDOMComponentWithTag(tree, 'input'));
        Simulate.paste(domInput, {target: {value: 'bar'}});

        const input = findRenderedComponentWithType(tree, Input);
        const form = findRenderedComponentWithType(tree, Form);

        expect(input.state.value).toEqual('bar');
        expect(form.values).toEqual({ foo: 'bar' });
    });

    it('should propagate onCut', () => {
        const tree = renderIntoDocument(
            <Form>
                <Input name="foo">
                    {props => <input {...props}/>}
                </Input>
            </Form>
        );

        const domInput = findDOMNode(findRenderedDOMComponentWithTag(tree, 'input'));
        Simulate.cut(domInput, {target: {value: 'bar'}});

        const input = findRenderedComponentWithType(tree, Input);
        const form = findRenderedComponentWithType(tree, Form);

        expect(input.state.value).toEqual('bar');
        expect(form.values).toEqual({ foo: 'bar' });
    });

    describe('when not connected', () => {
        it('should not register on mount', () => {
            const tree = renderIntoDocument(
                <Form>
                    <Input
                        connected={false}
                        name="foo"
                        value="bar">
                        {props =>
                            <div {...props}/>
                        }
                    </Input>
                </Form>
            );

            const form = findRenderedComponentWithType(tree, Form);
            expect(form.inputs).toEqual({});
            expect(form.values).toEqual({});
        });

        it('should not propagate onChange', () => {
            class Root extends Component {
                constructor(props, context) {
                    super(props, context);
                    this.state = { foo: 'bar' };
                }
                handleChange(value) {
                    this.setState({ foo: value });
                }
                render() {
                    const { foo } = this.state;

                    return (
                        <Form>
                            <Input
                                onChange={this.handleChange.bind(this)}
                                connected={false}
                                value={foo}>
                                {props => <input {...props}/>}
                            </Input>
                        </Form>
                    );
                }
            }

            const tree = renderIntoDocument(<Root/>);
            const domInput = findDOMNode(findRenderedDOMComponentWithTag(tree, 'input'));
            const input = findRenderedComponentWithType(tree, Input);
            const form = findRenderedComponentWithType(tree, Form);
            expect(domInput.value).toEqual('bar');
            expect(form.values).toEqual({});
            Simulate.change(domInput, {target: {value: 'qux'}});
            expect(domInput.value).toEqual('qux');
            expect(form.values).toEqual({});
        });
    });
});
