import expect from 'expect';
window.expect = expect;

var context = require.context('./test', true, /.*\.js$/);
context.keys().forEach(context);
