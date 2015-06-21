import { $, find } from 'domtastic/commonjs/selector';
import { css } from 'domtastic/commonjs/css';
import { hasClass, toggleClass, addClass } from 'domtastic/commonjs/dom/class';
import { some } from 'domtastic/commonjs/array';
import { on, off } from 'domtastic/commonjs/event';
import { html } from 'domtastic/dom/html';
import { attr } from 'domtastic/dom/attr';

$.fn = {};
$.fn.on = on;
$.fn.off = off;
$.fn.css = css;
$.fn.hasClass = hasClass;
$.fn.toggleClass = toggleClass;
$.fn.addClass = addClass;
$.fn.some = some;
$.fn.find = find;
$.fn.html = html;
$.fn.attr = attr;

module.exports = $;