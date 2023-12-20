const url = "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=";
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const menu = document.getElementById("list");
const card = document.getElementById("card");
const goback = document.getElementById("go-back")
const pokemonImg = document.getElementById("img")
const pokemonName = document.getElementById("name")
const pokemonId = document.getElementById("id")
const pokemonUl = document.getElementById("ul")

goback.addEventListener("click", GoBack);

let offset = 0

let data = []

function LoadData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + offset);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        for(let i = 0; i < xhr.response.results.length; i++) 
        {
            AddNewItem(i, xhr.response.results[i]);
        }    
    }
}

function AddNewItem(number, info) {
    let pokemonElement = document.createElement('button');
    data.push(info);
    pokemonElement.innerText = info.name;
    pokemonElement.number = number;
    pokemonElement.addEventListener("click", ItemClicked);
    menu.insertBefore(pokemonElement, menu.firstChild);
}

function ItemClicked()
{
   const xhr = new XMLHttpRequest();
   xhr.open("GET", data[this.number].url);
   xhr.responseType = 'json';
   xhr.send();
   xhr.onload = function() {
      pokemonImg.setAttribute('src', xhr.response.sprites.front_default)
      pokemonImg.style.width = 'auto'
      pokemonImg.style.height = 'auto'
      let name = xhr.response.name[0].toUpperCase() + xhr.response.name.slice(1)
      pokemonName.innerText = name
      pokemonId.innerText = "id: #" + xhr.response.id

      FullList(xhr.response.abilities)
   }


   menu.classList.remove("show")
   menu.classList.add("hide")
   card.classList.add("show")
}

function FullList(abilities)
{
    pokemonUl.innerText = ""

    for(let i = 0; i < abilities.length; i++)
    {
        let pokemonAbility = document.createElement('li')
        pokemonAbility.innerText = abilities[i].ability.name
        pokemonUl.appendChild(pokemonAbility)
    }
  }
   
function GoBack()
{
    card.classList.remove("show")
    card.classList.add("hide")
    menu.classList.remove("hide")
    menu.classList.add("show")
}

function ClearList()
{
    data = []
    while(menu.childNodes.length > 2)
    {
        menu.removeChild(menu.firstChild)
    }
}

prev.onclick = function()
{
    if(offset >= 10)
    {
       offset = offset - 10;
       ClearList()
       LoadData()
    }
}

next.onclick = function()
{
    offset = offset + 10;
    ClearList()
    LoadData()
}

LoadData();
