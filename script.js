  // ═══════════════════════════════════════════════
  //  ДАННЫЕ ПРОФИЛЯ — поменяй на свои
  // ═══════════════════════════════════════════════
  const profile = {
    name: "maksim207643",
    bio: "maxbln; maksimbln",
  };

  // ═══════════════════════════════════════════════
  //  ПЛАТФОРМЫ
  //  photo: "" — пусто = иконка-заглушка, или вставь URL картинки
  // ═══════════════════════════════════════════════
  const platforms = [
    {
      type: "telegram", label: "Telegram", icon: "✈️",
      nick: "@maksimbln",
      url: "https://t.me/maksimbln",
      photo: "photo.jpg",
    },
    {
      type: "minecraft", label: "Minecraft", icon: "⛏️",
      nick: "maksim207643",
      uuid: "9661df12-20bd-48d0-84c3-43abc26d6b4c",
      namemc: "https://namemc.com/profile/maksim207643",
      photo: "img/avatarHead.png",
    },
    {
      type: "roblox", label: "Roblox", icon: "🟥",
      nick: "maksim207643",
      userId: 0,
      url: "https://www.roblox.com/users/3032835100/profile",
      photo: "img/none.png",
    },
    {
      type: "steam", label: "Steam", icon: "🎮",
      nick: "maksim207643",
      url: "https://steamcommunity.com/id/maksim207643/",
      photo: "img/steam.jpg",
    },
    {
      type: "discord", label: "Discord", icon: "💬",
      nick: "maksim207643",
      photo: "img/discord.png",
    },
  ];

  document.getElementById("name").textContent = profile.name;
  //document.getElementById("avatar").textContent = profile.avatarText;

  const tabsEl = document.getElementById("tabs");
  const profilesEl = document.getElementById("profiles");

  // Универсальный помощник: фото или заглушка
  function photoHtml(url, fallbackIcon, cls) {
    return url
      ? `<img class="${cls}" src="${url}" alt="Photo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="${cls}" style="display:none;align-items:center;justify-content:center;font-size:2rem">${fallbackIcon}</div>`
      : `<div class="${cls}" style="display:flex;align-items:center;justify-content:center;font-size:2rem">${fallbackIcon}</div>`;
  }

  platforms.forEach((p, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === 0 ? " active" : "");
    tab.dataset.index = i;
    tab.innerHTML = `<span>${p.icon}</span> ${p.label}`;
    tab.addEventListener("click", () => switchTab(i));
    tabsEl.appendChild(tab);

    const mp = document.createElement("div");
    mp.className = "mini-profile" + (i === 0 ? " active" : "");
    mp.dataset.index = i;

    switch (p.type) {
      case "telegram":  mp.innerHTML = renderTelegram(p); break;
      case "minecraft": mp.innerHTML = renderMinecraft(p); break;
      case "roblox":    mp.innerHTML = renderRoblox(p); break;
      case "steam":     mp.innerHTML = renderSteam(p); break;
      case "discord":   mp.innerHTML = renderDiscord(p); break;
    }
    profilesEl.appendChild(mp);
  });

  function switchTab(index) {
    document.querySelectorAll(".tab").forEach(t =>
      t.classList.toggle("active", +t.dataset.index === index));
    document.querySelectorAll(".mini-profile").forEach(m =>
      m.classList.toggle("active", +m.dataset.index === index));
  }

  function renderTelegram(p) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(p.url)}`;
    return `
      <div class="mp-title"><span class="mp-icon">✈️</span> Telegram</div>
      <div class="tg-widget">
        <div class="tg-qr"><img src="${qrUrl}" alt="QR" width="180" height="180" /></div>
        <div>Ник: <span class="tg-nick">${p.nick}</span></div>
        <a class="tg-btn" href="${p.url}" target="_blank" rel="noopener">Открыть чат</a>
      </div>
    `;
  }

  function renderMinecraft(p) {
    const uuidText = p.uuid || "не указан";
    return `
      <div class="mp-title"><span class="mp-icon">⛏️</span> Minecraft</div>
      <div class="mc-widget">
        ${photoHtml(p.photo, "⛏️", "mc-photo")}
        <div class="mc-info-block">
          <div class="mc-info">
            <div class="label">Ник</div>
            <div class="value">${p.nick}</div>
          </div>
          <div class="mc-info">
            <div class="label">UUID</div>
            <div class="value uuid">${uuidText}</div>
          </div>
          <a class="mc-link" href="${p.namemc}" target="_blank" rel="noopener">Открыть на NameMC →</a>
        </div>
      </div>
    `;
  }

  function renderRoblox(p) {
    const avatarUrl = p.userId
      ? `https://www.roblox.com/headshot-thumbnail/image?userId=${p.userId}&width=420&height=420&format=png`
      : "";
    const avatarHtml = avatarUrl
      ? `<img class="rbx-avatar" src="${avatarUrl}" alt="Avatar" onerror="this.style.display='none'" /><div class="rbx-avatar" style="display:flex;align-items:center;justify-content:center;font-size:2rem">🟥</div>`
      : `<div class="rbx-avatar" style="display:flex;align-items:center;justify-content:center;font-size:2rem">🟥</div>`;

    return `
      <div class="mp-title"><span class="mp-icon">🟥</span> Roblox</div>
      <div class="rbx-widget">
        ${avatarHtml}
        <div class="rbx-info">
          <div class="nick">${p.nick}</div>
          ${p.userId ? `<div class="id">ID: ${p.userId}</div>` : ""}
          <a class="rbx-btn" href="${p.url}" target="_blank" rel="noopener">Открыть профиль</a>
        </div>
      </div>
    `;
  }

  function renderSteam(p) {
    return `
      <div class="mp-title"><span class="mp-icon">🎮</span> Steam</div>
      <div class="steam-widget">
        ${photoHtml(p.photo, "🎮", "steam-avatar")}
        <div class="steam-info">
          <div class="nick">${p.nick}</div>
          <a class="steam-btn" href="${p.url}" target="_blank" rel="noopener">Открыть профиль</a>
        </div>
      </div>
    `;
  }

  function renderDiscord(p) {
    return `
      <div class="mp-title"><span class="mp-icon">💬</span> Discord</div>
      <div class="dc-widget">
        ${photoHtml(p.photo, "💬", "dc-avatar")}
        <div class="dc-info">
          <div class="dc-card">
            <span class="dc-icon">💬</span>
            <div>
              <div class="dc-nick">${p.nick}</div>
              <div class="dc-tag">Discord</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }