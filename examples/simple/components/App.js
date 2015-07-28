import React, { Component } from 'react';
import { Form, Text, Checkbox } from 'react-formalize';

const mock = {
    title: 'Hello World',
    description: 'Just a simple example',
    publish: false
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
                        <Text name="title"/>
                    </div>
                    <div>
                        <label>Description</label>
                        <Text name="description"/>
                    </div>
                    <div>
                        <label>Publish</label>
                        <Checkbox name="publish"/> publish this post
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </div>
        );
    }
}
