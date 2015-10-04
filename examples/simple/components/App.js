import React, { createClass } from 'react';
import {
    Form,
    Text,
    TextArea,
    Checkbox,
    RadioGroup,
    Select } from 'react-formalize';

const defaultValues = {
    title: 'Hello World'
};

export default createClass({

    displayName: 'App',

    handleChange(values) {
        console.info('Change', values);
    },

    handleSubmit(values) {
        console.info('Submit', values);
    },

    render() {
        return (
            <div>
                <h1>Simple example</h1>
                <Form values={defaultValues} onSubmit={this.handleSubmit} onChange={this.handleChange}>
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
                        <Select name="category" placeholder="Choose category..." options={{news: 'News', sport: 'Sport'}}/>
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
});
