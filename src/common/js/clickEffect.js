const addclickEffect = function (e) {
  // document.getElementsByClassName('ripple').classList.remove('show')
  var target = e.target
  console.log(target.className)
  console.log(target.className !== 'btneffect')
  if (target.className !== 'btneffect') {
    return false
  } else {
    // document.getElementsByClassName('ripple').classList.remove('show')
    var rect = target.getBoundingClientRect()
    var ripple = target.querySelector('.ripple')
    if (!ripple) {
      ripple = document.createElement('span')
      ripple.className = 'ripple'
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
      target.appendChild(ripple)
    }
    ripple.classList.remove('show')
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft
    ripple.style.top = top + 'px'
    ripple.style.left = left + 'px'
    ripple.classList.add('show')
    return false
  }
}
document.addEventListener('click', addclickEffect, false)
