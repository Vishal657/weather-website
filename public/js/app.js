console.log('javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageSelector1 = document.querySelector('#message1')
const messageSelector2 = document.querySelector('#message2')

// messageSelector.textContent='Form JavaScript'


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location=search.value
    messageSelector1.textContent="Loading..."
    messageSelector2.textContent=""
    fetch('http://localhost:3030/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageSelector1.textContent = data.error
        }else{
            messageSelector1.textContent = data.location
            messageSelector2.textContent = data.forecase
        }
    })
})
})