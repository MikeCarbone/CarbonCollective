const specs = {
  title: "Carbon Collective",
  creator: "Mike Carbone"
}

export function getDocTitle(str) {
  return `${str.toUpperCase()} | ${specs.title}`
}

export function setMetas(params){
  const dynamicMetas = document.querySelectorAll('[data-js-meta]');

  if (params.isHome === true){
    params.slug = "";
    params.title = "HOME |";
    params.imageUrl = "/apple-touch-icon.png"
  } else if (params.isDefault === true){
    params.slug = "";
    params.title = "";
    params.imageUrl = "/apple-touch-icon.png"
  } else {
    params.slug = `cc/${params.slug}`;
    params.title = `${params.title.toUpperCase()} |`;
    if (!params.imageUrl){
      params.imageUrl = "/apple-touch-icon.png"
    }
  }

  if (dynamicMetas.length !== 0){
    dynamicMetas.forEach(el => {
      const metaType = el.getAttribute('data-js-meta').split('-')[1];

      switch(metaType) {
        case 'title':
          el.setAttribute('content', `${params.title}Carbon Collective`);
          break;
        
        case 'url':
          el.setAttribute('content', `https://www.carboncollective.cc/${params.slug}`);
          break;

        case 'img':
          el.setAttribute('content', `${params.imageUrl}`);
          break;
        
        default:
          break;
      }

    });
  }
}