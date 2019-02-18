# Changelog

## 4.0.0

- Update focus-trap (via focus-trap-react), which now includes better handling for nested focus traps (including nested modals).
- Fix bug causing underlay click not to exit when clicked if `scrollDisabled` is set to `false`.
- Allow `escapeExits` prop to be toggled while the component is mounted (i.e. without unmounting & remounting).

## 3.1.0

- `onExit` now receives the event that triggered it as its only argument, should you need to stop the event's propagation or treat it differently.

## 3.0.1

- Fix bug causing click on the scrollbar (visible because the modal vertically overflows the viewport) to close the modal.

## 3.0.0

- Update focus-trap (via focus-trap-react), which includes a couple of behavior changes. **Probably this should not change behavior for your use case.** The key change is that focus management has been adjusted so that you can include tricky focusable elements like radio groups, iframes, and shadow DOM components within your modal — as long as the first and last focusable elements in the modal can still be detected by [Tabbable](https://github.com/davidtheclark/tabbable).
  - An effect of this change is that positive tabindexes within the modal *might* no longer work as expected. You should avoid positive tabindexes.

## 2.12.3

- Use `onMouseDown` instead of `onClick` to detect a tap on the underlay, which by default closes the modal. This fixes a bug where the modal would close if you click inside it then drag outside before releasing the mouse key.

## 2.12.2

- Fix bug causing Escape to break the focus trap, without closing the modal, when you use `escapeExits={false}`.

## 2.12.1

- Fix bug that was blocking changes to the `scrollDisabled` prop *while the modal is open*.

## 2.12.0

- Add `focusTrapOptions` prop to pass options to the focus trap.

## 2.11.1

- Update `focus-trap-react` and `react-displace` to allow React 16 installation.

## 2.11.0

- Add `scrollDisabled` prop (default `true`), for edge cases when the document's scroll should not be disabled.

## 2.10.0

- Add support for React 16.

## 2.9.0

- Add `underlayProps` prop to pass additional attributes to the underlay container.

## 2.8.0

- [Non-breaking change] `onExit` is now optional. If omitted, clicking outside the modal or hitting escape will not attempt to call `onExit`.

## 2.7.2

- [Fix] `focusDialog` will work even if you provide a non-default `dialogId`.

## 2.7.1

- [Fix] Prevent `props.onExit` from being called twice when modal includes exit buttons.

## 2.7.0

- Add `focusTrapPaused` prop.
- Fix `renderTo` displacement when rendering to a specified element.
- Resolve React 15.6.1 warnings.

## 2.6.0

- Add `includeDefaultStyles` prop.
- Add `dialogStyle` props.

## 2.5.2

- Fix `main` path in `package.json`.

## 2.5.1

- Introduce `dist/react-aria-modal.js`, where `src/` now compiles to, since React 15.5+ demands `class`es, so Babel-compilation.
  Which is actually a huge overhaul, though in semver it's just a patch.

## 2.5.0

- Add `renderTo` static method.
- Add `underlayStyle` prop.

## 2.4.0

- Add `getApplicationNode` prop.
- Upgrade `no-scroll` and `focus-trap-react` dependencies.

## 2.3.1

- Allow React 15 as peer dependency.

## 2.3.0

- Upgrade `focus-trap-react` to add `escapeExits` prop.

## 2.2.3

- Add forsaken `bind()`.

## 2.2.2

- Move `react` to `peerDependencies`; remove `react-dom` as dependency.

## 2.2.1

- Fix `this` bug.

## 2.2.0

- Add `applicationNode` prop.

## 2.1.0

- Allow React element `context` to be passed to modal contents (via upgrade of `react-displace`).

## 2.0.2

- Upgrade `react-displace`.

## 2.0.1

- Change vertical centering method to avoid occasional blurriness caused by translate.

## 2.0.0

- Upgrade to react 0.14 and its companion react-dom.
- Upgrade react-displace and focus-trap-react to their React 0.14 versions.

## 1.1.0

- Add `dialogId` and `dialogClass` props.

## 1.0.4

- Add `max-width: 100%` to dialog element.

## 1.0.3

- Move `noScroll.off()` to `componentWillUnmount()`.

## 1.0.2

- `focusDialog` does not put dialog in tab order.
- Fix typo in error message.

## 1.0.1

- Upgrade `no-scroll`.

## 1.0.0

- Add `onEnter` prop.
- Change `active` prop to `mounted`.
- Use `react-displace`.

## 0.1.1

- Fix `cursor: pointer;` bug.

## 0.1.0

- Initial release.
