async function loadProjects() {
  const res = await fetch("../data/projects.json")
  const data = await res.json();
  return data.projects;
}


function projectItemHTML(p) {
  const fullDescriptionHTML = p.fullDescription
    .split("\n\n")
    .map(text => `<p>${text}</p>`)
    .join("");

  const imageClass = p.imageSize
    ? `project__image--${p.imageSize}`
    : "project__image--medium";

  const imageHTML = p.image
    ? `
      <div class="project__image ${imageClass}">
        <img src="${p.imageSrc}" alt="${p.title}">
      </div>
    `
    : "";

  return `
    <div class="project">
      <h3>${p.title}</h3>
      <p>${p.shortDescription}</p>

      <details>
        <summary>Details</summary>
        ${fullDescriptionHTML}
        ${imageHTML}
      </details>
    </div>
  `;
}



function renderList(targetId, projects) {
  const el = document.getElementById(targetId);
  el.innerHTML = projects.map(projectItemHTML).join("");
}

loadProjects().then((projects) => {
  const programming = projects.filter(p => p.category === "Programming");
  const physics = projects.filter(p => p.category === "Computational Physics");

  renderList("programming-featured", programming.filter(p => p.featured));
  renderList("programming-more", programming.filter(p => !p.featured));

  renderList("physics-featured", physics.filter(p => p.featured));
  renderList("physics-more", physics.filter(p => !p.featured));
});


