const specs = {
  title: "Carbon Collective",
  creator: "Mike Carbone"
}

export function getDocTitle(str) {
  return `${str.toUpperCase()} | ${specs.title}`
}