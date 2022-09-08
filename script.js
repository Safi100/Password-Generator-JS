const char_length = document.querySelector(".char_length")
const range = document.querySelector(".range")

range.addEventListener('input', ControlRange)

function GeneratePassword(e){
    e.preventDefault()
}

function ControlRange(){
    char_length.innerHTML = range.value
}