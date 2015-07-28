import React, { Component } from 'react';
import { Form } from 'react-formalize';
import TextInput from './TextInput';

const mock = {
    title: 'Hello World',
    description: 'Just a simple example'
};

export default class App extends Component {

    handleSubmit(data) {
        alert(JSON.stringify(data));
    }

    render() {
        return (
            <div>
                <h1>Simple example</h1>
                <Form data={mock} onSubmit={this.handleSubmit}>
                    <div>
                        <label>Title</label>
                        <TextInput name="title"/>
                    </div>
                    <div>
                        <label>Description</label>
                        <TextInput name="description"/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </div>
        );
    }
}
