const fetchData = async (search, isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${search}`
  );
  const data = await response.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllButton = document.getElementById("show-all-container");

  if (phones.length > 12) {
    showAllButton.classList.remove("hidden", true);
  } else {
    showAllButton.classList.add("hidden", true);
  }

  console.log(isShowAll);

  let phoneData = phones.slice(0, 9);

  if (isShowAll) {
    phoneData = phones;
    showAllButton.classList.add("hidden", true);
  }

  phoneData.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList.add(
      "felx",
      "flex-col",
      "justify-center",
      "items-center",
      "border",
      "border-slate-400",
      "rounded-lg",
      "p-8",
      "text-center",
      "space-y-6"
    );
    phoneCard.innerHTML = `
    <img class="mx-auto" src="${phone.image}" alt="">
    <h3 class="text-[h-clr] text-[25px] font-bold">
    ${phone["phone_name"]}
    </h3>
    <p class="p-clr w-[290px] mx-auto">There are many variations of passages of available, but the
        majority have
        suffered
    </p>
    <h3 class="text-[h-clr] text-[25px] font-bold">$999</h3>
    <button class=" btn text-[20px] text-white font-bold bg-[#0D6EFD] hover:bg-blue-700 px-8">Show
        Details</button>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  fetchData(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingAnimation = document.getElementById("loading-animation");
  if (isLoading) {
    loadingAnimation.classList.remove("hidden", true);
  } else {
    loadingAnimation.classList.add("hidden", true);
  }
};

const showAll = () => {
  handleSearch(true);
};

fetchData();
