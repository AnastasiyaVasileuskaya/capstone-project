export default function scrollToTop() {
  document.getElementsByTagName('main')[0].scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
