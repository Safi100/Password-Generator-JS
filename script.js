const char_length = document.querySelector(".char_length")
const range = document.querySelector(".range")
const Password_Form = document.querySelector(".password_form")
const UpperCase = document.querySelector("#Uppercase")
const LowerCase = document.querySelector("#Lowercase")
const Numbers = document.querySelector("#Numbers")
const Symbols = document.querySelector("#Symbols")
const GenerateBtn = document.querySelector(".generate_btn")
const DisplayPassword  = document.querySelector("#password")
const copy = document.querySelector(".copy")

const UPPERCASE_CHAR_CODES = GetFromCodes(65, 90)
const LOWERCASE_CHAR_CODES = GetFromCodes(97, 122)
const NUMBERS_CHAR_CODES = GetFromCodes(48, 57)
const SYMBOLS_CHAR_CODES = GetFromCodes(33, 47).concat(GetFromCodes(58, 64)).concat(GetFromCodes(91, 96)).concat(GetFromCodes(123, 126))
const random = {
    IncludeUpperCase : getRandomUpper,
    IncludeLoswerCase : getRandomLower,
    IncludeNumbers : getRandomNumber,
    IncludeSymbols : getRandomSymbol
}
range.addEventListener('input', ControlRange)
Password_Form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const CharacterLength = +range.value
    const IncludeUpperCase = UpperCase.checked
    const IncludeLoswerCase = LowerCase.checked
    const IncludeNumbers = Numbers.checked
    const IncludeSymbols = Symbols.checked    
    GeneratePassword(CharacterLength,IncludeUpperCase,IncludeLoswerCase,IncludeNumbers,IncludeSymbols)
})
copy.addEventListener('click', ()=>{
    copyPassword(DisplayPassword.value)
})

function getRandomUpper (){
    return String.fromCharCode(UPPERCASE_CHAR_CODES[Math.floor(Math.random() * UPPERCASE_CHAR_CODES.length)])
}
function getRandomLower (){
    return String.fromCharCode(LOWERCASE_CHAR_CODES[Math.floor(Math.random() * LOWERCASE_CHAR_CODES.length)])   
}
function getRandomNumber(){
    return String.fromCharCode(NUMBERS_CHAR_CODES[Math.floor(Math.random() * NUMBERS_CHAR_CODES.length)])
}
function getRandomSymbol(){
    return String.fromCharCode(SYMBOLS_CHAR_CODES[Math.floor(Math.random() * SYMBOLS_CHAR_CODES.length)])
}
function GetFromCodes(start, end){
    const array = []
    for( let i =start; i<= end; i++){
        array.push(i)
    }
    return array
}

function ControlRange(){
    char_length.innerHTML = range.value
}

function GeneratePassword(CharacterLength,IncludeUpperCase,IncludeLoswerCase,IncludeNumbers,IncludeSymbols){
    let generatedPassword = ''
    const typesCounts = IncludeUpperCase + IncludeLoswerCase + IncludeNumbers + IncludeSymbols
    const typesActive = [ {IncludeUpperCase}, {IncludeLoswerCase}, {IncludeNumbers}, {IncludeSymbols}].filter(checked => Object.values(checked)[0])
    if(CharacterLength === 0){ return ''}
    if(typesCounts === 0) { return ''}
    for(let i=0; i< CharacterLength; i+= typesCounts){
        typesActive.forEach(active => {
            const funcNAME = Object.keys(active)[0]
            generatedPassword += random[funcNAME]()
        })
    }
    const ElPassword = generatedPassword.slice(0, CharacterLength)
    DisplayPassword.value = ElPassword
}
function copyPassword(password){
    if(password == ''){ return ''}

    DisplayPassword.select()
    navigator.clipboard.writeText(password)
    window.alert("copied to clipboard : " + password)
}