import {
  TABLE_RESIZE, CHANGE_TEXT,
  CHANGE_STYLE, APPLY_STYLE,
  CHANGE_TITLE, APPLY_LAST_VISIT
} from './types';

export function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state,
        [field]: value(field, state, action)
      };
    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(field, state, action)
      };
    case APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value};
      });
      return {
        ...state,
        [field]: val, currentStyles: {...state.currentStyles, ...action.data.value}
      };
    case CHANGE_STYLE:
      return {...state, currentStyles: action.data};
    case CHANGE_TITLE:
      return {...state, title: action.data};
    case APPLY_LAST_VISIT:
      return {...state, lastVisit: new Date().toJSON()};
    default:
      return state;
  }
}

function value(field, state, action) {
  const prevState = state[field] || {};
  prevState[action.data.id] = action.data.value;
  return prevState;
}
