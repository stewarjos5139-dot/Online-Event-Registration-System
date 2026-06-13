(function () {
  var activities = [
    { id: 1, title: 'Python数据分析实战工作坊', date: '2026-05-20', time: '14:00-17:00', cat: 'academic', club: '数据科学社', remain: 12, total: 40, status: 'open', color: '#3498db' },
    { id: 2, title: '校园足球联赛春季赛', date: '2026-05-18', time: '09:00-12:00', cat: 'sports', club: '足球协会', remain: 3, total: 20, status: 'open', color: '#e74c3c' },
    { id: 3, title: '水彩画入门体验课', date: '2026-05-22', time: '15:00-17:30', cat: 'arts', club: '美术社', remain: 8, total: 30, status: 'open', color: '#9b59b6' },
    { id: 4, title: '人工智能前沿讲座', date: '2026-05-19', time: '18:30-20:30', cat: 'tech', club: 'AI研习社', remain: 0, total: 60, status: 'closed', color: '#2ecc71' },
    { id: 5, title: '支教志愿者招募说明会', date: '2026-05-25', time: '19:00-21:00', cat: 'volunteer', club: '青年志愿者协会', remain: 15, total: 50, status: 'open', color: '#e67e22' },
    { id: 6, title: '数学建模竞赛培训', date: '2026-05-21', time: '10:00-12:00', cat: 'academic', club: '数学建模社', remain: 6, total: 35, status: 'open', color: '#1abc9c' },
    { id: 7, title: '街舞社公开体验课', date: '2026-05-23', time: '19:00-20:30', cat: 'sports', club: '街舞社', remain: 20, total: 40, status: 'open', color: '#e91e63' },
    { id: 8, title: '摄影技巧分享会', date: '2026-05-24', time: '14:00-16:00', cat: 'arts', club: '摄影协会', remain: 5, total: 25, status: 'open', color: '#ff9800' },
  ];

  var catNames = { academic: '学术', sports: '体育', arts: '艺术', tech: '科技', volunteer: '志愿' };
  var catClass = { academic: 'tag-academic', sports: 'tag-sports', arts: 'tag-arts', tech: 'tag-tech', volunteer: 'tag-volunteer' };
  var currentFilter = 'all';
  var grid = document.getElementById('activityGrid');

  function render(filter) {
    var filtered = filter === 'all' ? activities : activities.filter(function (a) { return a.cat === filter; });
    grid.innerHTML = filtered.map(function (a) {
      var icon = a.cat === 'academic' ? '📖' : a.cat === 'sports' ? '⚽' : a.cat === 'arts' ? '🎨' : a.cat === 'tech' ? '💻' : '🤝';
      var statusText = a.status === 'open' ? '报名中' : '已满员';
      return '<div class="card" onclick="location.href=\'detail.html?id=' + a.id + '\'">' +
        '<div class="card-img" style="background:' + a.color + '">' +
        '<div class="placeholder" style="color:rgba(255,255,255,0.4)">' + icon + '</div>' +
        '<span class="tag ' + catClass[a.cat] + '">' + catNames[a.cat] + '</span>' +
        '<span class="status ' + (a.status === 'open' ? 'status-open' : 'status-closed') + '">' + statusText + '</span>' +
        '</div>' +
        '<div class="card-body">' +
        '<h3>' + a.title + '</h3>' +
        '<div class="card-meta">' +
        '<span>📅 ' + a.date + '</span>' +
        '<span>🕐 ' + a.time + '</span>' +
        '</div>' +
        '<div class="card-footer">' +
        '<span class="club">' + a.club + '</span>' +
        '<span class="remain">剩余 ' + a.remain + ' / ' + a.total + ' 名额</span>' +
        '</div>' +
        '</div>' +
        '</div>';
    }).join('');

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#999;padding:40px;">暂无符合条件的活动</p>';
    }
  }

  document.getElementById('filterBar').addEventListener('click', function (e) {
    if (e.target.classList.contains('filter-tag')) {
      document.querySelectorAll('.filter-tag').forEach(function (t) { t.classList.remove('active'); });
      e.target.classList.add('active');
      currentFilter = e.target.dataset.cat;
      render(currentFilter);
    }
  });

  document.getElementById('searchInput').addEventListener('input', function () {
    var keyword = this.value.toLowerCase().trim();
    var cards = grid.querySelectorAll('.card');
    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      card.style.display = text.indexOf(keyword) !== -1 ? '' : 'none';
    });
  });

  document.getElementById('searchBtn').addEventListener('click', function () {
    document.getElementById('searchInput').dispatchEvent(new Event('input'));
  });

  document.getElementById('menuBtn').addEventListener('click', function () {
    document.getElementById('drawer').classList.add('open');
    document.getElementById('drawerOverlay').classList.add('open');
  });
  document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
  document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);
  function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('open');
  }

  render('all');
})();