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
import Select from '../../src/components/Select';

const noop = () => {};

describe('Select', () => {
    describe('when form is disabled', () => {
        it('should be disabled too', () => {
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
                    <Select name="foo" options={options}/>
                </Form>
            );

            const $select = findRenderedDOMComponentWithTag(tree, 'select');
            expect($select.disabled).toEqual(true);
        });
    });

    describe('when a placeholder is given', () => {
        it.skip('should add a placeholder option', () => {
            const tree = renderIntoDocument(
                <Form
                    values={{}}
                    onChange={noop}
                    >
                    <Select
                        name="foo"
                        options={{ foo: 'bar', qux: 'qax' }}
                        placeholder="bun"/>
                </Form>
            );
            const options = scryRenderedDOMComponentsWithTag(tree, 'option');
            console.log(options);
            expect(options.length).toEqual(3);
            expect(options[0].value).toEqual('');
            expect(options[0].disabled).toEqual(true);
        });
    });

    describe('single select', () => {
        describe('options', () => {
            it('should accept options property', () => {
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
                        <Select name="foo" options={options}/>
                    </Form>
                );

                const input = findRenderedComponentWithType(tree, Select);
                const $input = findDOMNode(input);
                expect($input.value).toEqual('bux');
                expect($input.childNodes[0].value).toEqual('bux');
                expect($input.childNodes[1].value).toEqual('qux');
            });
            it('should accept options as childs', () => {
                const values = {
                    foo: 'qax'
                };
                const tree = renderIntoDocument(
                    <Form
                        values={values}
                        onChange={noop}>
                        <Select name="foo">
                            <option value="bux">bar</option>
                            <option value="qux">qax</option>
                        </Select>
                    </Form>
                );

                const input = findRenderedDOMComponentWithTag(tree, 'select');
                const $input = findDOMNode(input);
                expect($input.value).toEqual('bux');
                expect($input.childNodes[0].value).toEqual('bux');
                expect($input.childNodes[1].value).toEqual('qux');
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
                        <Select name="foo" options={options}/>
                    </Form>
                );

                const $select = findRenderedDOMComponentWithTag(tree, 'select');
                const $options = scryRenderedDOMComponentsWithTag(tree, 'option');
                expect($select.value).toEqual('bux');
                expect($options[0].selected).toEqual(true);
                expect($options[1].selected).toEqual(false);
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
                                <Select name="foo" options={options}/>
                            </Form>
                        );
                    }
                });
                const tree = renderIntoDocument(<Wrapper/>);
                const wrapper = findRenderedComponentWithType(tree, Wrapper);
                const $options = scryRenderedDOMComponentsWithTag(tree, 'option');
                expect($options[0].selected).toEqual(true);
                expect($options[1].selected).toEqual(false);

                wrapper.setState({ foo: 'qux' }, () => {
                    expect($options[0].selected).toEqual(false);
                    expect($options[1].selected).toEqual(true);
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
                        <Select name="foo" options={options}/>
                        <Select name="qux" options={options}/>
                        <Select name="doo.foo" options={options}/>
                    </Form>
                );
                const selects = scryRenderedDOMComponentsWithTag(tree, 'select');
                const select = selects[0];
                const $select = findDOMNode(select);
                Simulate.change($select, { target: { value: 'qux' } });

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
    });

    describe('multi select', () => {
        describe('options', () => {
            it('should accept options property', () => {
                const values = {
                    foo: ['bux']
                };
                const options = {
                    bux: 'bar',
                    qux: 'qax'
                };
                const tree = renderIntoDocument(
                    <Form
                        values={values}
                        onChange={noop}>
                        <Select
                            multiple
                            name="foo"
                            options={options}/>
                    </Form>
                );

                const input = findRenderedComponentWithType(tree, Select);
                const $input = findDOMNode(input);
                expect($input.childNodes[0].value).toEqual('bux');
                expect($input.childNodes[0].selected).toEqual(true);
                expect($input.childNodes[1].value).toEqual('qux');
                expect($input.childNodes[1].selected).toEqual(false);
            });
            it('should accept options as childs', () => {
                const values = {
                    foo: ['bux']
                };
                const tree = renderIntoDocument(
                    <Form
                        values={values}
                        onChange={noop}>
                        <Select
                            multiple
                            name="foo">
                            <option value="bux">bar</option>
                            <option value="qux">qax</option>
                        </Select>
                    </Form>
                );

                const input = findRenderedComponentWithType(tree, Select);
                const $input = findDOMNode(input);
                expect($input.childNodes[0].value).toEqual('bux');
                expect($input.childNodes[0].selected).toEqual(true);
                expect($input.childNodes[1].value).toEqual('qux');
                expect($input.childNodes[1].selected).toEqual(false);
            });
        });
        describe('when rendering for the first time', () => {
            it('should take given value', done => {
                const values = {
                    foo: ['bux', 'qux']
                };
                const options = {
                    bux: 'bar',
                    qux: 'qax'
                };
                const tree = renderIntoDocument(
                    <Form
                        values={values}
                        onChange={noop}>
                        <Select
                            multiple
                            name="foo"
                            options={options}/>
                    </Form>
                );
                const $options = scryRenderedDOMComponentsWithTag(tree, 'option');
                expect($options[0].selected).toEqual(true);
                expect($options[1].selected).toEqual(true);
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
                            foo: ['bux']
                        };
                    },
                    render() {
                        return (
                            <Form
                                values={this.state}
                                onChange={noop}>
                                <Select
                                    multiple
                                    name="foo"
                                    options={options}/>
                            </Form>
                        );
                    }
                });
                const tree = renderIntoDocument(<Wrapper/>);
                const wrapper = findRenderedComponentWithType(tree, Wrapper);
                const $options = scryRenderedDOMComponentsWithTag(tree, 'option');
                expect($options[0].selected).toEqual(true);
                expect($options[1].selected).toEqual(false);

                wrapper.setState({ foo: ['bux', 'qux'] }, () => {
                    expect($options[0].selected).toEqual(true);
                    expect($options[1].selected).toEqual(true);
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
                    foo: ['bux'],
                    qux: 'qux',
                    doo: {
                        foo: 'bux'
                    }
                };
                const tree = renderIntoDocument(
                    <Form
                        values={values}
                        onChange={spy}>
                        <Select multiple name="foo" options={options}/>
                        <Select name="qux" options={options}/>
                        <Select name="doo.foo" options={options}/>
                    </Form>
                );
                const selects = scryRenderedDOMComponentsWithTag(tree, 'select');
                const select = selects[0];
                const $select = findDOMNode(select);
                $select.options[0].selected = true;
                $select.options[1].selected = true;
                Simulate.change($select, { target: $select });

                const nextValues = spy.calls[0].arguments[0];
                expect(spy.calls.length).toEqual(1);
                expect(nextValues).toEqual({
                    foo: ['bux', 'qux'],
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
    });

    // it('should rerender when options change', done => {
    //     class Root extends Component {
    //         constructor(props, context) {
    //             super(props, context);
    //             this.state = {};
    //         }
    //         render() {
    //             const { odd } = this.state;
    //             const options = odd
    //                 ? { foo: 'bar' }
    //                 : { qux: 'fax' };
    //             return (
    //                 <Form>
    //                     <Select
    //                         placeholder="placeholder"
    //                         name="foo"
    //                         options={options}/>
    //                 </Form>
    //             );
    //         }
    //     }
    //
    //     const tree = renderIntoDocument(<Root/>);
    //     const root = findRenderedComponentWithType(tree, Root);
    //     const option = scryRenderedDOMComponentsWithTag(tree, 'option');
    //     expect(option[0].value).toEqual('');
    //     expect(option[1].value).toEqual('qux');
    //     root.setState({ odd: true}, () => {
    //         const option2 = scryRenderedDOMComponentsWithTag(tree, 'option');
    //         expect(option2[0].value).toEqual('');
    //         expect(option2[1].value).toEqual('foo');
    //         done();
    //     });
    // });
    // it('should accept placeholder option', () => {
    //     const tree = renderIntoDocument(
    //         <Form>
    //             <Select
    //                 name="foo"
    //                 options={{foo: 'bar', qux: 'qax'}}
    //                 placeholder="bun"/>
    //         </Form>
    //     );
    //     const options = scryRenderedDOMComponentsWithTag(tree, 'option');
    //     expect(options.length).toEqual(3);
    //     expect(options[0].value).toEqual('');
    //     expect(options[0].disabled).toEqual(true);
    // });
});
