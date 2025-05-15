import { printWorks } from "./script.js"

// Redirect if not logged on
if (!sessionStorage.getItem("token")){
    window.location.href = "./index.html"
}

printWorks()

// ****** Print works according to the filter selected ******
const filtersBtn = document.querySelectorAll(".filter")
filtersBtn.forEach(filter => {
    filter.addEventListener("click", ()=>{
        const filterActive = document.querySelector(".filter.active")
        if (filter === filterActive){
            return
        }
        filterActive.classList.remove("active")
        filter.classList.add("active")
        printWorks(filter.innerText)
    })
})


// ****** modal : handle adding and deleting works ******* //
const modal = document.querySelector(".modal");
const modalBox = document.querySelector(".modal-box");

modal.addEventListener("click", (e) => {
    if (!modalBox.contains(e.target)) {
        modal.classList.remove("active")
    }
})
async function displayModal() {
    const editBtn = document.querySelector(".edit")
    editBtn.addEventListener("click", async ()=>{
        console.log("editBtn clicked -> gallery-works printed")
        const works = await fetch("http://localhost:5678/api/works").then( works => works.json())
        const galleryWorks = document.querySelector(".gallery-works")
        galleryWorks.innerHTML = ""
        for (let work of works){
            const figure = document.createElement("figure")
            const img = document.createElement("img")
            // const svg = document.createElement("svg")
            img.src = work.imageUrl
            img.alt = work.title
            figure.appendChild(img)
            figure.insertAdjacentHTML("beforeend", '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="17" height="17" rx="2" fill="black"/> <path d="M6.71607 3.35558C6.82455 3.13661 7.04754 3 7.29063 3H9.70938C9.95246 3 10.1754 3.13661 10.2839 3.35558L10.4286 3.64286H12.3571C12.7127 3.64286 13 3.93013 13 4.28571C13 4.64129 12.7127 4.92857 12.3571 4.92857H4.64286C4.28728 4.92857 4 4.64129 4 4.28571C4 3.93013 4.28728 3.64286 4.64286 3.64286H6.57143L6.71607 3.35558ZM4.64286 5.57143H12.3571V12C12.3571 12.7092 11.7806 13.2857 11.0714 13.2857H5.92857C5.21942 13.2857 4.64286 12.7092 4.64286 12V5.57143ZM6.57143 6.85714C6.39464 6.85714 6.25 7.00179 6.25 7.17857V11.6786C6.25 11.8554 6.39464 12 6.57143 12C6.74821 12 6.89286 11.8554 6.89286 11.6786V7.17857C6.89286 7.00179 6.74821 6.85714 6.57143 6.85714ZM8.5 6.85714C8.32321 6.85714 8.17857 7.00179 8.17857 7.17857V11.6786C8.17857 11.8554 8.32321 12 8.5 12C8.67679 12 8.82143 11.8554 8.82143 11.6786V7.17857C8.82143 7.00179 8.67679 6.85714 8.5 6.85714ZM10.4286 6.85714C10.2518 6.85714 10.1071 7.00179 10.1071 7.17857V11.6786C10.1071 11.8554 10.2518 12 10.4286 12C10.6054 12 10.75 11.8554 10.75 11.6786V7.17857C10.75 7.00179 10.6054 6.85714 10.4286 6.85714Z" fill="white"/></svg>')
            galleryWorks.appendChild(figure)
        }
        modal.classList.add("active")
        addlistenerToDeleteIcons()
    })
}
displayModal()

const closeBtn = document.querySelector(".icon-close")
closeBtn.addEventListener("click", ()=>{
    modal.classList.remove("active")
})

const backBtn = document.querySelector(".icon-back")
backBtn.addEventListener("click", function(){
    document.querySelector(".modal-form").classList.remove("active")
    document.querySelector(".modal-gallery").classList.add("active")
    this.classList.remove("active")
})
const addWorkBtn = document.querySelector(".modal-gallery button")
addWorkBtn.addEventListener("click", ()=>{
    document.querySelector(".modal-gallery").classList.remove("active")
    document.querySelector(".modal-form").classList.add("active")
    backBtn.classList.add("active")
})

