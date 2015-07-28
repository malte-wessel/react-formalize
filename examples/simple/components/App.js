import React, { Component } from 'react';
import { Form, Text, Checkbox, Select } from 'react-formalize';

const mock = {
    title: 'Hello World'
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
                        <label>Category</label>
                        <Select name="category">
                            <option value="news">News</option>
                            <option value="foo">Foo</option>
                        </Select>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </div>
        );
    }
}
