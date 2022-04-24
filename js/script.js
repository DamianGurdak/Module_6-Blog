"use strict";

const titleClickHandler = function (event) {
	event.preventDefault();
	const clickedElement = this; //guzik
	console.log("Link was clicked!");
	console.log("event:", event);

	/* 1.[DONE] remove class 'active' from all article links  */

	const activeLinks = document.querySelectorAll(".titles a.active");

	for (let activeLink of activeLinks) {
		activeLink.classList.remove("active");
	}

	/* 2.[DONE] add class 'active' to the clicked link */

	console.log("clickedElement:", clickedElement);

	clickedElement.classList.add("active");

	/* 3.[DONE] remove class 'active' from all articles */

	const activeArticles = document.querySelectorAll(".posts article.active");

	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove("active");
	}

	/* 4.[DONE] get 'href' attribute from the clicked link */

	const articleSelector = clickedElement.getAttribute("href").substring(1);
	console.log("articleSelector:", articleSelector);

	/* 5.[IN RPOGRESS] find the correct article using the selector (value of 'href' attribute) */

	const targetArticle = document.querySelector(
		// "article[id=" + articleSelector + "]"
		`article[id=${articleSelector}]`
	);
	console.log("targerArticle:", targetArticle);

	/* 6.[IN PROGRESS] add class 'active' to the correct article */

	targetArticle.classList.add("active");
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};

const optArticleSelector = ".post", //artykół
	optTitleSelector = ".post-title", // tytuł artykółu
	optTitleListSelector = ".titles"; // tytuły linków

function generateTitleLinks() {
	/* 7.[IN PROGRESS] remove contents of titleList */
	function clearMessages() {
		document.querySelector(optTitleListSelector).innerHTML = "";
	}
	clearMessages(); // ta funkja nie powiina byc w 7
	const titleList = document.querySelector(optTitleListSelector);

	/* 8.[IN PROGRESS] for each article */

	const articles = document.querySelectorAll(".post");
	console.log(articles);
	for (let article of articles) {
		/* 9.[IN PROGRESS] get the article id */
		const articleId = article.getAttribute("id");
		console.log("articleiD", articleId);

		/* 10.[IN PROGRESS] find the title element */
		/* 11.[IN PROGRES] get the title from the title element */
		const articleTitle = article.querySelector(optTitleSelector).innerHTML; // miałobyc  article w przykładzie
		/* 12.[] create HTML of the link */
		const linkHTML =
			// '<li><a href="#' +
			// articleId +
			// '"><span>' +
			// articleTitle +
			// "</span></a></li>";

			`<li><a href=#${articleId}><span>${articleTitle}</span></a></li>`;
		console.log(linkHTML);

		/* 13.[] insert link into titleList */
		titleList.innerHTML = titleList.innerHTML + linkHTML;
	}
}

generateTitleLinks();

const links = document.querySelectorAll(".titles a");

for (let link of links) {
	link.addEventListener("click", titleClickHandler);
}

fbgerb;
console.log("dupa");
