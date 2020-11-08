'use strict';

{

  // Visual Studio Code gdy klikam Shift + Alt + F to dodaje spację po 'function' jak to zmienić? Oraz żeby domyślnie zawijało wiersze, bez klikania Alt + Z?
  const titleClickHandler = function(event) {
    event.preventDefault(); //zmienia domyślne ustawienia 'event' - w tym przypadku adres url strony NIE będzie się zmieniał wraz z klikaniem w artykuły, dlatego jest przed deklaracją zmiennej/stałej poniżej
    const clickedElement = this;
    // console.log('Link was clicked!');
    // console.log(event);

    // remove class 'active' from all article links  //
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
      // console.log(activeLink);
    }

    // add class 'active' to the clicked link //
    clickedElement.classList.add('active');
    // console.log('add class ACTIVE:', clickedElement);

    // remove class 'active' from all articles //
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
      // console.log(activeArticle);
    }

    // get 'href' attribute from the clicked link //
    const articleSelector = clickedElement.getAttribute('href');
    // console.log(articleSelector);

    // find the correct article using the selector (value of 'href' attribute) //
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
    // console.log('FIND href targetArticle', targetArticle);
  };

  // Zapisanie ustawień skryptu w stałych. Prefiks opt- znaczy "options".
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';

  function generateTitleLinks(customSelector = '') {

    // remove contents of titleList
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    let html = '';

    // for each article
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {
      console.log('CUSTOM SELECTOR', optArticleSelector + customSelector);

      // get the article id and save it to the const
      const articleId = article.getAttribute('id');
      // console.log('articleId:', articleId);

      // find the title element & get the title from the title element
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      // console.log('articleTitle:', articleTitle);

      // create HTML of the link and save it to the const
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      // console.log(linkHTML);

      // insert html link into titleList
      html = html + linkHTML;

    }

    titleList.innerHTML = html;

    // kliknięcia w linki
    const links = document.querySelectorAll('.titles a');
    // console.log('links:', links);
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  function generateTags() {

    // /* [NEW] create a new variable allTags with an empty array */
    // let allTags = [];

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
        const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

        /* add generated code to html variable */
        html = html + tagHTML;

        // /* [NEW] check if this link is NOT already in allTags */
        // if (allTags.indexOf(linkHTML) == -1) {
        //   /* [NEW] add generated code to allTags array */
        //   allTags.push(linkHTML);
        // }

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

      /* END LOOP: for every article: */
    }

    // /* [NEW] find list of tags in right column */
    // const tagList = document.querySelector('.tags');

    // /* [NEW] add html from allTags to tagList */
    // tagList.innerHTML = allTags.join(' ');
    // console.log('allTags:', allTags);
  }
  generateTags();


  /*      AUTORZY ARTYKUŁU      */

  function generateAuthors() {

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP for every article */
    for (let article of articles) {

      /* find authors wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      // console.log('AUTOR:', articleAuthor);

      /* generate HTML of the link */
      const tagHTML = 'by <a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = tagHTML;

      /* END LOOP: for every article: */
    }
  }
  generateAuthors();


  /*    KLINIĘCIE W TAG   */

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    //console.log('CZY BYŁ KLIK W TAG?');

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

}
