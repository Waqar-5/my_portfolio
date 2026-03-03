function redirectCategory(category) {
  switch(category) {
    case "all":
      window.location.href = "categories/categories_all.html";
      break;
       case "Little advanced":
      window.location.href = "/categories_simple_advanced.html";
      break;
    case "simple":
      window.location.href = "categories/categories_simple.html";
      break;
    case "frontend":
      window.location.href = "categories/categories_frontend.html";
      break;
    case "fullstack":
      window.location.href = "categories/categories_fullstack.html";
      break;
    case "ai":
      window.location.href = "categories/categories_ai.html";
      break;
    default:
      window.location.href = "categories/categories_all.html";
  }
}
