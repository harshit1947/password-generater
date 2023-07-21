const slider = document.querySelector('.slider-sec');
const field = document.querySelector('.length-value');
const strengthLight = document.querySelector('.light');
const allcheckbox = document.querySelectorAll('input[type=checkbox]');
const copidSec = document.querySelector('.copied-sec');
const showPass = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const generateButton = document.getElementById('generateButton');

let passwordLength = 10;
let password ="";
let checkCount =0;
let symbol ="`~!@#$%^&*()-_=+|}[]{;:'.>,<?/";
//handeling slider
function handelSlider(){
    field.innerText = passwordLength;
}
slider.addEventListener('input',(e)=>{
    let value = e.target.value;
    passwordLength = value;
    field.innerText = passwordLength;
})

//handeling strength light

function showStrength(color){
    strengthLight.style.backgroundColor = color;
}

//generate random number from min to max
function getRandInt(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

//generate random number from 1 to 9
function generteRandomNumber(){
    return getRandInt(0,9);
}

//generate random lower case character

function generateRandomLowerCaseChar(){
    return String.fromCharCode(getRandInt(97,123));
}

//generate random upper case character
function generateRandomUpperCaseChar(){
    return String.fromCharCode(getRandInt(65,91));
}

//generate random symbol
function generateRandomSymbol(){
    let idx = getRandInt(0,symbol.length);
    return symbol[idx];
}


//function to calculate strength
function calcStrength(){
    let hasUpp = false;
    let hasLow = false;
    let hasNum = false;
    let hasSym = false;
    if(upperCase.checked) hasUpp=true;
    if(lowerCase.checked) hasLow= true;
    if(numberCase.checked) hasNum= true;
    if(symbolCase.checked) hasSym=true;

    if(hasUpp && hasLow && (hasNum || hasSym) && passwordLength>=8){
        showStrength('green');
    }else if((hasUpp || hasLow) && (hasNum || hasSym) && passwordLength >=6){
        showStrength('yellow');
    }else{
        showStrength('red');
    }
}

async function copyPassword(){
    try{
        await navigator.clipboard.writeText(showPass.value);
        copidSec.innerText ='copied';
    }catch(e){
        copidSec.innerText = 'Failed';
    }

    //to make copy wala span visible
    copidSec.classList.add('active');

    //after some time we have to remove that copy wala message
    setTimeout(() => {
        copidSec.classList.remove('active');
    }, 2000);
}

//adding event listener on copy btn
copyBtn.addEventListener('click',() =>{
    if(showPass.value){
        copyPassword();
    }
})
function checkBoxHandeler(){
        checkCount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
        // console.log(checkCount);
        if(passwordLength<checkCount){
            passwordLength=checkCount;
            handelSlider();
        }
    })
}
allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',checkBoxHandeler);
    
});
//adding event listner on generate btn

function shufflePassword(array){
    for(let i= array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str ="";
    array.forEach((el)=>{
        str +=el;
    })
    return str;
}

generateButton.addEventListener('click',()=>{
    console.log(checkCount);
    if(checkCount<=0) return;
    if(passwordLength <checkCount){
        passwordLength = checkCount;
        handelSlider();
        
    }
    console.log('checking');
    password="";
    let func = [];
    if(upperCase.checked){
        func.push(generateRandomUpperCaseChar);
    }
    if(lowerCase.checked){
        func.push(generateRandomLowerCaseChar);
    }
    if(numberCase.checked){
        func.push(generteRandomNumber);
    }
    if(symbolCase.checked){
        func.push(generateRandomSymbol);
    }
 
    //adding compulsory password
    password ="";
    for(let i=0;i<func.length;i++){
        password +=func[i]();
    }

    //adding remaining password
    console.log('normal done');
    for(let i=0;i<passwordLength-func.length;i++){
        let randIdx = getRandInt(0,func.length);
        password +=func[randIdx]()
    }
    
    password = shufflePassword(Array.from(password));
    calcStrength();
   
    showPass.value = password;
    generateButton.classList.add('bg-c');
    setTimeout(() => {
        generateButton.classList.remove('bg-c');
    }, 1000);

})

