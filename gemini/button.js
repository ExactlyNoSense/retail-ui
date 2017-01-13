/* global gemini */
var pathTo = require('./utils').pathTo;

gemini.suite('button', (suite) => {
  suite.setUrl(pathTo('Button', 'playground')).
    setCaptureElements('#test-element').
    capture('idle').
    capture('pressed', (actions, find) => {
      actions.mouseDown(find('button'));
    }).
    capture('clicked', (actions, find) => {
      actions.mouseUp(find('button'));
    }).
    capture('hover', (actions, find) => {
      actions.mouseMove(find('button'));
    });
});
