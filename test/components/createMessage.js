import React, { createClass } from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType
} from 'react/lib/ReactTestUtils';

import createMessage from '../../src/components/createMessage';
import Form from '../../src/components/Form';

const Message = createMessage(createClass({
    render() {
        const { message } = this.props;
        return <div>{message}</div>;
    }
}));

describe('createMessage', () => {
    it('should pass message', () => {
        const messages = {
            foo: 'bar'
        };
        const tree = renderIntoDocument(
            <Form messages={messages}>
                <Message name="foo"/>
            </Form>
        );

        const message = findRenderedComponentWithType(tree, Message);
        const $message = findDOMNode(message);
        expect($message.childNodes[0].nodeValue).toEqual('bar');
    });

    it('should pass nested messages', () => {
        const messages = {
            foo: {
                boo: 'bar'
            }
        };
        const tree = renderIntoDocument(
            <Form messages={messages}>
                <Message name="foo.boo"/>
            </Form>
        );

        const message = findRenderedComponentWithType(tree, Message);
        const $message = findDOMNode(message);
        expect($message.childNodes[0].nodeValue).toEqual('bar');
    });

    it('should pass nested messages (path keys)', () => {
        const messages = {
            'foo.boo': 'bar'
        };
        const tree = renderIntoDocument(
            <Form messages={messages}>
                <Message name="foo.boo"/>
            </Form>
        );

        const message = findRenderedComponentWithType(tree, Message);
        const $message = findDOMNode(message);
        expect($message.childNodes[0].nodeValue).toEqual('bar');
    });
});
