const bodyEl = document.getElementsByTagName("body")
const inputEL = document.getElementById("de")

let count = 0
function scrolling(e) {
    console.log("scrolling....." + count)
    count++
}

const fnOne = throttle(scrolling, 1500)

window.addEventListener("scroll", fnOne)

function throttle(fn, delay) {
    let lastCall = 0
    return function (...args) {
        let now = Date.now()
        if (now - lastCall >= delay) {
            lastCall = now
            fn.apply(this, args)
        }
    }
}

const functionTwo = (e) => { console.log(e.target.value) }

const debounceFn = debounce(functionTwo, 2000)

inputEL.addEventListener("input", debounceFn)


function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

