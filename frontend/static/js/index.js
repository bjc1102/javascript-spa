import Home from "./Home.js";
import Posts from "./Posts.js";
import Settings from "./Setting.js";
import NotFound from "./NotFound.js";
import "./index.css";

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

async function router() {
  const routes = [
    { path: "/", view: Home },
    { path: "/posts", view: Posts },
    { path: "/settings", view: Settings },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });

  //주어진 라우터가 있는지 확인 없으면 undefined 리턴
  //있다면 일치하는 첫 번째 값을 리턴해준다.
  //따라서 현재 라우터와 일치하는 값을 리턴해준다
  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  // 404페이지로 이동하기
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true,
    };
    const page = new NotFound();
    document.querySelector("#root").innerHTML = await page.getHtml();
  } else {
    const page = new match.route.view();
    document.querySelector("#root").innerHTML = await page.getHtml();
  }

  console.log(history);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      router();
    }
  });
  router();
});

window.addEventListener("popstate", () => {
  router();
});
