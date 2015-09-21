import React from 'react';
import { findDOMNode } from 'react-dom';
import {
    renderIntoDocument,
    findRenderedComponentWithType,
    findRenderedDOMComponentWithTag
} from 'react/lib/ReactTestUtils';

import Message from '../../src/components/Message';
import Form from '../../src/components/Form';

describe('Message', () => {
    it('should display messages', () => {
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

    it('should take a custom render function', () => {
        const messages = {
            foo: 'bar'
        };

        function renderMessage(message) {
            return <div>{message}</div>;
        }

        const tree = renderIntoDocument(
            <Form messages={messages}>
                <Message name="foo" renderMessage={renderMessage}/>
            </Form>
        );

        const div = findRenderedDOMComponentWithTag(tree, 'div');
        expect(div).toNotEqual(null);
    });

    it('should not render when no message available', () => {
        const tree = renderIntoDocument(
            <Form>
                <Message name="foo"/>
            </Form>
        );

        const message = findRenderedComponentWithType(tree, Message);
        expect(findDOMNode(message)).toEqual(null);
    });

    describe('when used as wrapper', () => {
        it('should accept a function as child (no message)', () => {
            const tree = renderIntoDocument(
                <Form>
                    <Message name="foo">{message =>
                        <div>{message}</div>
                    }
                    </Message>
                </Form>
            );

            const div = findRenderedDOMComponentWithTag(tree, 'div');
            expect(div).toNotEqual(null);
        });
        it('should accept a function as child', () => {
            const messages = {
                foo: 'bar'
            };
            const tree = renderIntoDocument(
                <Form messages={messages}>
                    <Message name="foo">{message =>
                        <div>{message}</div>
                    }
                    </Message>
                </Form>
            );

            const div = findRenderedDOMComponentWithTag(tree, 'div');
            const $div = findDOMNode(div);
            expect($div.childNodes[0].nodeValue).toEqual('bar');
        });
    });
});
