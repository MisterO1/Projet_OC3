// ****** print works according to the filter selected ******
const works = await fetch("http://localhost:5678/api/works").then( works => works.json())
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

async function printWorks(category) {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""
    const worksFiltered = category === "Tous" ? works : works.filter(work => category === work.category.name)
    for (let work of worksFiltered){
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        img.src = work.imageUrl
        img.alt = work.title
        const figcaption = document.createElement("figcaption")
        figcaption.innerText = work.title
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    }
}

// ****** modal : handle adding and deleting works *******
const editBtn = document.querySelector(".edit")
editBtn.addEventListener("click", ()=>{
    document.querySelector(".modal").classList.add("active")
})

const closeBtn = document.querySelector(".icon-close")
closeBtn.addEventListener("click", ()=>{
    document.querySelector(".modal").classList.remove("active")
})

const backBtn = document.querySelector(".icon-back")
backBtn.addEventListener("click", ()=>{
    document.querySelector(".modal-form").classList.remove("active")
    document.querySelector(".modal-gallery").classList.add("active")
})
const addWorkBtn = document.querySelector(".modal-gallery button")
addWorkBtn.addEventListener("click", ()=>{
    document.querySelector(".modal-gallery").classList.remove("active")
    document.querySelector(".modal-form").classList.add("active")
    backBtn.classList.add("active")
})

