const API_URL = "https://www.swapi.tech/api/";
const CSS_FOLDER = "css";
const cssPromises = {};
const appContainer = document.getElementById("app-sw");

function loadResource(src) {
  // JavaScript модули
  if (src.endsWith(".js")) {
    return import(src);
  }
  // СSS файлы
  if (src.endsWith(".css")) {
    if (!cssPromises[src]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener("load", resolve());
      });
      document.head.append(link);
    }

    return cssPromises[src];
  }
  // Данные сервера
  return fetch(src).then((res) => res.json());
}

function allPromise(arr) {
  return Promise.all(arr.map((src) => loadResource(src)));
}

function loadAndRenderHomePage() {
  const titleName = "Star Wars";

  allPromise([
    "./home-page.js",
    `${API_URL}films`,
    `${CSS_FOLDER}/normalize.css`,
    `${CSS_FOLDER}/style.css`,
  ]).then(([modulePage, data]) => {
    data.result.sort((a, b) => {
      if (a.properties.episode_id < b.properties.episode_id) return -1;
    });

    appContainer.append(
      modulePage.render(data.result, titleName, eventClickLink)
    );
  });
}

function loadAndRenderFilmPage(filmNumber) {
  loadResource(`${API_URL}films/${filmNumber}`).then((data) => {
    const titleName = data.result.properties.title;

    Promise.all([
      Promise.all(
        [data.result.properties.planets, data.result.properties.species].map(
          (res) => allPromise(res)
        )
      ),
      allPromise([
        "./films-page.js",
        `${CSS_FOLDER}/normalize.css`,
        `${CSS_FOLDER}/style.css`,
      ]),
    ]).then(([additionallyArr, [modulePage]]) => {
      appContainer.append(
        modulePage.render(
          data.result,
          titleName,
          additionallyArr,
          eventClickLink
        )
      );
    });
  });
}

function eventClickLink(e) {
  e.preventDefault();
  history.pushState(null, "", e.currentTarget.href);
  selectRender();
}

function selectRender() {
  const searchParams = new URLSearchParams(location.search);
  const serialNumber = searchParams.get("serialNumber");

  appContainer.innerHTML = "";

  if (serialNumber) {
    loadAndRenderFilmPage(serialNumber);
  } else {
    loadAndRenderHomePage();
  }
}

window.addEventListener("popstate", () => {
  selectRender();
});

selectRender();
