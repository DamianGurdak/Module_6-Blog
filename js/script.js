'use strict';

const opts = {
  ArticleSelector: '.post', //artykół
  TitleSelector: '.post-title', // tytuł artykółu
  TitleListSelector: '.titles', // tytuły linków
  ArticleTagsSelector: '.post-tags .list', // wyświtlanie tagów ma koncu każdego atykułu
  ArticleAuthorSelcetor: '.post-author', // nazwa autora
  TagsListSelector: '.tags.list', //odnalezienie listy tagów w prawej kolumnie
  CloudClassCount: '3',
  CloudClassPrefix: ' tag-size- ',
  AuthorsListSelector: '.list.authors',
};

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),

  tagLink: Handlebars.compile(
    document.querySelector('#template-tag-link').innerHTML
  ),

  authorLink: Handlebars.compile(
    document.querySelector('#template-author-link').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-cloud-link').innerHTML
  ),

  listAuthorLink: Handlebars.compile(
    document.querySelector('#template-list-author-link').innerHTML
  ),
};

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');
  // console.log('event:', event);

  /* 1.[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* 2.[DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  // console.log('clickedElement:', clickedElement);

  /* 3.[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* 4.[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href').substring(1);
  // console.log('articleSelector:', articleSelector);

  /* 5.[IN RPOGRESS] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(
    `article[id=${articleSelector}]`
  );
  // "article[id=" + articleSelector + "]" // inny sposób
  // console.log('targerArticle:', targetArticle);

  /* 6.[IN PROGRESS] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = '') {
  /* 7.[IN PROGRESS] remove contents of titleList */
  function clearMessages() {
    document.querySelector(opts.TitleListSelector).innerHTML = '';
  }
  clearMessages();

  const titleList = document.querySelector(opts.TitleListSelector);

  /* 8.[IN PROGRESS] for each article  */
  const articles = document.querySelectorAll(
    opts.ArticleSelector + customSelector
  );
  // console.log(articles);
  // console.log('customSelector:', customSelector);
  // console.log(opts.ArticleSelector);

  let html = '';

  for (let article of articles) {
    /* 9.[IN PROGRESS] get tnpm runne article id */
    const articleId = article.getAttribute('id');
    // console.log('articleiD', articleId);

    /* 10.[IN PROGRESS] find the title element */
    /* 11.[IN PROGRES] get the title from the title element */
    const articleTitle = article.querySelector(opts.TitleSelector).innerHTML;

    /* 12.[] create HTML of the link */
    // const linkHTML = `<li><a href=#${articleId}><span>${articleTitle}</span></a></li>`;

    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    // console.log(linkHTML);

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

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  // console.log(params);

  for (let tag in tags) {
    // console.log(tag + ' is used ' + tags[tag] + ' times');
    // console.log(tag);
    // console.log(tags);
    // console.log(tags[tag]);

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.CloudClassCount - 1) + 1);
  // console.log('tag font-size:', classNumber);
  return classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */ /////////////////////////////////////////
  let allTags = {};
  // console.log(allTags);

  /* 1.[DONE] find all articles */

  const articles = document.querySelectorAll(opts.ArticleSelector);
  // console.log(articles);

  /* 2.[DONE] START LOOP: for every article: */
  for (let article of articles) {
    // console.log(article);
    // console.log(articles);

    /* 3.[DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(opts.ArticleTagsSelector);
    // console.log(tagsWrapper);

    /* 4.[DONE] make html variable with empty string */
    let html = '';

    /* 5.[ IN PROGRESS] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('tagi artykułu:', articleTags);

    /* 6.[] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log('tablica tagów(elemetów):', articleTagsArray);

    /* 7.[] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* 8.[] generate HTML of the link */
      // const linkHTML = `<li><a href=#tag-${tag}>${tag}</a></li>  `;
      // console.log(tag); //kazdy tag osobno
      // console.log(linkHTML);

      const linkHTMLData = { tag: tag };
      const linkHTML = templates.tagLink(linkHTMLData);

      /* 9.[] add generated code to html variable */
      html += linkHTML;

      /* [NEW] check if this link is NOT already in allTags */ /////////////////////////////////////////
      if (!allTags[tag]) {
        /* [NEW] add generated code to allTags array */ /////////////////////////////////////////
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* 10.[] END LOOP: for each tag */
    }

    /* 11.[] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* 12.[] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */ /////////////////////////////////////////
  const tagList = document.querySelector(opts.TagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  // let allTagsHTML = ' '; //juz nam nie potrzebne bo robimU szblony
  // console.log(allTagsHTML);
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */

    // allTagsHTML += tag + ' (' + allTags[tag] + ') ';

    // const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    // console.log('tagLinkHTML:', tagLinkHTML);

    // const tagLinkHTML = `<li><a href="#tag-${tag}" class="tag-size-${calculateTagClass(
    //   allTags[tag],
    //   tagsParams
    // )}"> ${tag} </a></li>`;
    // console.log('tagLinkHTML:', tagLinkHTML);

    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    // const linkHTMLData = { id: articleTags, title: tagList };
    // const linkHTML = templates.articleLink(linkHTMLData);
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////

    // allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  // tagList.innerHTML = allTagsHTML; //allTagsHTML JUZ NIE MMAY
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  // console.log(allTagsData);
}

generateTags();

function tagClickHandler(event) {
  /* [DONE] prevent(zapobiegać) default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  // console.log(this);
  // console.log('clickedElement:', clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href'); //.substring(1);
  // console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  // console.log(tag);

  /* [DONE] find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
  for (let link of activeLinks) {
    /* [DONE] remove class active */
    link.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal(równy) to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */
  for (let taglink of tagLinks) {
    /* [DONE] add class active */
    taglink.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  const links = document.querySelectorAll('.post-tags a');
  // console.log(links);

  /* START LOOP: for each link */

  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

function ganerateAuthors() {
  /* [NEW] create a new variable allTags with an empty object */ /////////////////////////////////////////

  let allAuthors = {};

  /* [DONE] find all authores */
  const articles = document.querySelectorAll(opts.ArticleSelector);
  // console.log(articles);

  /* [DONE] START LOOP: for every autohrs: */
  for (let article of articles) {
    // console.log(article);
    // console.log(articles);

    /* [DONE] find autohres wrapper */
    const author = article.getAttribute('data-author');
    // console.log(author);

    /* [NEW] make html variable with empty string */
    // let html = '';

    const articleAuthorWrapper = article.querySelector(
      opts.ArticleAuthorSelcetor
    );
    // console.log(articleAuthorWrapper);

    /* [NEW] split tags into array */

    /* 7.[] START LOOP: for each tag */

    // console.log(articleAuthorWrapper);
    const authorHTML = `<a href="#author-${author}"> ${author}</a>`;
    // console.log(authorHTML);

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    // const linkHTMLData = { id: author, title: articleAuthorWrapper };
    // const linkHTML = templates.articleLink(linkHTMLData);
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////

    if (!allAuthors[author]) {
      /* [NEW] add generated code to allTags array */ /////////////////////////////////////////
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    /* 11.[] insert HTML of all the links into the tags wrapper */
    articleAuthorWrapper.innerHTML = authorHTML;

    /* 12.[] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */ /////////////////////////////////////////
  const authorList = document.querySelector(opts.AuthorsListSelector);

  // const authorParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  // console.log(allAuthors);
  //
  //
  //
  //
  let allAuthorsHTML = '';
  const listAuthorLink = {authors: []};
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allTagsHTML */

    // allTagsHTML += tag + ' (' + allTags[tag] + ') ';

    // const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    // console.log('tagLinkHTML:', tagLinkHTML);

    const authorLinkHTML = `<li><a href="#author-${author}"> ${author}(${allAuthors[author]})</a></li>`;
    // console.log('tagLinkHTML:', tagLinkHTML);
    console.log('authorLinkHTML:', authorLinkHTML);

//
//
//
    allAuthorsHTML += authorLinkHTML;
    listAuthorLink.authors.push({
      authors: author,
      count: listAuthorLink[author],
      className: calculateTagClass(listAuthorLink[author], xxxx)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  authorList.innerHTML = allAuthorsHTML;
}

ganerateAuthors();

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(this);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */ //?
  const author = href.replace('#author-', '');
  console.log(author);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */

  for (let link of activeLinks) {
    /* remove class active */
    link.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal(równy) to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href=" ' + href + '"]');
  console.log(authorLinks);

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList('active');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

function addClickListenersToAuthors() {
  const links = document.querySelectorAll('.post-author a, .list.authors a');
  // console.log(links);

  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
//cwnefoihn
