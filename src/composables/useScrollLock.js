import { watch } from 'vue'

export function useScrollLock(openRef) {
  let savedScrollY = 0

  function isDocScrollable() {
    return document.documentElement.scrollHeight > window.innerHeight
  }

  function lockScrollbar() {
    savedScrollY = window.scrollY
    document.body.classList.add('overflow-y-scroll', 'fixed', 'left-0', 'right-0')
    document.body.style.top = `-${savedScrollY}px`
  }

  function unlockScrollbar() {
    document.body.classList.remove('overflow-y-scroll', 'fixed', 'left-0', 'right-0')
    document.body.style.top = ''
    window.scrollTo(0, savedScrollY)
  }

  watch(openRef, () => {
    if (isDocScrollable() && openRef.value) {
      lockScrollbar()
    }
  })

  return {
    lockScrollbar,
    unlockScrollbar,
  }
}
