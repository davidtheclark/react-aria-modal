# Changelog

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
