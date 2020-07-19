import {$} from '@core/dom';

export function resizeHandler($root, event) {
  // event.target.getAttribute('data-resize') // result: row
  // event.target.dataset // result: data-resize="row" ==> { resize: "row" }

  const $resizer = $(event.target); // оборачиваем в Dom instance

  // const $parent = $resizer.$el.parentNode; // bad
  // const $parent = $resizer.$el.closest('.column'); // bad
  const $parent = $resizer.parent('[data-type="resizable"]'); // normal
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  let value;
  const sideProp = type === 'col' ? 'bottom' : 'right';

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  });

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: `${-delta}px`});
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({bottom: `${-delta}px`});
    }
  };
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      $parent.css({width: `${value}px`});
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px');
    } else {
      $parent.css({height: `${value}px`});
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}
