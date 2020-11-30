const getDB = async () =>{
    const favoritesDBRes = await fetch('models/rFavorites')
    const favoritesList = await favoritesDBRes.json()
    console.log(`This is the inital Todos fetch ${favoritesList}`)
    console.log(favoritesList)
    return favoritesList
}

