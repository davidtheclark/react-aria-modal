# react-aria-modal

A fully flexible and accessible React modal built according WAI-ARIA Authoring Practices.

This module is built on top of some vanilla JS modules that could be used by non-React libraries:
- [focus-trap](https://github.com/davidtheclark/focus-trap)
- [no-scroll](https://github.com/davidtheclark/no-scroll)

It doesn't directly depend on focus-trap, but uses [focus-trap-react](https://github.com/davidtheclark/focus-trap-react),
a wrapper which could be used by other React libraries.

*This module provides minimal inline styles to get the thing working. It does not provide "complete" modal styling.* You will get to (have to) style the dialog yourself.

## Installation

```
npm install react-aria-modal
```

## Usage

Look in `demo/js/` for more examples. Here's a simple one.

Just provide the right props (see below) and pass the content of the modal as this component's child.

```js
var AriaModal = require('react-aria-modal');

var DemoOne = React.createClass({
  getInitialState: function() {
    return { modalActive: false };
  },

  activateModal: function() {
    this.setState({ modalActive: true });
  },

  deactivateModal: function() {
    this.setState({ modalActive: false });
  },

  render: function() {
    return (
      <div>
        <button onClick={this.activateModal}>
          activate modal
        </button>
        <AriaModal
          active={this.state.modalActive}
          titleText='demo one'
          onExit={this.deactivateModal}
          initialFocus='#demo-one-deactivate'
        >
          <div className='modal-dialog'>
            <p>
              Here is a modal.
            </p>
            <p>
              <button
                id='demo-one-deactivate'
                onClick={this.deactivateModal}
              >
                deactivate modal
              </button>
            </p>
          </div>
        </AriaModal>
      </div>
    )
  },
});
```

## Details

The modal can be activate in a couple of ways:
- mounting the component *without* an `active` prop
- passing `true` as the `active` prop

Similarly, the modal can be deactivated in a couple of ways:
- unmounting the component
- passing `false` as the `active` prop

Pass your dialog element as the child.

When the modal is active, you'll notice the following:
- Focus is trapped: only elements within the modal will receive focus as you tab through. This is done by [focus-trap](https://github.com/davidtheclark/focus-trap), via [focus-trap-react](https://github.com/davidtheclark/focus-trap-react).
- The modal has the ARIA attributes it needs: a `role` of `dialog` (or `alertdialog`) and a `aria-label` or `aria-labelledby` attribute.
- The modal is appended to `document.body`, not inserted directly into the HTML source order, as you might assume; but it should still update correctly.
- Your content is set atop a fixed-position underlay. You can control the appearance and behavior of this underlay in various ways (see below).
- Your content is horizontally centered. You can also vertically center it, if you wish.
- The main document's scroll is frozen (except on touchscreens). This is done by [no-scroll](https://github.com/davidtheclark/no-scroll).

## Props

### onExit

Type: `Function`, required

This function needs to handles the state change of *exiting* (or deactivating) the modal. Maybe it's just a wrapper around `setState()`; or maybe you use some more involved Flux-inspired state management — whatever the case, this module leaves the state management up to *you* instead of making assumptions.

### alert

Type: `Boolean`

If `true`, the modal will receive a `role` of `alertdialog`, instead of its default `dialog`.

### initialFocus

Type: `String`

By default, *when the modal activates its first focusable child will receive focus*. If, instead, you want to specify which element should receive initial focus, pass a *selector string* to this prop. (That selector is passed to `document.querySelector()` to find the DOM node.)

### titleId

Type: `String`

The id of the element that should be used as the modal's accessible title. This value is passed to the modal's `aria-labelledby` attribute.

You must use either `titleId` or `titleText`, but not both.

### titleText

Type: `String`

A string to use as the modal's accessible title. This value is passed to the modal's `aria-label` attribute.

You must use either `titleId` or `titleText`, but not both.

### underlayClass

Type: `String`

Apply a class to the underlay in order to custom-style it.

Various inline styles will be applied, though, so be aware of what might be difficult to override. If, for example, you want to change the underlay's color, you should probably use the `underlayColor` prop instead of a class.

### underlayColor

Type: `String` (color value), Default: `rgba(0,0,0,0.5)`

If you want to change about the underlay's color, you can do that with this prop.

### underlayClickExits

Type: `Boolean`, Default `true`

By default, a click on the underlay will exit the modal. Pass `false`, and clicking on the underlay will do nothing.

### verticallyCenter

Type: `Boolean`

If `true`, the modal's contents will be vertically (as well as horizontally) centered.

## More examples

An alert dialog that itself receives initial focus (but has no visible outline) and does not exit when the underlay is clicked, and is vertically centered:

```js
var AriaModal = require('react-aria-modal');

var MyModal = React.createClass({
  ..
  render: function() {
    return (
      <AriaModal
        onExit={this.myExitHandler}
        alert={true}
        titleId='modal-title'
        underlayClickExists={false}
        verticallyCenter={true}
      >
        <div
          tabIndex='0'
          style={{ outline: 0 }}
          className='my-modal-dialog'
        >
          <h2 id='modal-title'>Alert!</h2>
          ..
        </div>
      </AriaModal>
    )
  }
})
```
