console.log("RwaNest Loaded Successfully");

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const purposeFilter = document.getElementById("purposeFilter");
const bedroomFilter = document.getElementById("bedroomFilter");
const sortFilter = document.getElementById("sortFilter");
const resetButton = document.getElementById("resetButton");

const propertyGrid = document.getElementById("propertyGrid");
const resultCount = document.getElementById("resultCount");

const cards = Array.from(document.querySelectorAll(".card"));


function filterProperties() {

    const searchText = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const selectedPurpose = purposeFilter.value;
    const selectedBedrooms = bedroomFilter.value;

    let visibleCards = [];


    cards.forEach(card => {

        const name = card.dataset.name.toLowerCase();
        const location = card.dataset.location.toLowerCase();
        const type = card.dataset.type;
        const purpose = card.dataset.purpose;
        const bedrooms = Number(card.dataset.bedrooms);


        const matchesSearch =
            name.includes(searchText) ||
            location.includes(searchText);


        const matchesType =
            selectedType === "all" ||
            type === selectedType;


        const matchesPurpose =
            selectedPurpose === "all" ||
            purpose === selectedPurpose;


        const matchesBedrooms =
            selectedBedrooms === "all" ||
            bedrooms >= Number(selectedBedrooms);


        if (
            matchesSearch &&
            matchesType &&
            matchesPurpose &&
            matchesBedrooms
        ) {

            card.style.display = "block";
            visibleCards.push(card);

        } else {

            card.style.display = "none";

        }

    });


    // SORTING

    if (sortFilter.value === "low") {

        visibleCards.sort((a, b) => {
            return Number(a.dataset.price) - Number(b.dataset.price);
        });

    }

    if (sortFilter.value === "high") {

        visibleCards.sort((a, b) => {
            return Number(b.dataset.price) - Number(a.dataset.price);
        });

    }


    // Put cards back in sorted order

    visibleCards.forEach(card => {
        propertyGrid.appendChild(card);
    });


    // RESULT COUNT

    resultCount.textContent =
        `${visibleCards.length} ${visibleCards.length === 1 ? "Property" : "Properties"} Found`;

}


// FILTER EVENTS

searchInput.addEventListener("input", filterProperties);

typeFilter.addEventListener("change", filterProperties);

purposeFilter.addEventListener("change", filterProperties);

bedroomFilter.addEventListener("change", filterProperties);

sortFilter.addEventListener("change", filterProperties);


// RESET BUTTON

resetButton.addEventListener("click", () => {

    searchInput.value = "";
    typeFilter.value = "all";
    purposeFilter.value = "all";
    bedroomFilter.value = "all";
    sortFilter.value = "default";

    filterProperties();

});


// RUN ON PAGE LOAD

filterProperties();
