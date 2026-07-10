const animated = document.querySelectorAll("[data-animate]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

animated.forEach((item) => observer.observe(item));

const repoGrid = document.getElementById("repo-grid");

async function loadRepos() {
  if (!repoGrid) return;

  try {
    const response = await fetch("https://api.github.com/users/Tmomani11/repos?sort=updated&per_page=100");
    if (!response.ok) return;
    const repos = await response.json();
    console.log('fetched repo names:', repos.map(r => r.name));
    const allowed = ['Veryra-WMS', 'Robotics-project CharpointFIndCharger'];
    const usefulRepos = repos.filter(r => allowed.includes(r.name));

    if (!usefulRepos.length) return;

    repoGrid.innerHTML = usefulRepos.map((repo) => {
      const description = repo.description || "Public project repository.";
      const language = repo.language ? `<span>${repo.language}</span>` : "";
      return `
        <article class="repo-card">
          <h3><a href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a></h3>
          <p>${description}</p>
          ${language}
        </article>
      `;
    }).join("");
  } catch (error) {
    repoGrid.dataset.github = "fallback";
  }
}

loadRepos();

const robotVideo = document.querySelector('.robot-demo');
if (robotVideo) {
  const vo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) robotVideo.play().catch(() => {});
      else robotVideo.pause();
    });
  }, { threshold: 0.5 });
  vo.observe(robotVideo);
}
