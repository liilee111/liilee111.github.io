(() => {
  const jsDir = new URL(".", document.currentScript.src);
  const rootDir = new URL("../../", jsDir); 

  fetch(new URL("navbar.html", rootDir))
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load navbar.html (${res.status})`);
      return res.text();
    })
    .then((html) => {
      const host = document.getElementById("navbar");
      if (!host) throw new Error('Missing <div id="navbar"></div> on this page.');

      host.innerHTML = html;
      document.dispatchEvent(new Event("navbar:loaded"));
    })
    .catch((err) => console.error("navbar.js error:", err));
})();
