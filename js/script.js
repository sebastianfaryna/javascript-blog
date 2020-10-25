'use strict';

{

  // document.getElementById('test-button').addEventListener('click', function () {
  //   const links = document.querySelectorAll('.titles a');
  //   console.log('links:', links);
  // });

  // Visual Studio Code gdy klikam Shift + Alt + F to dodaje spację po 'function' jak to zmienić? Oraz żeby domyślnie zawijało wiersze, bez klikania Alt + Z?
  const titleClickHandler = function (event) {
    event.preventDefault(); //zmienia domyślne ustawienia 'event' - w tym przypadku adres url strony NIE będzie się zmieniał wraz z klikaniem w artykuły, dlatego jest przed deklaracją zmiennej/stałej poniżej
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    // remove class 'active' from all article links  //
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
      console.log(activeLink);
    }

    // add class 'active' to the clicked link //
    clickedElement.classList.add('active');
    console.log('add class ACTIVE:', clickedElement);

    // remove class 'active' from all articles //
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
      console.log(activeArticle);
    }

    // get 'href' attribute from the clicked link //
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    // find the correct article using the selector (value of 'href' attribute) //
    const targetArticle = document.querySelector(articleSelector);
    console.log('FIND href targetArticle', targetArticle);

    // add class 'active' to the correct article //
    targetArticle.classList.add('active');
  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}