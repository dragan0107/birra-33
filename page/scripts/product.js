let headerSource = document.getElementById('header-template').innerHTML,
  footerSource = document.getElementById('footer-template').innerHTML;
let tempHeader = Handlebars.compile(headerSource),
  tempFooter = Handlebars.compile(footerSource);

document.getElementById('header-output').innerHTML = tempHeader();
document.getElementById('footer-output').innerHTML = tempFooter();
