const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API setup
const count = 30;
const apiKey = 'qkD5DRqTsNSh6rqSfjdpcQI1aV47R1caxxMIfPKpuNQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//checking if all the images were loaded before recalling the getPhots function
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

//create elements for links & photos, addind to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) =>{
        //create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        //create <img> for new photos
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.raw);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //put the image inside the anchor element, then puting both inside the image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//Get Photos from the API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
        console.log('something wrong with the api probably, request error :(');
    }
}

//infinite scroll functionality
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();