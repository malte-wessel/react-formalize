import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    scryRenderedDOMComponentsWithTag
} from 'react/lib/ReactTestUtils';

import Form from '../../../src/components/Form';
import Select from '../../../src/components/inputs/Select';

describe('Select', () => {
    describe('single select', () => {
        it('should accept options property', () => {
            const values = {
                foo: 'bux'
            };
            const options = {
                bux: 'bar',
                qux: 'qax'
            };
            const tree = renderIntoDocument(
                <Form values={values}>
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
                <Form values={values}>
                    <Select name="foo">
                        <option value="bux">bar</option>
                        <option value="qux">qax</option>
                    </Select>
                </Form>
            );

            const input = findRenderedComponentWithType(tree, Select);
            const $input = findDOMNode(input);
            expect($input.value).toEqual('bux');
            expect($input.childNodes[0].value).toEqual('bux');
            expect($input.childNodes[1].value).toEqual('qux');
        });
        it('should accept default value', () => {
            const values = {
                foo: 'bux'
            };
            const options = {
                bux: 'bar',
                qux: 'qax'
            };
            const tree = renderIntoDocument(
                <Form values={values}>
                    <Select name="foo" options={options}/>
                </Form>
            );

            const input = findRenderedComponentWithType(tree, Select);
            const $input = findDOMNode(input);
            expect($input.value).toEqual('bux');
        });
        it('should propagate own value', () => {
            const options = {
                bux: 'bar',
                qux: 'qax'
            };
            const tree = renderIntoDocument(
                <Form>
                    <Select name="foo" value="bux" options={options}/>
                </Form>
            );

            const form = findRenderedComponentWithType(tree, Form);
            expect(form.values).toEqual({ foo: 'bux' });
        });
    });

    describe('multi select', () => {
        it('should accept options property', () => {
            const values = {
                foo: ['bux', 'qux']
            };
            const options = {
                bux: 'bar',
                qux: 'qax',
                fux: 'fax'
            };
            const tree = renderIntoDocument(
                <Form values={values}>
                    <Select name="foo" multiple options={options}/>
                </Form>
            );

            const input = findRenderedComponentWithType(tree, Select);
            const $input = findDOMNode(input);
            expect($input.childNodes[0].selected).toEqual(true);
            expect($input.childNodes[1].selected).toEqual(true);
            expect($input.childNodes[2].selected).toEqual(false);
        });
        it('should accept options as childs', () => {
            const values = {
                foo: ['bux', 'qux']
            };
            const tree = renderIntoDocument(
                <Form values={values}>
                    <Select multiple name="foo">
                        <option value="bux">bar</option>
                        <option value="qux">qax</option>
                        <option value="fux">fax</option>
                    </Select>
                </Form>
            );

            const input = findRenderedComponentWithType(tree, Select);
            const $input = findDOMNode(input);
            expect($input.childNodes[0].selected).toEqual(true);
            expect($input.childNodes[1].selected).toEqual(true);
            expect($input.childNodes[2].selected).toEqual(false);
        });
        it('should accept default value', () => {
            const values = {
                foo: ['bux', 'qux']
            };
            const options = {
                bux: 'bar',
                qux: 'qax',
                fux: 'fax'
            };
            const tree = renderIntoDocument(
                <Form values={values}>
                    <Select name="foo" multiple options={options}/>
                </Form>
            );

            const input = findRenderedComponentWithType(tree, Select);
            const $input = findDOMNode(input);
            expect($input.childNodes[0].selected).toEqual(true);
            expect($input.childNodes[1].selected).toEqual(true);
            expect($input.childNodes[2].selected).toEqual(false);
        });
        it('should propagate own value', () => {
            const options = {
                bux: 'bar',
                qux: 'qax',
                fux: 'fax'
            };
            const tree = renderIntoDocument(
                <Form>
                    <Select name="foo" multiple value={['bux', 'qux']} options={options}/>
                </Form>
            );

            const form = findRenderedComponentWithType(tree, Form);
            expect(form.values).toEqual({ foo: ['bux', 'qux'] });
        });
    });

    it('should be disabled if form is', () => {
        const tree = renderIntoDocument(
            <Form disabled>
                <Select name="foo"/>
            </Form>
        );

        const input = findRenderedComponentWithType(tree, Select);
        expect(findDOMNode(input).disabled).toEqual(true);
    });
    it('should not be disabled if form is not', () => {
        const tree = renderIntoDocument(
            <Form>
                <Select name="foo"/>
            </Form>
        );

        const input = findRenderedComponentWithType(tree, Select);
        expect(findDOMNode(input).disabled).toEqual(false);
    });
    it('should rerender when options change', done => {
        class Root extends Component {
            constructor(props, context) {
                super(props, context);
                this.state = {};
            }
            render() {
                const { odd } = this.state;
                const options = odd
                    ? { foo: 'bar' }
                    : { qux: 'fax' };
                return (
                    <Form>
                        <Select
                            placeholder="placeholder"
                            name="foo"
                            options={options}/>
                    </Form>
                );
            }
        }

        const tree = renderIntoDocument(<Root/>);
        const root = findRenderedComponentWithType(tree, Root);
        const option = scryRenderedDOMComponentsWithTag(tree, 'option');
        expect(option[0].value).toEqual('');
        expect(option[1].value).toEqual('qux');
        root.setState({ odd: true}, () => {
            const option2 = scryRenderedDOMComponentsWithTag(tree, 'option');
            expect(option2[0].value).toEqual('');
            expect(option2[1].value).toEqual('foo');
            done();
        });
    });
    it('should accept placeholder option', () => {
        const tree = renderIntoDocument(
            <Form>
                <Select
                    name="foo"
                    options={{foo: 'bar', qux: 'qax'}}
                    placeholder="bun"/>
            </Form>
        );
        const options = scryRenderedDOMComponentsWithTag(tree, 'option');
        expect(options.length).toEqual(3);
        expect(options[0].value).toEqual('');
        expect(options[0].disabled).toEqual(true);
    });
});
