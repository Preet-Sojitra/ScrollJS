// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date-recent');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function(){
    // linksContainer.classList.toggle('show-links'); //This method works but fails when one or more links added because it won't show other links as we have hardcoded the height
        
        // This method is for dynamic adding
    const containerHeight = linksContainer.getBoundingClientRect().height; //.height is used to get only height if we don't use that it will give all other data also like width and all that along with height
    // console.log(containerHeight);
    const linksHeight = links.getBoundingClientRect().height; // this gets the height of the links and now if we add more links also then it will be counted and we don't have to change the height in "show-links" class
    // console.log(linksHeight);

    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`;
    }
    else{
        linksContainer.style.height = 0;    
    }

});

// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', function(){
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

    if(scrollHeight > navHeight){
        navbar.classList.add('fixed-nav');
    }
    else{
        navbar.classList.remove('fixed-nav');
    }

    // ********** top link button ************
if(scrollHeight > 500){
    topLink.classList.add('show-link');
}
else{
    topLink.classList.remove('show-link');
}
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function(link){
    link.addEventListener('click', function(e){
        e.preventDefault(); // this prevent the default behaviour of smooth scrolling

        // navigate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1); // slice(1) will get the value of href from index-1 i.e, it won't take the "#"
        // console.log(id);
        const element = document.getElementById(id);
                    // Code before correctly setting the smooth scrolling 
        // let position = element.offsetTop;
        // // console.log(position);
        // window.scrollTo({
        //     left:0, 
        //     top: position,
        // });
        // linksContainer.style.height = 0;

        // Calculating the heights
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav');
        let position = element.offsetTop - navHeight;

        if(!fixedNav){
            position = position - navHeight;    
        }
        if(navHeight > 82){
            position = position + containerHeight;
        }
        window.scrollTo({
            left:0, 
            top: position,
        });
        linksContainer.style.height = 0;
    });
});
