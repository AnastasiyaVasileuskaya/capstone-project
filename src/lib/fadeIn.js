import anime from 'animejs'
export default function fadeIn() {
  const fadeIn = anime.timeline()
  fadeIn.add({
    targets: 'main',
    opacity: [0, 1],
    duration: 200,
    easing: 'easeInOutQuad',
  })
}
