const routes = {};

// REGISTER PARTIALS
async function loadPartials() {
  const partials = ["nav-main", "nav-back"];
  for (const p of partials) {
    const res = await fetch(`/templates/partials/${p}.hbs`);
    const text = await res.text();
    Handlebars.registerPartial(p, text);
  }
}

function route(path, template, controller) {
  routes[path] = { template, controller };
}

function matchRoute(path) {
  // exact match first
  if (routes[path]) return { path, params: {}, def: routes[path] };

  // support patterns like /result/:code
  for (const pattern of Object.keys(routes)) {
    const pParts = pattern.split("/").filter(Boolean);
    const aParts = path.split("/").filter(Boolean);
    if (pParts.length !== aParts.length) continue;

    const params = {};
    let ok = true;

    for (let i = 0; i < pParts.length; i++) {
      const pp = pParts[i];
      const ap = aParts[i];
      if (pp.startsWith(":")) params[pp.slice(1)] = decodeURIComponent(ap);
      else if (pp !== ap) ok = false;
    }

    if (ok) return { path: pattern, params, def: routes[pattern] };
  }

  return null;
}

async function render(activePath, data = {}) {
  const m = matchRoute(activePath);
  if (!m) return;

  const { def, params } = m;

  const res = await fetch(`/templates/pages/${def.template}.hbs`);
  const source = await res.text();
  const tpl = Handlebars.compile(source);

  document.getElementById("app").innerHTML = tpl({ ...data, params });
  def.controller?.({ ...data, params, path: activePath });
}

function navigate(path, data = {}) {
  if (!path.startsWith("/")) path = "/" + path;
  sessionStorage.__routeData = JSON.stringify(data);

  if (location.hash !== "#" + path) {
    location.hash = path;
  } else {
    render(path, data);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadPartials();
  const path = location.hash.replace("#", "") || "/";
  const data = JSON.parse(sessionStorage.__routeData || "{}");
  render(path, data);
});

window.addEventListener("hashchange", () => {
  const path = location.hash.replace("#", "") || "/";
  const data = JSON.parse(sessionStorage.__routeData || "{}");
  render(path, data);
});
