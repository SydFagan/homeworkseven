function toggleMobileMenu(menu){menu.classList.toggle("open");}
$("#hamburger-icon").on("click", () => {
  $("#hamburger-icon").toggleClass("open");
  const expanded = $("#hamburger-icon").hasClass("open");
  $("#hamburger-icon").attr("aria-expanded", expanded ? "true" : "false");
});
$(document).on("click", ".mobile-menu a", function(){
  $("#hamburger-icon").removeClass("open").attr("aria-expanded","false");
});
