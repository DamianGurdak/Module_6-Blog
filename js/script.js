'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this; //guzik
  console.log('Link was clicked!');
  console.log('event:', event);

  /* 1.[DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* 2.[DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* 3.[DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* 4.[DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href').substring(1);
  console.log('articleSelector:', articleSelector);

  /* 5.[IN RPOGRESS] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(
    // "article[id=" + articleSelector + "]"
    `article[id=${articleSelector}]`
  );
  console.log('targerArticle:', targetArticle);

  /* 6.[IN PROGRESS] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const optArticleSelector = '.post', //artykół
  optTitleSelector = '.post-title', // tytuł artykółu
  optTitleListSelector = '.titles', // tytuły linków
  optArticleTagsSelector = '.post-tags .list'; // wyświtlanie tagów ma koncu każdego atykułu

function generateTitleLinks(customSelector = '') {
  /* 7.[IN PROGRESS] remove contents of titleList */

  function clearMessages() {
    document.querySelector(optTitleListSelector).innerHTML = '';
  }

  clearMessages();

  const titleList = document.querySelector(
    optTitleListSelector + customSelector
  );

  /* 8.[IN PROGRESS] for each article  */

  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);

  let html = '';

  for (let article of articles) {
    /* 9.[IN PROGRESS] get the article id */

    const articleId = article.getAttribute('id');
    console.log('articleiD', articleId);

    /* 10.[IN PROGRESS] find the title element */
    /* 11.[IN PROGRES] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* 12.[] create HTML of the link */

    const linkHTML = `<li><a href=#${articleId}><span>${articleTitle}</span></a></li>`;
    console.log(linkHTML);

    /* 13.[] insert link into titleList */

    titleList.innerHTML = titleList.innerHTML + linkHTML;
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  //console.log(html);

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* 1.[DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);

  /* 2.[DONE] START LOOP: for every article: */

  for (let article of articles) {
    /* 3.[IN PROGRESS] find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    // console.log(titleList);

    /* 4.[DONE] make html variable with empty string */

    let html = '';

    /* 5.[ IN PROGRESS] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('tagi artykułu:', articleTags);

    /* 6.[] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* 7.[] START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      /* 8.[] generate HTML of the link */

      const linkHTML = `<li><a href=#tag-${tag}>${tag}</a></li>  `;
      console.log(tag);

      /* 9.[] add generated code to html variable */

      html += linkHTML;

      /* 10.[] END LOOP: for each tag */
    }
    /* 11.[] insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

    /* 12.[] END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* [] prevent(zapobiegać) default action for this event */

  event.preventDefault();

  /* [] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href'); //.substring(1);
  console.log(href);

  /* [] make a new constant "tag" and extract tag from the "href" constant */

  //const tag = href.getAttribute(''); //co jest tageim w href
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* [] find all tag links with class active */

  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [] START LOOP: for each active tag link */

  for (let link of activeLinks) {
    /* [] remove class active */

    link.classList.remove('active');

    /* [] END LOOP: for each active tag link */
  }

  /* [] find all tag links with "href" attribute equal(równy) to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [] START LOOP: for each found tag link */

  for (let taglink of tagLinks) {
    /* [] add class active */

    taglink.classList.add('active');

    /* [] END LOOP: for each found tag link */
  }
  /* [] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  const links = document.querySelectorAll('.post-tags a');

  /* START LOOP: for each link */

  for (let link of links) {
    /* add tagClickHandler as event listener for that link */

    link;
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();
