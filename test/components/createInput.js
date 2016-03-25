import React, { createClass } from 'react';
// import { findDOMNode, unmountComponentAtNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    scryRenderedComponentsWithType,
    // findRenderedDOMComponentWithTag,
    // Simulate
} from 'react/lib/ReactTestUtils';

import Form from '../../src/components/Form';
import createInput from '../../src/components/createInput';

const Component = createClass({ render: () => <div/> });
const Input = createInput(Component);

describe('createInput', () => {
    describe('when rendering for the first time', () => {
        it('should receive given value', () => {
            const values = { foo: 'bar' };
            const tree = renderIntoDocument(
                    <Form values={values}>
                        <Input name="foo"/>
                    </Form>
                );
            const component = findRenderedComponentWithType(tree, Component);
            expect(component.props.value).toEqual('bar');
        });
    });

    describe('when values change', () => {
        it.only('should update respective components', () => {
            const Wrapper = createClass({
                getInitialState() {
                    return {
                        foo: 'bar',
                        qux: 'qax'
                    };
                },
                render() {
                    return (
                        <Form values={this.state}>
                            <Input name="foo"/>
                            <Input name="qux"/>
                        </Form>
                    );
                }
            });
            const tree = renderIntoDocument(<Wrapper/>);
            const wrapper = findRenderedComponentWithType(tree, Wrapper);
            const components = scryRenderedComponentsWithType(tree, Component);
            expect(components[0].props.value).toEqual('bar');
            expect(components[1].props.value).toEqual('qax');

            wrapper.setState({ foo: 'doo' }, () => {
                expect(components[0].props.value).toEqual('doo');
                expect(components[1].props.value).toEqual('qax');
            });
        });
    });


    // it('should register on mount', () => {
    //     const tree = renderIntoDocument(
    //         <Form>
    //             <Input name="foo" value="bar"/>
    //         </Form>
    //     );
    //
    //     const form = findRenderedComponentWithType(tree, Form);
    //     expect(form.inputs).toEqual({ foo: 'bar' });
    //     expect(form.values).toEqual({ foo: 'bar' });
    // });
    //
    // it('should unregister on unmount', () => {
    //     const tree = renderIntoDocument(
    //         <Form>
    //             <Input name="foo" value="bar"/>
    //         </Form>
    //     );
    //
    //     const form = findRenderedComponentWithType(tree, Form);
    //     unmountComponentAtNode(findDOMNode(tree).parentNode);
    //     expect(form.inputs.foo).toBeA('undefined');
    //     expect(form.listeners.length).toEqual(0);
    // });
    //
    // it('should pass onChange, value and rest props to children', () => {
    //     const values = { foo: 'bar' };
    //     const tree = renderIntoDocument(
    //         <Form values={values}>
    //             <Input name="foo" baz="qux"/>
    //         </Form>
    //     );
    //     const input = findRenderedComponentWithType(tree, Receiver);
    //     expect(input.props.value).toEqual('bar');
    //     expect(input.props.onChange).toBeA('function');
    //     expect(input.props.baz).toEqual('qux');
    // });
    //
    // it('should propagate onChange', () => {
    //     const tree = renderIntoDocument(
    //         <Form>
    //             <Input name="foo"/>
    //         </Form>
    //     );
    //
    //     const domInput = findDOMNode(findRenderedDOMComponentWithTag(tree, 'input'));
    //     Simulate.change(domInput, {target: {value: 'bar'}});
    //
    //     const input = findRenderedComponentWithType(tree, Input);
    //     const form = findRenderedComponentWithType(tree, Form);
    //
    //     expect(input.state.value).toEqual('bar');
    //     expect(form.values).toEqual({ foo: 'bar' });
    // });
    //
    // it('should propagate onPaste', () => {
    //     const tree = renderIntoDocument(
    //         <Form>
    //             <Input name="foo"/>
    //         </Form>
    //     );
    //
    //     const domInput = findDOMNode(findRenderedDOMComponentWithTag(tree, 'input'));
    //     Simulate.paste(domInput, {target: {value: 'bar'}});
    //
    //     const input = findRenderedComponentWithType(tree, Input);
    //     const form = findRenderedComponentWithType(tree, Form);
    //
    //     expect(input.state.value).toEqual('bar');
    //     expect(form.values).toEqual({ foo: 'bar' });
    // });
    //
    // it('should propagate onCut', () => {
    //     const tree = renderIntoDocument(
    //         <Form>
    //             <Input name="foo"/>
    //         </Form>
    //     );
    //
    //     const domInput = findDOMNode(findRenderedDOMComponentWithTag(tree, 'input'));
    //     Simulate.cut(domInput, {target: {value: 'bar'}});
    //
    //     const input = findRenderedComponentWithType(tree, Input);
    //     const form = findRenderedComponentWithType(tree, Form);
    //
    //     expect(input.state.value).toEqual('bar');
    //     expect(form.values).toEqual({ foo: 'bar' });
    // });
    //
    // describe('when not connected', () => {
    //     it('should not register on mount', () => {
    //         const tree = renderIntoDocument(
    //             <Form>
    //                 <Input
    //                     connected={false}
    //                     name="foo"
    //                     value="bar"/>
    //             </Form>
    //         );
    //
    //         const form = findRenderedComponentWithType(tree, Form);
    //         expect(form.inputs).toEqual({});
    //         expect(form.values).toEqual({});
    //     });
    //
    //     it('should not propagate onChange', () => {
    //         const Root = createClass({
    //             getInitialState() {
    //                 return { foo: 'bar' };
    //             },
    //             handleChange(value) {
    //                 this.setState({ foo: value });
    //             },
    //             render() {
    //                 const { foo } = this.state;
    //                 return (
    //                     <Form>
    //                         <Input
    //                             name="foo"
    //                             onChange={this.handleChange}
    //                             connected={false}
    //                             value={foo}/>
    //                     </Form>
    //                 );
    //             }
    //         });
    //
    //         const tree = renderIntoDocument(<Root/>);
    //         const domInput = findDOMNode(findRenderedDOMComponentWithTag(tree, 'input'));
    //         const form = findRenderedComponentWithType(tree, Form);
    //         expect(domInput.value).toEqual('bar');
    //         expect(form.values).toEqual({});
    //         Simulate.change(domInput, {target: {value: 'qux'}});
    //         expect(domInput.value).toEqual('qux');
    //         expect(form.values).toEqual({});
    //     });
    // });
});
