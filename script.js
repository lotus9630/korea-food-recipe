const mealsEl = document.querySelector("section.meals");
const formEl = document.querySelector("nav.search form");
const searchEl = document.querySelector("nav.search form input");
const mealEl = document.querySelector("section.meals .meal");
const singleMealEl = document.querySelector("article.single-meal");

async function searchMeal(e) {
  e.preventDefault();
  let meals = await fetch("레시피+기본정보_20210126154139.json")
    .then((res) => res.json())
    .then((res) => res.data);

  mealsEl.innerHTML = meals
    .filter((meal) => meal.RECIPE_NM_KO.includes(searchEl.value))
    .map(
      (meal) => `
      <div class="meal" id="${meal.RECIPE_ID}">
        <img
          class="meal-img"
          id="${meal.RECIPE_ID}"
          src="${meal.IMG_URL}"
          alt="${meal.RECIPE_NM_KO}"
        />
          <div class="meal-name">${meal.RECIPE_NM_KO}</div>
        </div>
      `
    )
    .join("");
}

async function ShowAllMeal() {
  let meals = await fetch("./레시피+기본정보_20210126154139.json")
    .then((res) => res.json())
    .then((res) => res.data);

  mealsEl.innerHTML = meals
    .map(
      (meal) => `
    <div class="meal" id="${meal.RECIPE_ID}">
        <img
          class="meal-img"
          id="${meal.RECIPE_ID}"
          src="${meal.IMG_URL}"
          alt="${meal.RECIPE_NM_KO}"
        />
        <div class="meal-name">${meal.RECIPE_NM_KO}</div>
      </div>
    `
    )
    .join("");
}

async function ShowMealInfo(e) {
  e.preventDefault();

  // 음식 이미지 클릭 시
  if (e.target.classList[0] == "meal-img") {
    console.log(e.target);
    console.log(e.target.id);
    // 음식 이름 입력
    let mealID = e.target.id;
    let mealImg = e.target.src;
    let mealName = e.target.alt;

    singleMealEl.innerHTML = `
     <div class="single-meal-name">
        <img
          class="meal-img"
          src="${mealImg}"
          alt="${mealName}"
        />
        <h2>${mealName}</h2>
      </div>
    `;

    // 음식 재료 입력
    let gredients = await fetch("레시피+재료정보_20210126154135.json")
      .then((res) => res.json())
      .then((res) => res.data);
    gredients = gredients.filter((gredient) => gredient.RECIPE_ID == mealID);
    gredients = gredients
      .map(
        (gredient) =>
          `<div class="gredient">${gredient.IRDNT_NM} - ${gredient.IRDNT_CPCTY} </div>`
      )
      .join("");

    singleMealEl.innerHTML += `
    <div class="single-meal-gredients">
      <h3>음식 재료 목록</h3>
      ${gredients}
    </div>`;

    // 음식 레시피 입력
    let recipes = await fetch("레시피+과정정보_20210126154133.json")
      .then((res) => res.json())
      .then((res) => res.data);

    recipes = recipes.filter((recipe) => recipe.RECIPE_ID == mealID);
    recipes = `
    <div class="single-meal-recipe">
      <h3>음식 레시피</h3>
      <ol>
        ${recipes.map((recipe) => `<li>${recipe.COOKING_DC}</li>`).join("")}
      </ol>
    </div>`;
    singleMealEl.innerHTML += recipes;

    // 음식 클래스에 Show 추가
    singleMealEl.classList.add("show");
  }
}

// Event listeners
formEl.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", ShowMealInfo);

ShowAllMeal();
