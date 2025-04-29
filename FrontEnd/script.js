// import { printWorks } from "./categories"

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

