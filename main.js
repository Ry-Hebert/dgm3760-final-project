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

citySearchSub.addEventListener('click', async () => {
    let searchData1 = citySearchIn.value
    console.log(`User Input data ${searchData1}`)
    ApiQuery.testImport()

    let locationSRes = await ApiQuery.locationsSearch(searchData1)
    console.log(`Location Search Results: ${locationSRes}`)
    console.log(locationSRes.location_suggestions)

    renderCitySearch(locationSRes.location_suggestions)
})

let renderCitySearch = (sRes) =>{
    let outDest = document.querySelector('#outDest')
    outDest.innerHTML = ''

    sRes.map((element, i) =>{
        outDest.innerHTML += `
            <div class='waves-effect displayCard dcAction' value='${i}' value1='${element.city_name}' value2='${element.entity_type}' value3='${element.city_id}' value4='${element.entity_id}' id='dca${i}'>
                    <h5>${element.city_name}.</h5>
            </div>`
    })

    document.querySelectorAll('.dcAction').forEach( element =>{
        element.addEventListener( 'click', ()=>{
            let itemSelector1 = element.getAttribute('value1')
            let itemSelector2 = element.getAttribute('value2')
            let itemSelector3 = element.getAttribute('value3')
            let itemSelector4 = element.getAttribute('value4')
            console.log(itemSelector1)
            console.log(itemSelector2)
            console.log(itemSelector3)
            console.log(itemSelector4)
            
            lo_detailsSearch(itemSelector4, itemSelector2)
        })
    })
}

let lo_detailsSearch = async (ent_id, entity_type) =>{
    let loDetails = await ApiQuery.location_detailsSearch(ent_id, entity_type)

    let top10 = loDetails.best_rated_restaurant
    let topC = loDetails.top_cuisines

    let outDest = document.querySelector('#outDest')
    outDest.innerHTML = ''

    console.log(top10)
    let topRestaurants = restaurantRender(top10)
    let topCuisinesRes = `<h3 class='secHeader'>Top Local Cuisines</h3>`
    topCuisinesRes += restaurantCuisines(topC)

    outDest.innerHTML = topRestaurants
    outDest.innerHTML += topCuisinesRes
}

let restaurantCuisines = (top5) =>{
    let htmlReturn = ''
    top5.map((element, i) =>{
        htmlReturn += `
        <div class='waves-effect displayCard dcAction' value='${i}' id='dca${i}'>
            <h5>${element}</h5>
        </div>`
    })
    return htmlReturn
}

let restaurantRender = (rArray) =>{
    let htmlReturn = ''
    htmlReturn += `<h3 class='secHeader'>Top Restaurants</h3>`
    rArray.map((element, i) =>{
        console.log(element.restaurant)
        htmlReturn += `
            <div class='waves-effect displayCard dcAction' value='${i}' id='dca${i}'>
                <h5>${element.restaurant.name}.</h5>
                <p>Cuisine: ${element.restaurant.cuisines}</p>
                <br>
                <p>Rating (${element.restaurant.all_reviews_count}):</p>
                <p>${element.restaurant.user_rating.rating_text}: ${element.restaurant.user_rating.aggregate_rating}</p>
                <br>
                <p>Average cost for two: $${element.restaurant.average_cost_for_two}</p>
                <br>
                <p>Delivering now: ${element.restaurant.is_delivering_now ? 'Yes' : 'No'}</p>
                <br>
                <p>Phone:</p>
                <p>${element.restaurant.phone_numbers}</p>
                <br>
                <p>Address: </p>
                <p>${element.restaurant.location.address}</p>
            </div>`
    })

    return htmlReturn
}

// Convenience feature, submits search when enter is pressed from target search input field
citySearchIn.addEventListener('keyup', (event) =>{
    if(event.keyCode == 13){citySearchSub.click()}
})
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

