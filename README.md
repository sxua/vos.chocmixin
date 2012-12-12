# Validate On Save

## What it does?

* Replaces `Cmd+S` binding from `File/Save` to `File/Validate On Save`.
* Validates current document with external validators:
  * `JSLint` for JavaScript
  * ...
* Shows notification (Notification Center for OS X 10.8 or Chocolat Alert for older OS X versions):
  * successful: `Syntax OK`
  * error: `Syntax Error on line: N`
* Actually saves a document :shipit:

## How to install?

```
mkdir -p ~/.chocolat/mixins
git clone git://github.com/sxua/vos.chocmixin.git ~/.chocolat/mixins
```

## TODO

* More validators
* Preferences pane
* Maybe Growl support
* Ask Chocolat developers to add `Go to line` method into Mixin API

## Credits

This is a reimplementation of [@sxtxixtxcxh's](https://github.com/sxtxixtxcxh) [validate-on-save bundle for TextMate](https://github.com/sxtxixtxcxh/validate-on-save.tmbundle).