function openTab(tabName) {
    // Hide all tab content and main page
    var allContents = document.querySelectorAll('.tab-content, #main-page');
    for (var i = 0; i < allContents.length; i++) {
        allContents[i].style.display = "none";
    }

    // Show the selected tab content or main page
    document.getElementById(tabName).style.display = "block";

    // Close the dropdown menu
    document.getElementById("myDropdown").classList.remove("show");
}

function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


// Add this JavaScript code to handle the automatic sliding

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slider-content");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); // Change slide every 3 seconds (adjust as needed)
}

// Add this JavaScript code to handle tab switching

document.addEventListener('DOMContentLoaded', function () {
    // Initial setup
    showTab('main-page');

    // Event listener for dropdown change
    var dropdown = document.getElementById('tab-selector');
    dropdown.addEventListener('change', function () {
        var selectedTab = dropdown.value;
        showTab(selectedTab);
    });
});

function showTab(tabId) {
    // Hide all tabs
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }

    // Show the selected tab
    var selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
}
