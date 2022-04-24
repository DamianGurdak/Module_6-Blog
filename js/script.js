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
};

const links = document.querySelectorAll(".titles a");

for (let link of links) {
	link.addEventListener("click", titleClickHandler);
}
