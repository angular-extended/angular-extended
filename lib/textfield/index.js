import css from './textfield.css';
import {setCustomElementHTMLCss} from '../common/util';
import { textSpanIsEmpty } from 'typescript';

class XTextfield extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this._inputEl;
    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, null, css);
    this._inputEl = this.querySelector('.input, input');
    this._addEventListener();
    this._setClasses();
    const isEmpty = this._inputEl.contentEditable ? 
      this._inputEl.innerText === '' : this._inputEl.value === '';
    isEmpty ? this.classList.add('empty') : this.classList.remove('empty');
  }

  _addEventListener() {
    this._inputEl.addEventListener('focus', e => this.classList.add('x-focused'));
    this._inputEl.addEventListener('blur', e => this.classList.remove('x-focused'));
    this._inputEl.addEventListener('input', e => {
      const isEmpty = this._inputEl.value === '';
      isEmpty ? this.classList.add('empty') : this.classList.remove('empty');
    });
  }

  _setClasses() {
    this.querySelector('.icon ~ .input, .icon ~ input')
      && this.classList.add('x-has-icon-left');
    this.querySelector('input ~ .icon, .input ~ .icon') 
      && this.classList.add('x-has-icon-right');
  }
}

if (!customElements.get('x-textfield')) {
  customElements.define('x-textfield', XTextfield);
}
