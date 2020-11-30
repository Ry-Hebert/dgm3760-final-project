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