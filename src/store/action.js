import {
  TABLE_RESIZE, CHANGE_TEXT,
  CHANGE_STYLE, APPLY_STYLE,
  CHANGE_TITLE, APPLY_LAST_VISIT
} from '@/store/types';

// action create
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  };
}
export function apllyLastVisit() {
  return {
    type: APPLY_LAST_VISIT
  };
}
export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  };
}
export function changeStyles(data) {
  return {
    type: CHANGE_STYLE,
    data
  };
}
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  };
}
export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data
  };
}
