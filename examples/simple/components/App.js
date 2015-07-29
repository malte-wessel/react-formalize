import React, { Component } from 'react';
import {
    Form,
    Text,
    TextArea,
    Checkbox,
    RadioGroup,
    Select } from 'react-formalize';

const mock = {
    title: 'Hello World'
};

export default class App extends Component {

    handleChange(data) {
        console.info('Change', data);
    }

    handleSubmit(data) {
        console.info('Submit', data);
    }

    render() {
        return (
            <div>
                <h1>Simple example</h1>
                <Form data={mock} onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <div>
                        <label>Title</label>
                        <Text name="title"/>
                    </div>
                    <div>
                        <label>Text</label>
                        <TextArea name="description"/>
                    </div>
                    <div>
                        <label>Category</label>
                        <Select name="category">
                            <option value="news">News</option>
                            <option value="sport">Sport</option>
                        </Select>
                    </div>
                    <div>
                        <label>Category</label>
                        <Select name="subcategory" multiple={true}>
                            <option value="news">News</option>
                            <option value="sport">Sport</option>
                            <option value="technology">Technology</option>
                            <option value="entertainment">Entertainment</option>
                        </Select>
                    </div>
                    <div>
                        <label>Publish</label>
                        <Checkbox name="publish"/> publish this post
                    </div>
                    <div>
                        <label>Public</label>
                        <RadioGroup name="public">
                            {Radio => (
                                <div>
                                    <Radio value="public"/> public
                                    <Radio value="private"/> private
                                </div>
                            )}
                        </RadioGroup>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </div>
        );
    }
}
