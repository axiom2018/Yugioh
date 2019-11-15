class CardManager 
{
    constructor() {
        // // Load in images.
        // let cardImages = [];
        // cardImages[0] = "images/darkmagician.png";
        // cardImages[1] = "images/blueeyes.png";

        // console.log("The array: " + cardImages);

        // // Use construct to prevent array from being destroyed.
        // this.AddFieldQuerysToArray = function(field, query) {
        //     cardImages.push(field);
        // }

        // // Loop and log them all.
        // cardImages.forEach(function(element) {
        //     console.log(element);
        // });

        // Save the image variable we'll use to get element by id.
        let myImage = null;

        // Save image index.
        let imageIndex = 0;

        // Give load complete message.
        console.log("Loading of card images completed!");
    }

    SetId(id) {
        // Load the image by id.
        this.myImage = document.getElementById(id);

        // Image index, save it to the next one.
        this.imageIndex = 1;
    }

    ChangeImage() {
        // Load images.
        let cardImages = [];
        cardImages[0] = "images/darkmagician.png";
        cardImages[1] = "images/blueeyes.png";

        // Random entry from array.
        var rand = cardImages[Math.floor(Math.random() * cardImages.length)];

        // Change the attribute.
        this.myImage.setAttribute("src", rand);
    }
}

// Declare object.
myCardManager = new CardManager;
