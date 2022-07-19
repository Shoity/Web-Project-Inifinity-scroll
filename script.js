const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const imagesCount = 5;
const apiKey = 'yiLDA5A323wQxLA6tDxNOPjoL4nUwqjT_7QxR3koWDw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesCount}`;


// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log('image loaded')
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready =', ready)
        loader.hidden = true;
    }
}
// Helper function to Set Attributes on DOM Elments
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Creat elements for links & photos, add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    console.log('total images =', totalImages)
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> tag to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create <img> tag to show the photos
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded())
        // Putting <img> tag inside <a> tag and <a> tag inside #image-container element 
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from unsplash API 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error)
    }
}

// Chck to se if scrolling near bottom of page, load mor photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On load
getPhotos();
