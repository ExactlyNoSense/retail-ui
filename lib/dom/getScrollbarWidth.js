// @flow

let scrollbarWidth = null;

export default function getScrollbarWidth(recalculate: boolean): ?number {
  if (document.readyState === 'loading') {
    return null;
  }

  if (!recalculate && scrollbarWidth != null) {
    return scrollbarWidth;
  }

  const div1 = document.createElement('div');
  const div2 = document.createElement('div');

  div1.style.width = div2.style.width = '100px';
  div1.style.height = div2.style.height = '100px';
  div1.style.overflow = 'scroll';
  div2.style.overflow = 'hidden';
  document.body.appendChild(div1);
  document.body.appendChild(div2);

  scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight);

  document.body.removeChild(div1);
  document.body.removeChild(div2);

  return scrollbarWidth;
}
