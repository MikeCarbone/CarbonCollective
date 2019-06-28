const specs = {
  title: "Carbon Collection",
  creator: "Mike Carbone"
}

export function getDocTitle(str) {
  return `${str.toUpperCase()} | ${specs.title}`
}