const getDB = async () =>{
    const favoritesDBRes = await fetch('model/')
    const favoritesList = await favoritesDBRes.json()
    console.log(`This is the inital Favorites list fetch ${favoritesList}`)
    console.log(favoritesList)
    return favoritesList
}

let deleteFromDB = async (value) =>{
    console.log(`Deleting: ${value} from the database`)
        let removeFromDatabase = await fetch(`model/${value}`, {
        method: 'DELETE'
    })
    return removeFromDatabase
}

let renderFavoritesList = (sRes) =>{
    console.log(sRes.results)
    let outDest = document.querySelector('#outDest')
    outDest.innerHTML = ''

    sRes.map((element, i) =>{
        outDest.innerHTML += `
            <div class='waves-effect displayCard dcAction' value='${i}'>
                <h5>${element.name}</h5>
                <p>Cuisines: ${element.cuisines}</p>
                <div class='bottom_bar'>
                    <i class='small material-icons togSelector${i} delete' value='${i}' value2='${element.id}' value3='${element.name}' value4='${element.cuisines}'>favorite</i>
                    <i class='small material-icons togSelector${i} show hide' value='${i}' value2='${element.id}' value3='${element.name}' value4='${element.cuisines}'>favorite_border</i>
                </div>
            </div>`;
    })    

    document.querySelectorAll('.delete').forEach(element =>{
        element.addEventListener('click', () =>{
            let passToDatabase1 = element.getAttribute('value2')
            console.log('Pass to database test')
            console.log(passToDatabase1)
    
            deleteFromDB(passToDatabase1)
            tryThisAwait()
        })
    }) 
}

let tryThisAwait = async ()=>{
    let fList = await getDB()
    renderFavoritesList(fList)
}

tryThisAwait()