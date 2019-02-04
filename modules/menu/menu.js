import { arrayFromItems, selectItem } from '../../utils/selectors'
import { isInViewport } from '../../utils/viewport'

export default function() {
  const menuItems = arrayFromItems('.menu__item');
  const menu = selectItem('.menu');

  const highlightItem = selectedItem => {
    menuItems.forEach(item => {
      item.classList.remove('highlighted')
    })

    selectedItem.classList.add('highlighted');
  }

  menuItems.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();

      highlightItem(item);
      menu.classList.remove('open')

      const scrollId = item.getAttribute('href')

      const scrollTarget = selectItem(scrollId)
      if (!scrollTarget) return;
      scrollTarget.scrollIntoView({
        behavior: 'smooth',
      });

    })
  })

  document.addEventListener('scroll', event => {
    const sections = arrayFromItems('section');
    sections.forEach(section => {
      if(isInViewport(section)) {
        const menuItem = menuItems.find(item => item.getAttribute('href') === `#${section.id}`);
        highlightItem(menuItem);

      }
    })
  }, {
    capture: true,
    passive: true,
  })

  const menuButton = selectItem('button.menu__icon');
  menuButton.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}
