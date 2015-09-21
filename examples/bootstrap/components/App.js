import React, { Component } from 'react';

import { Text, Select, TextArea } from 'react-formalize';

import Form from './bootstrap/Form';
import FormGroup from './bootstrap/FormGroup';
import Checkbox from './bootstrap/Checkbox';
import RadioGroup from './bootstrap/RadioGroup';

export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            saving: false,
            post: {
                categories: ['articles', 'react']
            }
        };
    }

    validate(values) {
        const { title, categories, text } = values;
        const errors = {};
        if (!title) errors.title = 'Title is required';
        if (categories.length < 1) errors.categories = 'Please select at least one category';
        if (!text) errors.text = 'Text is required';

        if (Object.keys(errors).length > 0) {
            return errors;
        }
        return undefined;
    }

    onSubmit(post) {
        const messages = this.validate(post);
        let saving = false;
        if (!messages) {
            saving = true;
            setTimeout(() => this.setState({ saving: false}), 2000);
        }
        this.setState({ messages, post, saving });
    }

    render() {
        const { post, messages, saving } = this.state;
        const categories = {
            articles: 'Articles',
            react: 'React',
            reactNative: 'React Native',
            flux: 'Flux',
            bootstrap: 'Bootstrap'
        };
        const ads = {
            no: 'Don\'t show ads',
            yes: 'Shou ads'
        };
        return (
            <div className="container" style={{padding: '50px 0'}}>
                <div className="row">
                    <div className="col-sm-offset-2 col-sm-10">
                        <div className="page-header">
                            <h1>Bootstrap Form Example</h1>
                        </div>
                        <Form
                            onSubmit={this.onSubmit.bind(this)}
                            values={post}
                            messages={messages}
                            disabled={saving}>
                            <FormGroup name="title" label="Title">
                                <Text name="title" className="form-control"/>
                            </FormGroup>
                            <FormGroup name="categories" label="Categories">
                                <Select name="categories" multiple options={categories} className="form-control"/>
                            </FormGroup>
                            <FormGroup name="text" label="Text">
                                <TextArea name="text" rows="5" className="form-control"/>
                            </FormGroup>
                            <FormGroup name="publish" label="Publish">
                                <Checkbox name="publish" label="Publish post"/>
                            </FormGroup>
                            <FormGroup name="ads" label="Advertisment">
                                <RadioGroup name="ads" options={ads}/>
                            </FormGroup>
                            <FormGroup>
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving
                                        ? <span><i className="fa fa-circle-o-notch fa-spin"></i>{' '}</span>
                                        : null
                                    }
                                    Save post
                                </button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
