import ApiQuery from './zomatoConnect.js'
console.log('Long Shot')

const getDB = async () =>{
    const favoritesDBRes = await fetch('models/rFavorites')
    const favoritesList = await favoritesDBRes.json()
    console.log(`This is the inital Favorites list fetch ${favoritesList}`)
    console.log(favoritesList)
    return favoritesList
}

let postToDB = async (value) =>{
        let pushToDatabase = await fetch(`model/rFavorites?name=${value.name}&genre=${value.genre}&category=${value.category}&genreID=${value.genreID}&id=${value.id}`, {
        method: 'POST'
    })
}

let putToDB = async (value) =>{
        let pushToDatabase = await fetch(`model/rFavorites?name=${value.name}&genre=${value.genre}&category=${value.category}&genreID=${value.genreID}`, {
        method: 'PUT'
    })
}
 
let deleteFromDB = async (value) =>{
    console.log(`Deleting: ${value} from the database`)
        let removeFromDatabase = await fetch(`model/rFavorites/${value}`, {
        method: 'DELETE'
    })
    return removeFromDatabase
}

let citySearchIn = document.querySelector('#in1')
let citySearchSub = document.querySelector('#in2')

citySearchSub.addEventListener('click', () => {
    let searchData1 = citySearchIn.value
    console.log(`User Input data ${searchData1}`)
    ApiQuery.testImport()

    let locactionSRes = ApiQuery.locationsSearch(searchData1)
    // let locactionSRes = ApiQuery.citySearch(searchData1)
    console.log(`Location Search Results: ${locactionSRes}`)
    console.log(locactionSRes)

})

// Convenience feature, submits search when enter is pressed from target search input field
citySearchIn.addEventListener('keyup', (event) =>{
    if(event.keyCode == 13){citySearchSub.click()}
})
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

