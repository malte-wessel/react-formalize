react-formalize
=========================

[![npm](https://img.shields.io/badge/npm-react--formalize-brightgreen.svg?style=flat-square)]()
[![npm version](https://img.shields.io/npm/v/react-formalize.svg?style=flat-square)](https://www.npmjs.com/package/react-formalize)
[![npm downloads](https://img.shields.io/npm/dm/react-formalize.svg?style=flat-square)](https://www.npmjs.com/package/react-formalize)

* serialize forms with react
* pass defaults to form or input
* easy two-way data binding
* validation messages
* works great with flux, redux and friends
* fully customizable

### Demos
* **[Simple example](http://malte-wessel.github.io/react-formalize/simple.html)**
* **[Bootstrap integration](http://malte-wessel.github.io/react-formalize/bootstrap.html)**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [API](#api)
- [Examples](#examples)
- [License](#license)

## Installation
```bash
npm install react-formalize --save
```

## Usage
```javascript
import { Component } from 'react';
import { Form, Text, Select } from 'react-formalize';

export default class MyForm extends Component {

    handleSubmit(values) {
        console.info('Submit', values);
        // {
        //    title: 'Lorem ipsum dolor ist',
        //    category: 'news'
        // };
    }

    render() {
        const post = {
            title: 'Lorem ipsum dolor ist',
            category: 'news'
        };

        return (
            <Form
                values={post}               
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}>
                <div>
                    <label>Title</label>
                    <Text
                        name="title"
                        placeholder="Enter title"/>
                </div>
                <div>
                    <label>Category</label>
                    <Select
                        name="category"   
                        placeholder="Choose category..."
                        options={{news: 'News', sport: 'Sport'}}/>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </Form>
        );
    }
}
```

## API

### Primitives

#### `<Form>`

Form component, manages data and events

##### Props

* `view`: *(Function)* the element your content will be rendered in
* `children`: *(Component|Function)* children components
* `values`: *(Object)* the form's initial values
* `messages`: *(Object)* validation messages by input names
* `onSubmit`: *(Function)* submit handler
* `onChange`: *(Function)* change handler
* `disabled`: *(Boolean)* disable form and it inputs

**[Form component source](https://github.com/malte-wessel/react-formalize/blob/master/src/components/Form.js)**

##### Example
```javascript
<Form
    onSubmit={this.onSubmit}
    onChange={this.onChange}
    values={post}
    messages={messages}
    disabled={saving}>
    {/* Input components ... */}
</Form>
```

#### `<Input>`

Input component wrapper, connects to `Form` component, receives and propagates data, **do not use directly**.

##### Props

* `name`: *(String)* name of the input field
* `value`: *(Array|Boolean|Number|Object|String)* value of the input field
* `serialize`: *(Function)* function that extracts the input's data from the change event
* `children`: *(Component)* children components

**[Input component source](https://github.com/malte-wessel/react-formalize/blob/master/src/components/Form.js)**

##### Example
```javascript
import React, { PropTypes, Component } from 'react';
import { Input } from 'react-formalize';

export default class MyCustomTextField extends Component {

    renderInput(props) {
        return ;
    }

    render() {
        return (
            <Input {...this.props}>
                {props => <input type="text" {...props}/>}
            </Input>
        );
    }
}

```

#### `<Message>`

Message component, connects to `Form` component, receives messages

##### Props

* `name`: *(String)* name of the related input field
* `renderMessage`: *(Function)* render a custom message
* `children`: *(Function)* children components

**[Message component source](https://github.com/malte-wessel/react-formalize/blob/master/src/components/Form.js)**

##### Example
```javascript
<Form>
    <Text name="title"/>
    <Message name="title">{message => <p>{message}</p>}</Message>
</Form>
```

### Build in input components


#### `<Text>`

Native text input component

##### Props

* `name`: *(String)* name of the input field
* `type`: *(String)* One of: `text`, `date`, `datetime`, `datetime-local`, `email`, `month`, `number`, `password`, `tel`, `time`, `search`, `url`, `week`. Default is text

**[Text component source](https://github.com/malte-wessel/react-formalize/blob/master/src/components/inputs/Text.js)**

##### Example
```javascript
<Form>
    <Input name="title"/>
    <button type="submit">Submit</button>
</Form>
```

* Text ([Source](https://github.com/malte-wessel/react-formalize/blob/master/src/components/inputs/Text.js))
* TextArea ([Source](https://github.com/malte-wessel/react-formalize/blob/master/src/components/inputs/TextArea.js))
* Checkbox ([Source](https://github.com/malte-wessel/react-formalize/blob/master/src/components/inputs/Checkbox.js))
* RadioGroup ([Source](https://github.com/malte-wessel/react-formalize/blob/master/src/components/inputs/RadioGroup.js))
* Select ([Source](https://github.com/malte-wessel/react-formalize/blob/master/src/components/inputs/Select.js))

## Examples

Run the simple example:
```bash
cd react-formalize
npm install
cd react-formalize/examples/simple
npm install
npm start
```

## License

MIT
