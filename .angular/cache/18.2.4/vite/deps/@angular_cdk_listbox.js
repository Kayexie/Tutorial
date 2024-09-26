import {
  A,
  ActiveDescendantKeyManager,
  DOWN_ARROW,
  Directionality,
  END,
  ENTER,
  HOME,
  LEFT_ARROW,
  Platform,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW,
  coerceArray,
  hasModifierKey
} from "./chunk-XLLPJRZM.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-T2VU3WG2.js";
import "./chunk-GJS5VH6J.js";
import {
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Output,
  booleanAttribute,
  forwardRef,
  inject,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵqueryRefresh
} from "./chunk-XXUFWVR4.js";
import {
  Subject,
  defer,
  filter,
  fromEvent,
  map,
  merge,
  startWith,
  switchMap,
  takeUntil
} from "./chunk-2CVCC5YH.js";

// node_modules/@angular/cdk/fesm2022/collections.mjs
var _ViewRepeaterOperation;
(function(_ViewRepeaterOperation2) {
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["REPLACED"] = 0] = "REPLACED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["INSERTED"] = 1] = "INSERTED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["MOVED"] = 2] = "MOVED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["REMOVED"] = 3] = "REMOVED";
})(_ViewRepeaterOperation || (_ViewRepeaterOperation = {}));
var _VIEW_REPEATER_STRATEGY = new InjectionToken("_ViewRepeater");
var SelectionModel = class {
  /** Selected values. */
  get selected() {
    if (!this._selected) {
      this._selected = Array.from(this._selection.values());
    }
    return this._selected;
  }
  constructor(_multiple = false, initiallySelectedValues, _emitChanges = true, compareWith) {
    this._multiple = _multiple;
    this._emitChanges = _emitChanges;
    this.compareWith = compareWith;
    this._selection = /* @__PURE__ */ new Set();
    this._deselectedToEmit = [];
    this._selectedToEmit = [];
    this.changed = new Subject();
    if (initiallySelectedValues && initiallySelectedValues.length) {
      if (_multiple) {
        initiallySelectedValues.forEach((value) => this._markSelected(value));
      } else {
        this._markSelected(initiallySelectedValues[0]);
      }
      this._selectedToEmit.length = 0;
    }
  }
  /**
   * Selects a value or an array of values.
   * @param values The values to select
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  select(...values) {
    this._verifyValueAssignment(values);
    values.forEach((value) => this._markSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  /**
   * Deselects a value or an array of values.
   * @param values The values to deselect
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  deselect(...values) {
    this._verifyValueAssignment(values);
    values.forEach((value) => this._unmarkSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  /**
   * Sets the selected values
   * @param values The new selected values
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  setSelection(...values) {
    this._verifyValueAssignment(values);
    const oldValues = this.selected;
    const newSelectedSet = new Set(values);
    values.forEach((value) => this._markSelected(value));
    oldValues.filter((value) => !newSelectedSet.has(this._getConcreteValue(value, newSelectedSet))).forEach((value) => this._unmarkSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  /**
   * Toggles a value between selected and deselected.
   * @param value The value to toggle
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  toggle(value) {
    return this.isSelected(value) ? this.deselect(value) : this.select(value);
  }
  /**
   * Clears all of the selected values.
   * @param flushEvent Whether to flush the changes in an event.
   *   If false, the changes to the selection will be flushed along with the next event.
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  clear(flushEvent = true) {
    this._unmarkAll();
    const changed = this._hasQueuedChanges();
    if (flushEvent) {
      this._emitChangeEvent();
    }
    return changed;
  }
  /**
   * Determines whether a value is selected.
   */
  isSelected(value) {
    return this._selection.has(this._getConcreteValue(value));
  }
  /**
   * Determines whether the model does not have a value.
   */
  isEmpty() {
    return this._selection.size === 0;
  }
  /**
   * Determines whether the model has a value.
   */
  hasValue() {
    return !this.isEmpty();
  }
  /**
   * Sorts the selected values based on a predicate function.
   */
  sort(predicate) {
    if (this._multiple && this.selected) {
      this._selected.sort(predicate);
    }
  }
  /**
   * Gets whether multiple values can be selected.
   */
  isMultipleSelection() {
    return this._multiple;
  }
  /** Emits a change event and clears the records of selected and deselected values. */
  _emitChangeEvent() {
    this._selected = null;
    if (this._selectedToEmit.length || this._deselectedToEmit.length) {
      this.changed.next({
        source: this,
        added: this._selectedToEmit,
        removed: this._deselectedToEmit
      });
      this._deselectedToEmit = [];
      this._selectedToEmit = [];
    }
  }
  /** Selects a value. */
  _markSelected(value) {
    value = this._getConcreteValue(value);
    if (!this.isSelected(value)) {
      if (!this._multiple) {
        this._unmarkAll();
      }
      if (!this.isSelected(value)) {
        this._selection.add(value);
      }
      if (this._emitChanges) {
        this._selectedToEmit.push(value);
      }
    }
  }
  /** Deselects a value. */
  _unmarkSelected(value) {
    value = this._getConcreteValue(value);
    if (this.isSelected(value)) {
      this._selection.delete(value);
      if (this._emitChanges) {
        this._deselectedToEmit.push(value);
      }
    }
  }
  /** Clears out the selected values. */
  _unmarkAll() {
    if (!this.isEmpty()) {
      this._selection.forEach((value) => this._unmarkSelected(value));
    }
  }
  /**
   * Verifies the value assignment and throws an error if the specified value array is
   * including multiple values while the selection model is not supporting multiple values.
   */
  _verifyValueAssignment(values) {
    if (values.length > 1 && !this._multiple && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMultipleValuesInSingleSelectionError();
    }
  }
  /** Whether there are queued up change to be emitted. */
  _hasQueuedChanges() {
    return !!(this._deselectedToEmit.length || this._selectedToEmit.length);
  }
  /** Returns a value that is comparable to inputValue by applying compareWith function, returns the same inputValue otherwise. */
  _getConcreteValue(inputValue, selection) {
    if (!this.compareWith) {
      return inputValue;
    } else {
      selection = selection ?? this._selection;
      for (let selectedValue of selection) {
        if (this.compareWith(inputValue, selectedValue)) {
          return selectedValue;
        }
      }
      return inputValue;
    }
  }
};
function getMultipleValuesInSingleSelectionError() {
  return Error("Cannot pass multiple values into SelectionModel with single-value mode.");
}
var _UniqueSelectionDispatcher = class _UniqueSelectionDispatcher {
  constructor() {
    this._listeners = [];
  }
  /**
   * Notify other items that selection for the given name has been set.
   * @param id ID of the item.
   * @param name Name of the item.
   */
  notify(id, name) {
    for (let listener of this._listeners) {
      listener(id, name);
    }
  }
  /**
   * Listen for future changes to item selection.
   * @return Function used to deregister listener
   */
  listen(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((registered) => {
        return listener !== registered;
      });
    };
  }
  ngOnDestroy() {
    this._listeners = [];
  }
};
_UniqueSelectionDispatcher.ɵfac = function UniqueSelectionDispatcher_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UniqueSelectionDispatcher)();
};
_UniqueSelectionDispatcher.ɵprov = ɵɵdefineInjectable({
  token: _UniqueSelectionDispatcher,
  factory: _UniqueSelectionDispatcher.ɵfac,
  providedIn: "root"
});
var UniqueSelectionDispatcher = _UniqueSelectionDispatcher;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UniqueSelectionDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/listbox.mjs
var nextId = 0;
var ListboxSelectionModel = class extends SelectionModel {
  constructor(multiple = false, initiallySelectedValues, emitChanges = true, compareWith) {
    super(true, initiallySelectedValues, emitChanges, compareWith);
    this.multiple = multiple;
  }
  isMultipleSelection() {
    return this.multiple;
  }
  select(...values) {
    if (this.multiple) {
      return super.select(...values);
    } else {
      return super.setSelection(...values);
    }
  }
};
var _CdkOption = class _CdkOption {
  constructor() {
    this._generatedId = `cdk-option-${nextId++}`;
    this._disabled = false;
    this.element = inject(ElementRef).nativeElement;
    this.listbox = inject(CdkListbox);
    this.destroyed = new Subject();
    this._clicked = new Subject();
  }
  /** The id of the option's host element. */
  get id() {
    return this._id || this._generatedId;
  }
  set id(value) {
    this._id = value;
  }
  /** Whether this option is disabled. */
  get disabled() {
    return this.listbox.disabled || this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  /** The tabindex of the option when it is enabled. */
  get enabledTabIndex() {
    return this._enabledTabIndex === void 0 ? this.listbox.enabledTabIndex : this._enabledTabIndex;
  }
  set enabledTabIndex(value) {
    this._enabledTabIndex = value;
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  /** Whether this option is selected. */
  isSelected() {
    return this.listbox.isSelected(this);
  }
  /** Whether this option is active. */
  isActive() {
    return this.listbox.isActive(this);
  }
  /** Toggle the selected state of this option. */
  toggle() {
    this.listbox.toggle(this);
  }
  /** Select this option if it is not selected. */
  select() {
    this.listbox.select(this);
  }
  /** Deselect this option if it is selected. */
  deselect() {
    this.listbox.deselect(this);
  }
  /** Focus this option. */
  focus() {
    this.element.focus();
  }
  /** Get the label for this element which is required by the FocusableOption interface. */
  getLabel() {
    return (this.typeaheadLabel ?? this.element.textContent?.trim()) || "";
  }
  /**
   * No-op implemented as a part of `Highlightable`.
   * @docs-private
   */
  setActiveStyles() {
  }
  /**
   * No-op implemented as a part of `Highlightable`.
   * @docs-private
   */
  setInactiveStyles() {
  }
  /** Handle focus events on the option. */
  _handleFocus() {
    if (this.listbox.useActiveDescendant) {
      this.listbox._setActiveOption(this);
      this.listbox.focus();
    }
  }
  /** Get the tabindex for this option. */
  _getTabIndex() {
    if (this.listbox.useActiveDescendant || this.disabled) {
      return -1;
    }
    return this.isActive() ? this.enabledTabIndex : -1;
  }
};
_CdkOption.ɵfac = function CdkOption_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CdkOption)();
};
_CdkOption.ɵdir = ɵɵdefineDirective({
  type: _CdkOption,
  selectors: [["", "cdkOption", ""]],
  hostAttrs: ["role", "option", 1, "cdk-option"],
  hostVars: 6,
  hostBindings: function CdkOption_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function CdkOption_click_HostBindingHandler($event) {
        return ctx._clicked.next($event);
      })("focus", function CdkOption_focus_HostBindingHandler() {
        return ctx._handleFocus();
      });
    }
    if (rf & 2) {
      ɵɵhostProperty("id", ctx.id);
      ɵɵattribute("aria-selected", ctx.isSelected())("tabindex", ctx._getTabIndex())("aria-disabled", ctx.disabled);
      ɵɵclassProp("cdk-option-active", ctx.isActive());
    }
  },
  inputs: {
    id: "id",
    value: [0, "cdkOption", "value"],
    typeaheadLabel: [0, "cdkOptionTypeaheadLabel", "typeaheadLabel"],
    disabled: [2, "cdkOptionDisabled", "disabled", booleanAttribute],
    enabledTabIndex: [0, "tabindex", "enabledTabIndex"]
  },
  exportAs: ["cdkOption"],
  standalone: true,
  features: [ɵɵInputTransformsFeature]
});
var CdkOption = _CdkOption;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkOption, [{
    type: Directive,
    args: [{
      selector: "[cdkOption]",
      standalone: true,
      exportAs: "cdkOption",
      host: {
        "role": "option",
        "class": "cdk-option",
        "[id]": "id",
        "[attr.aria-selected]": "isSelected()",
        "[attr.tabindex]": "_getTabIndex()",
        "[attr.aria-disabled]": "disabled",
        "[class.cdk-option-active]": "isActive()",
        "(click)": "_clicked.next($event)",
        "(focus)": "_handleFocus()"
      }
    }]
  }], null, {
    id: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: ["cdkOption"]
    }],
    typeaheadLabel: [{
      type: Input,
      args: ["cdkOptionTypeaheadLabel"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkOptionDisabled",
        transform: booleanAttribute
      }]
    }],
    enabledTabIndex: [{
      type: Input,
      args: ["tabindex"]
    }]
  });
})();
var _CdkListbox = class _CdkListbox {
  /** The id of the option's host element. */
  get id() {
    return this._id || this._generatedId;
  }
  set id(value) {
    this._id = value;
  }
  /** The tabindex to use when the listbox is enabled. */
  get enabledTabIndex() {
    return this._enabledTabIndex === void 0 ? 0 : this._enabledTabIndex;
  }
  set enabledTabIndex(value) {
    this._enabledTabIndex = value;
  }
  /** The value selected in the listbox, represented as an array of option values. */
  get value() {
    return this._invalid ? [] : this.selectionModel.selected;
  }
  set value(value) {
    this._setSelection(value);
  }
  /**
   * Whether the listbox allows multiple options to be selected. If the value switches from `true`
   * to `false`, and more than one option is selected, all options are deselected.
   */
  get multiple() {
    return this.selectionModel.multiple;
  }
  set multiple(value) {
    this.selectionModel.multiple = value;
    if (this.options) {
      this._updateInternalValue();
    }
  }
  /** The orientation of the listbox. Only affects keyboard interaction, not visual layout. */
  get orientation() {
    return this._orientation;
  }
  set orientation(value) {
    this._orientation = value === "horizontal" ? "horizontal" : "vertical";
    if (value === "horizontal") {
      this.listKeyManager?.withHorizontalOrientation(this._dir?.value || "ltr");
    } else {
      this.listKeyManager?.withVerticalOrientation();
    }
  }
  /** The function used to compare option values. */
  get compareWith() {
    return this.selectionModel.compareWith;
  }
  set compareWith(fn) {
    this.selectionModel.compareWith = fn;
  }
  /**
   * Whether the keyboard navigation should wrap when the user presses arrow down on the last item
   * or arrow up on the first item.
   */
  get navigationWrapDisabled() {
    return this._navigationWrapDisabled;
  }
  set navigationWrapDisabled(wrap) {
    this._navigationWrapDisabled = wrap;
    this.listKeyManager?.withWrap(!this._navigationWrapDisabled);
  }
  /** Whether keyboard navigation should skip over disabled items. */
  get navigateDisabledOptions() {
    return this._navigateDisabledOptions;
  }
  set navigateDisabledOptions(skip) {
    this._navigateDisabledOptions = skip;
    this.listKeyManager?.skipPredicate(this._navigateDisabledOptions ? this._skipNonePredicate : this._skipDisabledPredicate);
  }
  constructor() {
    this._generatedId = `cdk-listbox-${nextId++}`;
    this.disabled = false;
    this.useActiveDescendant = false;
    this._orientation = "vertical";
    this._navigationWrapDisabled = false;
    this._navigateDisabledOptions = false;
    this.valueChange = new Subject();
    this.selectionModel = new ListboxSelectionModel();
    this.destroyed = new Subject();
    this.element = inject(ElementRef).nativeElement;
    this.ngZone = inject(NgZone);
    this.changeDetectorRef = inject(ChangeDetectorRef);
    this._invalid = false;
    this._lastTriggered = null;
    this._onTouched = () => {
    };
    this._onChange = () => {
    };
    this._optionClicked = defer(() => this.options.changes.pipe(startWith(this.options), switchMap((options) => merge(...options.map((option) => option._clicked.pipe(map((event) => ({
      option,
      event
    }))))))));
    this._dir = inject(Directionality, {
      optional: true
    });
    this._isBrowser = inject(Platform).isBrowser;
    this._skipDisabledPredicate = (option) => option.disabled;
    this._skipNonePredicate = () => false;
    this._hasFocus = false;
    this._previousActiveOption = null;
    if (this._isBrowser) {
      this._setPreviousActiveOptionAsActiveOptionOnWindowBlur();
    }
  }
  ngAfterContentInit() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      this._verifyNoOptionValueCollisions();
      this._verifyOptionValues();
    }
    this._initKeyManager();
    merge(this.selectionModel.changed, this.options.changes).pipe(startWith(null), takeUntil(this.destroyed)).subscribe(() => this._updateInternalValue());
    this._optionClicked.pipe(filter(({
      option
    }) => !option.disabled), takeUntil(this.destroyed)).subscribe(({
      option,
      event
    }) => this._handleOptionClicked(option, event));
  }
  ngOnDestroy() {
    this.listKeyManager?.destroy();
    this.destroyed.next();
    this.destroyed.complete();
  }
  /**
   * Toggle the selected state of the given option.
   * @param option The option to toggle
   */
  toggle(option) {
    this.toggleValue(option.value);
  }
  /**
   * Toggle the selected state of the given value.
   * @param value The value to toggle
   */
  toggleValue(value) {
    if (this._invalid) {
      this.selectionModel.clear(false);
    }
    this.selectionModel.toggle(value);
  }
  /**
   * Select the given option.
   * @param option The option to select
   */
  select(option) {
    this.selectValue(option.value);
  }
  /**
   * Select the given value.
   * @param value The value to select
   */
  selectValue(value) {
    if (this._invalid) {
      this.selectionModel.clear(false);
    }
    this.selectionModel.select(value);
  }
  /**
   * Deselect the given option.
   * @param option The option to deselect
   */
  deselect(option) {
    this.deselectValue(option.value);
  }
  /**
   * Deselect the given value.
   * @param value The value to deselect
   */
  deselectValue(value) {
    if (this._invalid) {
      this.selectionModel.clear(false);
    }
    this.selectionModel.deselect(value);
  }
  /**
   * Set the selected state of all options.
   * @param isSelected The new selected state to set
   */
  setAllSelected(isSelected) {
    if (!isSelected) {
      this.selectionModel.clear();
    } else {
      if (this._invalid) {
        this.selectionModel.clear(false);
      }
      this.selectionModel.select(...this.options.map((option) => option.value));
    }
  }
  /**
   * Get whether the given option is selected.
   * @param option The option to get the selected state of
   */
  isSelected(option) {
    return this.isValueSelected(option.value);
  }
  /**
   * Get whether the given option is active.
   * @param option The option to get the active state of
   */
  isActive(option) {
    return !!(this.listKeyManager?.activeItem === option);
  }
  /**
   * Get whether the given value is selected.
   * @param value The value to get the selected state of
   */
  isValueSelected(value) {
    if (this._invalid) {
      return false;
    }
    return this.selectionModel.isSelected(value);
  }
  /**
   * Registers a callback to be invoked when the listbox's value changes from user input.
   * @param fn The callback to register
   * @docs-private
   */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /**
   * Registers a callback to be invoked when the listbox is blurred by the user.
   * @param fn The callback to register
   * @docs-private
   */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /**
   * Sets the listbox's value.
   * @param value The new value of the listbox
   * @docs-private
   */
  writeValue(value) {
    this._setSelection(value);
    this._verifyOptionValues();
  }
  /**
   * Sets the disabled state of the listbox.
   * @param isDisabled The new disabled state
   * @docs-private
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }
  /** Focus the listbox's host element. */
  focus() {
    this.element.focus();
  }
  /**
   * Triggers the given option in response to user interaction.
   * - In single selection mode: selects the option and deselects any other selected option.
   * - In multi selection mode: toggles the selected state of the option.
   * @param option The option to trigger
   */
  triggerOption(option) {
    if (option && !option.disabled) {
      this._lastTriggered = option;
      const changed = this.multiple ? this.selectionModel.toggle(option.value) : this.selectionModel.select(option.value);
      if (changed) {
        this._onChange(this.value);
        this.valueChange.next({
          value: this.value,
          listbox: this,
          option
        });
      }
    }
  }
  /**
   * Trigger the given range of options in response to user interaction.
   * Should only be called in multi-selection mode.
   * @param trigger The option that was triggered
   * @param from The start index of the options to toggle
   * @param to The end index of the options to toggle
   * @param on Whether to toggle the option range on
   */
  triggerRange(trigger, from, to, on) {
    if (this.disabled || trigger && trigger.disabled) {
      return;
    }
    this._lastTriggered = trigger;
    const isEqual = this.compareWith ?? Object.is;
    const updateValues = [...this.options].slice(Math.max(0, Math.min(from, to)), Math.min(this.options.length, Math.max(from, to) + 1)).filter((option) => !option.disabled).map((option) => option.value);
    const selected = [...this.value];
    for (const updateValue of updateValues) {
      const selectedIndex = selected.findIndex((selectedValue) => isEqual(selectedValue, updateValue));
      if (on && selectedIndex === -1) {
        selected.push(updateValue);
      } else if (!on && selectedIndex !== -1) {
        selected.splice(selectedIndex, 1);
      }
    }
    let changed = this.selectionModel.setSelection(...selected);
    if (changed) {
      this._onChange(this.value);
      this.valueChange.next({
        value: this.value,
        listbox: this,
        option: trigger
      });
    }
  }
  /**
   * Sets the given option as active.
   * @param option The option to make active
   */
  _setActiveOption(option) {
    this.listKeyManager.setActiveItem(option);
  }
  /** Called when the listbox receives focus. */
  _handleFocus() {
    if (!this.useActiveDescendant) {
      if (this.selectionModel.selected.length > 0) {
        this._setNextFocusToSelectedOption();
      } else {
        this.listKeyManager.setNextItemActive();
      }
      this._focusActiveOption();
    }
  }
  /** Called when the user presses keydown on the listbox. */
  _handleKeydown(event) {
    if (this.disabled) {
      return;
    }
    const {
      keyCode
    } = event;
    const previousActiveIndex = this.listKeyManager.activeItemIndex;
    const ctrlKeys = ["ctrlKey", "metaKey"];
    if (this.multiple && keyCode === A && hasModifierKey(event, ...ctrlKeys)) {
      this.triggerRange(null, 0, this.options.length - 1, this.options.length !== this.value.length);
      event.preventDefault();
      return;
    }
    if (this.multiple && (keyCode === SPACE || keyCode === ENTER) && hasModifierKey(event, "shiftKey")) {
      if (this.listKeyManager.activeItem && this.listKeyManager.activeItemIndex != null) {
        this.triggerRange(this.listKeyManager.activeItem, this._getLastTriggeredIndex() ?? this.listKeyManager.activeItemIndex, this.listKeyManager.activeItemIndex, !this.listKeyManager.activeItem.isSelected());
      }
      event.preventDefault();
      return;
    }
    if (this.multiple && keyCode === HOME && hasModifierKey(event, ...ctrlKeys) && hasModifierKey(event, "shiftKey")) {
      const trigger = this.listKeyManager.activeItem;
      if (trigger) {
        const from = this.listKeyManager.activeItemIndex;
        this.listKeyManager.setFirstItemActive();
        this.triggerRange(trigger, from, this.listKeyManager.activeItemIndex, !trigger.isSelected());
      }
      event.preventDefault();
      return;
    }
    if (this.multiple && keyCode === END && hasModifierKey(event, ...ctrlKeys) && hasModifierKey(event, "shiftKey")) {
      const trigger = this.listKeyManager.activeItem;
      if (trigger) {
        const from = this.listKeyManager.activeItemIndex;
        this.listKeyManager.setLastItemActive();
        this.triggerRange(trigger, from, this.listKeyManager.activeItemIndex, !trigger.isSelected());
      }
      event.preventDefault();
      return;
    }
    if (keyCode === SPACE || keyCode === ENTER) {
      this.triggerOption(this.listKeyManager.activeItem);
      event.preventDefault();
      return;
    }
    const isNavKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === HOME || keyCode === END;
    this.listKeyManager.onKeydown(event);
    if (isNavKey && event.shiftKey && previousActiveIndex !== this.listKeyManager.activeItemIndex) {
      this.triggerOption(this.listKeyManager.activeItem);
    }
  }
  /** Called when a focus moves into the listbox. */
  _handleFocusIn() {
    this._hasFocus = true;
  }
  /**
   * Called when the focus leaves an element in the listbox.
   * @param event The focusout event
   */
  _handleFocusOut(event) {
    this._previousActiveOption = this.listKeyManager.activeItem;
    const otherElement = event.relatedTarget;
    if (this.element !== otherElement && !this.element.contains(otherElement)) {
      this._onTouched();
      this._hasFocus = false;
      this._setNextFocusToSelectedOption();
    }
  }
  /** Get the id of the active option if active descendant is being used. */
  _getAriaActiveDescendant() {
    return this.useActiveDescendant ? this.listKeyManager?.activeItem?.id : null;
  }
  /** Get the tabindex for the listbox. */
  _getTabIndex() {
    if (this.disabled) {
      return -1;
    }
    return this.useActiveDescendant || !this.listKeyManager.activeItem ? this.enabledTabIndex : -1;
  }
  /** Initialize the key manager. */
  _initKeyManager() {
    this.listKeyManager = new ActiveDescendantKeyManager(this.options).withWrap(!this._navigationWrapDisabled).withTypeAhead().withHomeAndEnd().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._navigateDisabledOptions ? this._skipNonePredicate : this._skipDisabledPredicate);
    if (this.orientation === "vertical") {
      this.listKeyManager.withVerticalOrientation();
    } else {
      this.listKeyManager.withHorizontalOrientation(this._dir?.value || "ltr");
    }
    if (this.selectionModel.selected.length) {
      Promise.resolve().then(() => this._setNextFocusToSelectedOption());
    }
    this.listKeyManager.change.subscribe(() => this._focusActiveOption());
    this.options.changes.pipe(takeUntil(this.destroyed)).subscribe(() => {
      const activeOption = this.listKeyManager.activeItem;
      if (activeOption && !this.options.find((option) => option === activeOption)) {
        this.listKeyManager.setActiveItem(-1);
        this.changeDetectorRef.markForCheck();
      }
    });
  }
  /** Focus the active option. */
  _focusActiveOption() {
    if (!this.useActiveDescendant) {
      this.listKeyManager.activeItem?.focus();
    }
    this.changeDetectorRef.markForCheck();
  }
  /**
   * Set the selected values.
   * @param value The list of new selected values.
   */
  _setSelection(value) {
    if (this._invalid) {
      this.selectionModel.clear(false);
    }
    this.selectionModel.setSelection(...this._coerceValue(value));
    if (!this._hasFocus) {
      this._setNextFocusToSelectedOption();
    }
  }
  /** Sets the first selected option as first in the keyboard focus order. */
  _setNextFocusToSelectedOption() {
    const selected = this.options?.find((option) => option.isSelected());
    if (selected) {
      this.listKeyManager.updateActiveItem(selected);
    }
  }
  /** Update the internal value of the listbox based on the selection model. */
  _updateInternalValue() {
    const indexCache = /* @__PURE__ */ new Map();
    this.selectionModel.sort((a, b) => {
      const aIndex = this._getIndexForValue(indexCache, a);
      const bIndex = this._getIndexForValue(indexCache, b);
      return aIndex - bIndex;
    });
    const selected = this.selectionModel.selected;
    this._invalid = !this.multiple && selected.length > 1 || !!this._getInvalidOptionValues(selected).length;
    this.changeDetectorRef.markForCheck();
  }
  /**
   * Gets the index of the given value in the given list of options.
   * @param cache The cache of indices found so far
   * @param value The value to find
   * @return The index of the value in the options list
   */
  _getIndexForValue(cache, value) {
    const isEqual = this.compareWith || Object.is;
    if (!cache.has(value)) {
      let index = -1;
      for (let i = 0; i < this.options.length; i++) {
        if (isEqual(value, this.options.get(i).value)) {
          index = i;
          break;
        }
      }
      cache.set(value, index);
    }
    return cache.get(value);
  }
  /**
   * Handle the user clicking an option.
   * @param option The option that was clicked.
   */
  _handleOptionClicked(option, event) {
    event.preventDefault();
    this.listKeyManager.setActiveItem(option);
    if (event.shiftKey && this.multiple) {
      this.triggerRange(option, this._getLastTriggeredIndex() ?? this.listKeyManager.activeItemIndex, this.listKeyManager.activeItemIndex, !option.isSelected());
    } else {
      this.triggerOption(option);
    }
  }
  /** Verifies that no two options represent the same value under the compareWith function. */
  _verifyNoOptionValueCollisions() {
    this.options.changes.pipe(startWith(this.options), takeUntil(this.destroyed)).subscribe(() => {
      const isEqual = this.compareWith ?? Object.is;
      for (let i = 0; i < this.options.length; i++) {
        const option = this.options.get(i);
        let duplicate = null;
        for (let j = i + 1; j < this.options.length; j++) {
          const other = this.options.get(j);
          if (isEqual(option.value, other.value)) {
            duplicate = other;
            break;
          }
        }
        if (duplicate) {
          if (this.compareWith) {
            console.warn(`Found multiple CdkOption representing the same value under the given compareWith function`, {
              option1: option.element,
              option2: duplicate.element,
              compareWith: this.compareWith
            });
          } else {
            console.warn(`Found multiple CdkOption with the same value`, {
              option1: option.element,
              option2: duplicate.element
            });
          }
          return;
        }
      }
    });
  }
  /** Verifies that the option values are valid. */
  _verifyOptionValues() {
    if (this.options && (typeof ngDevMode === "undefined" || ngDevMode)) {
      const selected = this.selectionModel.selected;
      const invalidValues = this._getInvalidOptionValues(selected);
      if (!this.multiple && selected.length > 1) {
        throw Error("Listbox cannot have more than one selected value in multi-selection mode.");
      }
      if (invalidValues.length) {
        throw Error("Listbox has selected values that do not match any of its options.");
      }
    }
  }
  /**
   * Coerces a value into an array representing a listbox selection.
   * @param value The value to coerce
   * @return An array
   */
  _coerceValue(value) {
    return value == null ? [] : coerceArray(value);
  }
  /**
   * Get the sublist of values that do not represent valid option values in this listbox.
   * @param values The list of values
   * @return The sublist of values that are not valid option values
   */
  _getInvalidOptionValues(values) {
    const isEqual = this.compareWith || Object.is;
    const validValues = (this.options || []).map((option) => option.value);
    return values.filter((value) => !validValues.some((validValue) => isEqual(value, validValue)));
  }
  /** Get the index of the last triggered option. */
  _getLastTriggeredIndex() {
    const index = this.options.toArray().indexOf(this._lastTriggered);
    return index === -1 ? null : index;
  }
  /**
   * Set previous active option as active option on window blur.
   * This ensures that the `activeOption` matches the actual focused element when the user returns to the document.
   */
  _setPreviousActiveOptionAsActiveOptionOnWindowBlur() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, "blur").pipe(takeUntil(this.destroyed)).subscribe(() => {
        if (this.element.contains(document.activeElement) && this._previousActiveOption) {
          this._setActiveOption(this._previousActiveOption);
          this._previousActiveOption = null;
        }
      });
    });
  }
};
_CdkListbox.ɵfac = function CdkListbox_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CdkListbox)();
};
_CdkListbox.ɵdir = ɵɵdefineDirective({
  type: _CdkListbox,
  selectors: [["", "cdkListbox", ""]],
  contentQueries: function CdkListbox_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, CdkOption, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.options = _t);
    }
  },
  hostAttrs: ["role", "listbox", 1, "cdk-listbox"],
  hostVars: 6,
  hostBindings: function CdkListbox_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("focus", function CdkListbox_focus_HostBindingHandler() {
        return ctx._handleFocus();
      })("keydown", function CdkListbox_keydown_HostBindingHandler($event) {
        return ctx._handleKeydown($event);
      })("focusout", function CdkListbox_focusout_HostBindingHandler($event) {
        return ctx._handleFocusOut($event);
      })("focusin", function CdkListbox_focusin_HostBindingHandler() {
        return ctx._handleFocusIn();
      });
    }
    if (rf & 2) {
      ɵɵhostProperty("id", ctx.id);
      ɵɵattribute("tabindex", ctx._getTabIndex())("aria-disabled", ctx.disabled)("aria-multiselectable", ctx.multiple)("aria-activedescendant", ctx._getAriaActiveDescendant())("aria-orientation", ctx.orientation);
    }
  },
  inputs: {
    id: "id",
    enabledTabIndex: [0, "tabindex", "enabledTabIndex"],
    value: [0, "cdkListboxValue", "value"],
    multiple: [2, "cdkListboxMultiple", "multiple", booleanAttribute],
    disabled: [2, "cdkListboxDisabled", "disabled", booleanAttribute],
    useActiveDescendant: [2, "cdkListboxUseActiveDescendant", "useActiveDescendant", booleanAttribute],
    orientation: [0, "cdkListboxOrientation", "orientation"],
    compareWith: [0, "cdkListboxCompareWith", "compareWith"],
    navigationWrapDisabled: [2, "cdkListboxNavigationWrapDisabled", "navigationWrapDisabled", booleanAttribute],
    navigateDisabledOptions: [2, "cdkListboxNavigatesDisabledOptions", "navigateDisabledOptions", booleanAttribute]
  },
  outputs: {
    valueChange: "cdkListboxValueChange"
  },
  exportAs: ["cdkListbox"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _CdkListbox),
    multi: true
  }]), ɵɵInputTransformsFeature]
});
var CdkListbox = _CdkListbox;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkListbox, [{
    type: Directive,
    args: [{
      selector: "[cdkListbox]",
      standalone: true,
      exportAs: "cdkListbox",
      host: {
        "role": "listbox",
        "class": "cdk-listbox",
        "[id]": "id",
        "[attr.tabindex]": "_getTabIndex()",
        "[attr.aria-disabled]": "disabled",
        "[attr.aria-multiselectable]": "multiple",
        "[attr.aria-activedescendant]": "_getAriaActiveDescendant()",
        "[attr.aria-orientation]": "orientation",
        "(focus)": "_handleFocus()",
        "(keydown)": "_handleKeydown($event)",
        "(focusout)": "_handleFocusOut($event)",
        "(focusin)": "_handleFocusIn()"
      },
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CdkListbox),
        multi: true
      }]
    }]
  }], () => [], {
    id: [{
      type: Input
    }],
    enabledTabIndex: [{
      type: Input,
      args: ["tabindex"]
    }],
    value: [{
      type: Input,
      args: ["cdkListboxValue"]
    }],
    multiple: [{
      type: Input,
      args: [{
        alias: "cdkListboxMultiple",
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkListboxDisabled",
        transform: booleanAttribute
      }]
    }],
    useActiveDescendant: [{
      type: Input,
      args: [{
        alias: "cdkListboxUseActiveDescendant",
        transform: booleanAttribute
      }]
    }],
    orientation: [{
      type: Input,
      args: ["cdkListboxOrientation"]
    }],
    compareWith: [{
      type: Input,
      args: ["cdkListboxCompareWith"]
    }],
    navigationWrapDisabled: [{
      type: Input,
      args: [{
        alias: "cdkListboxNavigationWrapDisabled",
        transform: booleanAttribute
      }]
    }],
    navigateDisabledOptions: [{
      type: Input,
      args: [{
        alias: "cdkListboxNavigatesDisabledOptions",
        transform: booleanAttribute
      }]
    }],
    valueChange: [{
      type: Output,
      args: ["cdkListboxValueChange"]
    }],
    options: [{
      type: ContentChildren,
      args: [CdkOption, {
        descendants: true
      }]
    }]
  });
})();
var EXPORTED_DECLARATIONS = [CdkListbox, CdkOption];
var _CdkListboxModule = class _CdkListboxModule {
};
_CdkListboxModule.ɵfac = function CdkListboxModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CdkListboxModule)();
};
_CdkListboxModule.ɵmod = ɵɵdefineNgModule({
  type: _CdkListboxModule,
  imports: [CdkListbox, CdkOption],
  exports: [CdkListbox, CdkOption]
});
_CdkListboxModule.ɵinj = ɵɵdefineInjector({});
var CdkListboxModule = _CdkListboxModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkListboxModule, [{
    type: NgModule,
    args: [{
      imports: [...EXPORTED_DECLARATIONS],
      exports: [...EXPORTED_DECLARATIONS]
    }]
  }], null, null);
})();
export {
  CdkListbox,
  CdkListboxModule,
  CdkOption
};
//# sourceMappingURL=@angular_cdk_listbox.js.map
