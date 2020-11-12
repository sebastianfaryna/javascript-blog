'use strict';

/* SZABLONY HANDLEBARS */
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tags-cloud-link').innerHTML),
  authorsListLink: Handlebars.compile(document.querySelector('#template-authors-list-link').innerHTML)
};


/* SETTINGS. Prefiks opt - "options" */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 4,
  optAuthorsListSelector = '.authors.list';

/* kliknie w artykuły po lewej */
const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;

  // remove class 'active' from all article links  //
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  // add class 'active' to the clicked link //
  clickedElement.classList.add('active');

  // remove class 'active' from all articles //
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  // get 'href' attribute from the clicked link //
  const articleSelector = clickedElement.getAttribute('href');

  // find the correct article using the selector (value of 'href' attribute) //
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};

/* Generowanie linków artykułów */
function generateTitleLinks(customSelector = '') {

  // remove contents of titleList
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  // for each article
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {

    // get the article id and save it to the const
    const articleId = article.getAttribute('id');

    // find the title element & get the title from the title element
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // create HTML of the link and save it to the const
    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {
      id: articleId,
      title: articleTitle
    };
    const linkHTML = templates.articleLink(linkHTMLData);

    // insert html link into titleList
    html = html + linkHTML;

  }

  titleList.innerHTML = html;

  // kliknięcia w linki
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

/* PARAMETRY TAGÓW */
function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
      // console.log(tag + ' is used ' + tags[tag] + ' MAX times');
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
      // console.log(tag + ' is used ' + tags[tag] + ' MIN times');
    }
  }

  return params;
}

/* OBLICZANIE NUMERU KLASY TAGU
alternatywnie: classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 ); */
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return classNumber;
}

function generateTags() {

  /* create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      // const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      const linkTagData = {
        tag: tag
      };
      const tagHTML = templates.tagLink(linkTagData);

      /* add generated code to html variable */
      html = html + tagHTML;

      /* check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /*  add generated code to allTags object ZLICZANIE ILOŚCI WYSTĄPIEŃ TAGU*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  // console.log('MAX i MIN tagsParams:', tagsParams);

  /* create variable for store all links HTML code */
  // let allTagsHTML = ''; /* po dodaniu szablonów usuwamy tą linię */
  const allTagsData = {
    tags: []
  };

  /* START LOOP: for each tag in allTags: */
  for (let tag in allTags) {

    /* generate code of a link and add it to allTagsHTML */

    //const tagLinkHTML = '<li>' + '<a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '"' + 'href="#tag-' + tag + '"' + '>' + tag + '</a>' + ' (' + allTags[tag] + ')' + '</li>'; //z licznikiem wystąpień tagów

    // const tagLinkHTML = '<li>' + '<a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '"' + 'href="#tag-' + tag + '"' + '>' + tag + '</a></li>';

    // allTagsHTML += tagLinkHTML; /* po dodaniu szablonów usuwamy tą linię */
    allTagsData.tags.push({
      tag: tag,
      tagsCount: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    /* END LOOP: for each tag in allTags: */
  }

  /* add HTML from allTagsHTML to tagList */
  // tagList.innerHTML = allTagsHTML; /* po dodaniu szablonów usuwamy tą linię */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData: ', allTagsData);

}

generateTags();

/*      AUTORZY ARTYKUŁU      */
function generateAuthors() {

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  // console.log('allAuthors', allAuthors);

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP for every article */
  for (let article of articles) {

    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */
    // const authorHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

    const authorHTMLData = {
      author: articleAuthor
    };
    const authorHTML = templates.authorLink(authorHTMLData);

    /* add generated code to html variable */
    html = html + authorHTML;

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find authors container in the right column */
  const authorsList = document.querySelector(optAuthorsListSelector);

  /* variable for all authorHtml */
  // let html = ''; /* <-- po dodaniu szablonów usuwamy tą linię */
  const allAuthorsData = {
    authors: []
  };

  /* START LOOP for each article's author in allAuthor */
  for (let articleAuthor in allAuthors) {
    // const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>' + '   (' + allAuthors[articleAuthor] + ')</li>';

    allAuthorsData.authors.push({
      author: articleAuthor,
      count: allAuthors[articleAuthor]
    });

    //  console.log('czy linki się generują?', authorLinkHTML);
    //  html = html + authorLinkHTML;

    /* END LOOP */
  }

  authorsList.innerHTML = templates.authorsListLink(allAuthorsData);

}
generateAuthors();

/*    KLINIĘCIE W TAG   */
function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {

    /* remove class active */
    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* add class active */
    tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {

  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let linkToTag of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

/* KLIKNIĘCIE W AUTORA */

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authors = document.querySelectorAll('a[href^="#author-"');

  for (let author of authors) {
    author.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
