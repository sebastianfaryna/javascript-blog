'use strict';

{

  // Visual Studio Code gdy klikam Shift + Alt + F to dodaje spację po 'function' jak to zmienić? Oraz żeby domyślnie zawijało wiersze, bez klikania Alt + Z?
  const titleClickHandler = function (event) {
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
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks() {

    // remove contents of titleList
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    let html = '';

    // for each article
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      // console.log(article);

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

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);


    /* START LOOP: for every article: */
    for (let article of articles) {
      // console.log('article: ', article);

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      // console.log('tagsWrapper: ', tagsWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags: ', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray: ', articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag: ', tag);

        /* generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> '; //<-- dodałem na końcu spację, bo bez niej tagi są jednym ciągiem liter
        console.log('tagHTML: ', tagHTML);

        /* add generated code to html variable */
        html = html + tagHTML;
        console.log('html: ', html);

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

      /* END LOOP: for every article: */
    }

  }
  generateTags();
}