// ******** upload works feature *********
fileElem.addEventListener('change', function () {
    const file = fileElem.files[0];
    const error = document.querySelector(".upload-space-content p")
    if (file) {
        const maxSize = 4 * 1024 * 1024; // 4 Mo en octets
        if (file.size > maxSize) {
            error.textContent = "L'image ne doit pas dépasser 4 Mo."
            error.classList.add("error")
            fileElem.value = ''; // Réinitialise le champ
        } else {
            error.textContent = "jpg, png : 4mo max"; // OK
            error.classList.remove("error")
            document.querySelector(".upload-space-content").style.display = "none"
            const reader = new FileReader();
            const preview = document.querySelector("#preview")
            reader.onload = function (e){
                preview.src = e.target.result
                preview.style.display = "block"
            }
            reader.readAsDataURL(file)
        }
    }
})
function activateUploadBtn() {
    const fileSelect = document.getElementById("fileSelect");
    const fileElem = document.getElementById("fileElem");
    fileSelect.addEventListener("click",() => {
        fileElem.click()
    })
}
activateUploadBtn()

// **** activate the Validation button ******
function activateValidateButton() {
    const modalForm = document.querySelector(".form-works")
    const validateBtn = document.querySelector(".form-works > button")
    modalForm.addEventListener("change",()=>{
        let resp = true
        const listChamp = document.querySelectorAll(".form-works input,.form-works select")
        for ( let champ of listChamp){
            if (!champ.value){
                resp = false
                break
            }
        }
        if (resp){
            validateBtn.disabled = false
            validateBtn.classList.add("active")
        }else{
            validateBtn.disabled = true
            validateBtn.classList.remove("active")
        }
    })
}
activateValidateButton()

// ***** import category from api ******
async function printCategoriesToSelect(){
    const worksCategories = await fetch("http://localhost:5678/api/categories").then(worksCategories => worksCategories.json())
    const select = document.querySelector("#category")
    select.innerHTML = "<option value=''></option>"
    for (let cat of worksCategories){
        select.insertAdjacentHTML("beforeend",`<option value=${cat.id}>${cat.name}</option>`)
    }
}
printCategoriesToSelect()

// ***** DELETE WORKS BY CLICKING ON DELETE ICONS *******
function addlistenerToDeleteIcons(){
    document.querySelectorAll(".gallery-works svg").forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", async function(){
            const imgUrl = deleteBtn.parentElement.querySelector("img").src // ou ( const imgUrl = btn.previousElementSibling.src )
            const works = await fetch("http://localhost:5678/api/works").then( works => works.json())
            const work = works.filter((w) => {   return w.imageUrl === imgUrl   })[0]
            if(work){
                if (!confirm(`Projet ${work.id} : ${work.title} -> is about to be deleted`)) {
                    return;
                }
                await fetch(
                    `http://localhost:5678/api/works/${work.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Authorization": "Bearer "+ sessionStorage.getItem("token"),
                        },
                    }
                )
                // update gallery just after
                printWorks()
                // update gallery-works too
                document.querySelector(".edit").click()
            }
        })
    })
}

//*********** POST NEW WORK *************
function postNewWork() {
    const modalForm = document.querySelector(".form-works")
    modalForm.addEventListener("submit", async function(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append("image",e.target.querySelector('[name="fileElem"]').files[0])
        formData.append("title",e.target.querySelector('[name="title"]').value)
        formData.append("category",e.target.querySelector('[name="category"]').value)
        await fetch(
            "http://localhost:5678/api/works",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer "+ sessionStorage.getItem("token"),
                },
                body: formData
            }
            ).then( data => {
                if (data){
                    printWorks()                            // update gallery just after
                    document.querySelector(".edit").click() // update gallery-works too
                    clearForm()                             // clear the form
                }
            }
            ).catch(error => console.log(error))
    })
}
postNewWork()
function clearForm() {
    const listChamp = document.querySelectorAll(".form-works input,.form-works select")
    for ( let champ of listChamp){
        champ.value = ""
    }
    const preview = document.querySelector("#preview")
    preview.src = ""
    preview.style.display = "none"
    document.querySelector(".upload-space-content").style.display = "flex"
}

/// LOGOUT ////
function logout() {
    document.getElementById("logout").addEventListener("click", ()=>{
        sessionStorage.removeItem("token")
        window.location.href = "./index.html"
    })
}
logout()