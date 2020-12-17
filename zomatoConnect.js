require('dotenv').config()
// zomato

// Reference: https://developers.zomato.com/documentation#!/location/locations

// main route https://developers.zomato.com/api/v2.1

// https://developers.zomato.com/api/v2.1/categories
//      uKey
// https://developers.zomato.com/api/v2.1/locations
//      uKey
//      query
// https://developers.zomato.com/api/v2.1/dailymenu
//      uKey
//      res_id
// https://developers.zomato.com/api/v2.1/restaurant
//      uKey
//      res_id
// 

// Jim is looking for a place to eat in a city he's near while driving cross country.
// Eric and Erin are trying to find somewhere different to eat than the normal options they tend to go for.
// Cam, Le Su, Jeff, Jenny, and Pam are looking for a place to eat for their ethnic food Friday tradition but can't decide so just want something that will give them a random restaurant in their area.
// Chuck wants to find a highly rated pizzeria
// Jenna and Zelda want to find a good restaurant in a certain price range
// Mark wants to find a place to get coffee for one.
// Mily and Sahra are looking for a good bar in the area
// Derick and Dale are looking for the cheapest bar in their town
// André is trying to figure out how many restaurants are in his zipcode
// Bill is tired of searching for restaurants on his map app only to have that force him out of that app and into another to view images and so is protesting searching for restaurants on it due to personal moral qualms.
// Hilda is in charge of finding a dinner location for her group
// Hans is so hipster that he only uses obscure non mainstream apps to find the best hip undiscovered food joints.
// May,  June, and April are trying to find out which café has the most reviews
// Mark works for Zomato and needs to search for the number of restaurants Zomato has registered by city
// Jerry just wants a place that delivers right now.

const apiQuery = {
    url: 'https://developers.zomato.com/api/v2.1',
    
    citySearch: async (locationVar) =>{
        let methodURL = this.url + `/cities?q=${locationVar}`
        let searchCity = await fetch(methodURL,{
            method: 'GET',
            headers: { 'user-key': Z_CONNECT}
        }).then()
    },

    cuisinesSearch: async (cityID) =>{
        let methodURL = this.url + `/cuisines?city_id=${cityID}`
        let searchCity = await fetch(methodURL,{
            method: 'GET',
            headers: { 'user-key': Z_CONNECT}
        }).then()
    },

    categoriesSearch: async () =>{
        let methodURL = this.url + `/categories`
        let searchCity = await fetch(methodURL,{
            method: 'GET',
            headers: { 'user-key': Z_CONNECT}
        }).then()
    },

    establishmentsSearch: async (cityID) =>{
        let methodURL = this.url + `/establishments?city_id=${cityID}`
        let searchCity = await fetch(methodURL,{
            method: 'GET',
            headers: { 'user-key': Z_CONNECT}
        }).then()
    },

    locationsSearch: async (locationVar) =>{
        let methodURL = this.url + `/locations?query=${locationVar}`
        let searchCity = await fetch(methodURL,{
            method: 'GET',
            headers: { 'user-key': Z_CONNECT}
        }).then()
    },

    location_detailsSearch: async (entityID) =>{
        let methodURL = this.url + `/location_details?entity_id=${entityID}`
        let searchCity = await fetch(methodURL,{
            method: 'GET',
            headers: { 'user-key': Z_CONNECT}
        }).then()
    },

    testImport: () =>{
        console.log('Zomato Connect .JS has been imported / is working')
    },
}

export {ApiQuery}