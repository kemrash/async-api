export function render(data, titleName, eventClickLink) {
  document.title = titleName;

  const container = document.createElement("div");
  container.classList.add("container", "app-sw__container");

  const title = document.createElement("h1");
  title.classList.add("title", "title_yellow", "title_big", "app-sw__title");
  title.textContent = titleName;

  container.append(title);

  const list = document.createElement("ul");
  list.classList.add("list-reset", "app-sw__list");

  for (const film of data) {
    const item = document.createElement("li");
    item.classList.add("app-sw__item");

    const article = document.createElement("article");
    article.classList.add("film");

    const link = document.createElement("a");
    link.classList.add("link", "film__link");
    link.href = `?serialNumber=${film.uid}`;
    link.addEventListener("click", eventClickLink);

    const desc = document.createElement("span");
    desc.classList.add("text", "film__desc");
    desc.textContent = `Episode ${film.properties.episode_id}`;

    const subtitle = document.createElement("h2");
    subtitle.classList.add(
      "title",
      "title_gray",
      "title_small",
      "film__subtitle"
    );
    subtitle.textContent = film.properties.title;

    link.append(desc, subtitle);
    article.append(link);
    item.append(article);
    list.append(item);
  }
  container.append(list);

  return container;
}
