const form = document.querySelector('form');
const successAlert = document.querySelector('.success-msg');


const inputs ={
    nameInput : form.name ,
    numberInput : form.number ,
    monthInput : form.month ,
    yearInput : form.year ,
    cvcInput : form.cvc
}


form.addEventListener('submit' , function(e){
    e.preventDefault();

    const currentForm = this;



    // getiing values
    const data = {
        name : inputs['nameInput'].value.trim() ,
        number : inputs.numberInput.value.trim() ,
        month : inputs.monthInput.value.trim(),
        year : inputs.yearInput.value.trim() ,
        cvc : inputs.cvcInput.value.trim()
    };

    // reset all the inputs inside the form
    resetForm();

    // checking validity of data
    let containsErrors = false;
    if( !data.name )
    {
        showErrorMessage(inputs.nameInput , 'Can not be blank !');
        containsErrors = true ;
    }
    if( !data.number){
        showErrorMessage(inputs.numberInput , 'Can not be blank !');
        containsErrors = true ;
    }
    if( data.number && !checkCardNumber(data.number)){
        showErrorMessage(inputs.numberInput , 'wrong format !');
        containsErrors = true ;
    }
    if( !data.month ){
        showErrorMessage(inputs['monthInput'] , 'Can not be blank !');
        containsErrors = true ;
    }
    if(  !data.year){
        showErrorMessage(inputs['yearInput'] , 'Can not be blank !');
        containsErrors = true ;
    }
    if( !data.cvc){
        showErrorMessage(inputs['cvcInput'] , 'Can not be blank !') ;
        containsErrors = true ;
    }
    if( checkCvc(data.cvc) == false){
        showErrorMessage(inputs['cvcInput'] , 'Wrong format !');
        containsErrors = true ;
    }

    // data validated
    if( containsErrors == false )
    {
        resetForm();
        showAlert();
    }

    // reset all the inputs
    function resetForm(){
        const inputsKeys = Object.keys(inputs);
        for(const key of inputsKeys)
        {
            resetInput(inputs[key]);
        }

    }

    // show the error message
    function showErrorMessage(input , message){
        const parent = input.closest('.input-wrapper');

        parent.classList.add('has-error');
        parent.querySelector('.error-msg').textContent = message;
    }

    // reset the form function
    function resetInput(input){
        const parent = input.closest('.input-wrapper');

        parent.classList.remove('has-error');
        parent.querySelector('.error-msg').textContent = '';
    }

    // check card number
    function checkCardNumber(value){
        const regex = /^(\d{4}\s){3}\d{4}$/g;
        return regex.test(value);
    }

    // check cvc format
    function checkCvc(value){
        const regex = /^\d{3}$/g;
        return regex.test(value);
    }

    // this function for hiding form and showing alert
    async function showAlert(){
      await fadeOut(300);
      form.classList.add('hidden');
      successAlert.classList.add('visible','fade-in');
    }

    // fade out the form with async mode
    async function fadeOut(ms){
        return new Promise( resolve =>{
          // code to execute
          form.classList.add('fading-out');
          setTimeout(resolve , ms);
        });
    }




});

// add change events for inputs
const inputsKeys = Object.keys(inputs);
for(const key of inputsKeys)
{
    inputs[key].addEventListener('keyup' , changeInput );
}

function changeInput(e){
    document.querySelector(`${e.target.dataset.target}`).textContent = e.target.value;
    console.log(e);
}
