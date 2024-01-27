const notesDiv = document.querySelector('.notes')
const submitBtn = document.querySelector('.submitBtn')
const clearBtn = document.querySelector('.clearBtn')
const textInput = document.querySelector('.textInput')
const dateInput = document.querySelector('.dateInput')
const timeInput = document.querySelector('.timeInput')
//what happens when the user decides to clear the whole board
clearBtn.addEventListener('click',function(){
    localStorage.clear();
    location.reload()
    })

document.addEventListener('DOMContentLoaded',function(){
    const notes = []
    let latestId = parseInt(localStorage.getItem('latestId')) || 0
    loadNotes()
    //what happens when the user creates a task
    submitBtn.addEventListener('click',function(){
        if(!textInput.value||!dateInput.value||!timeInput.value){
            alert('make sure you fill all fields')
        }else{
            latestId++
            const noteObj = {
                text: textInput.value,
                date: dateInput.value,
                time: timeInput.value,
                noteId: latestId,
                isFinished: false
            }
            localStorage.setItem(`note_${latestId}`,JSON.stringify(noteObj))
            localStorage.setItem('latestId',latestId)
            notes.push(noteObj)
            updatePage()
            textInput.value=''
            dateInput.value=''
            timeInput.value=''
        }
        console.log(localStorage)
    })
    //gets notes from the local storage 
    function loadNotes(){
        for(let i = 1; i<= latestId; i++){
            const noteString = localStorage.getItem(`note_${i}`);
            if(noteString){
                const note = JSON.parse(noteString)
                notes.push(note)
            }
        }
        updatePage()
    }
    //creates all the notes with the data from local storage
    function updatePage(){
        notesDiv.innerHTML = '';

        notes.forEach(note => {
            const warper = document.createElement('div')
            notesDiv.appendChild(warper)
            warper.classList.add('note')

            const deleteBtn = document.createElement('span')
            deleteBtn.classList.add('deleteBtn')
            deleteBtn.classList.add('glyphicon')
            deleteBtn.classList.add('glyphicon-remove')
            warper.appendChild(deleteBtn)
            deleteBtn.addEventListener('click',function(){
                deleteNote(note.noteId)
            })

            const endTaskBtn = document.createElement('button')
            endTaskBtn.classList.add('endTask')
            warper.appendChild(endTaskBtn)
            endTaskBtn.addEventListener('click',function(){
                endTask(text,note.noteId)
            })

            const textWarper = document.createElement('div')
            warper.appendChild(textWarper)
            textWarper.classList.add('textWarper')

            const text = document.createElement('p')
            text.textContent = note.text
            textWarper.appendChild(text)

            const timeDateWarper = document.createElement('div')
            warper.appendChild(timeDateWarper)
            timeDateWarper.classList.add('timeDateWarper')

            const time = document.createElement('span')
            time.textContent = note.time
            timeDateWarper.appendChild(time)

            const date = document.createElement('span')
            date.textContent = note.date+' '
            timeDateWarper.appendChild(date)

            //fade in effect
            warper.style.opacity = 0
            warper.offsetHeight
            warper.classList.add('.fadeIn')
            warper.style.opacity = 1

        })
    }
    //delete a specific note 
    function deleteNote(noteId){
        const index = notes.findIndex(note=> note.noteId === noteId)
        notes.splice(index,1);
        localStorage.removeItem(`note_${noteId}`)
        updatePage()
    }
})