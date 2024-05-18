function createSubtitle(text) {
  const subtitle = document.createElement("h2");
  subtitle.classList.add(
    "title",
    "title_yellow",
    "title_small",
    "app-sw__subtitle"
  );
  subtitle.textContent = text;

  return subtitle;
}

function renderUl(renderArr, nameBlock, parentBlock) {
  const list = document.createElement("ul");
  list.classList.add("list-reset", nameBlock, `${parentBlock}__list`);

  for (const renderElement of renderArr) {
    const li = document.createElement("li");
    li.classList.add("text", `${nameBlock}__item`);
    li.textContent = renderElement.result.properties.name;

    list.append(li);
  }

  return list;
}

export function render(data, titleName, additionallyArr, eventClickLink) {
  document.title = titleName;

  const container = document.createElement("div");
  container.classList.add("container", "app-sw__container");

  const title = document.createElement("h1");
  title.classList.add("title", "title_yellow", "app-sw__title");
  title.textContent = `${titleName} - episode ${data.properties.episode_id}`;

  const backLink = document.createElement("a");
  backLink.classList.add("link", "link_btn", "app-sw__link");
  backLink.href = "index.html";
  backLink.textContent = "Back to episodes";
  backLink.addEventListener("click", eventClickLink);

  const episodeDesc = document.createElement("p");
  episodeDesc.classList.add("text", "app-sw__desc");
  episodeDesc.textContent = data.properties.opening_crawl;

  const planetsTitle = createSubtitle("Planets");
  const planetsList = renderUl(additionallyArr[0], "planets", "app-sw");
  const speciesTitle = createSubtitle("Species");
  const speciesList = renderUl(additionallyArr[1], "species", "app-sw");

  container.append(
    title,
    backLink,
    episodeDesc,
    planetsTitle,
    planetsList,
    speciesTitle,
    speciesList
  );

  return container;
}
