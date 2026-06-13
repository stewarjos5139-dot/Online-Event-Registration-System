(function() {
  var registrations = [
    { id:1, title:'Python数据分析实战工作坊', date:'2026-05-20', club:'数据科学社', status:'pending', color:'#3498db' },
    { id:2, title:'校园足球联赛春季赛', date:'2026-05-18', club:'足球协会', status:'approved', color:'#e74c3c' },
    { id:3, title:'水彩画入门体验课', date:'2026-05-22', club:'美术社', status:'approved', color:'#9b59b6' },
    { id:4, title:'数学建模竞赛培训', date:'2026-05-21', club:'数学建模社', status:'pending', color:'#1abc9c' },
    { id:6, title:'街舞社公开体验课', date:'2026-05-23', club:'街舞社', status:'approved', color:'#e91e63' },
    { id:7, title:'摄影技巧分享会', date:'2026-05-24', club:'摄影协会', status:'approved', color:'#ff9800' },
  ];

  var statusName = { pending:'待审核', approved:'已成功', rejected:'已拒绝' };
  var statusClass = { pending:'status-pending', approved:'status-approved', rejected:'status-rejected' };

  var approvedCount = registrations.filter(function(r) { return r.status === 'approved'; }).length;
  var pendingCount = registrations.filter(function(r) { return r.status === 'pending'; }).length;
  document.getElementById('statTotal').textContent = registrations.length;
  document.getElementById('statApproved').textContent = approvedCount;
  document.getElementById('statPending').textContent = pendingCount;

  function renderList(filter) {
    var filtered = filter === 'all' ? registrations : registrations.filter(function(r) { return r.status === filter; });
    if (filtered.length === 0) {
      return '<div class="empty-state"><div class="icon">📋</div><p>暂无记录</p></div>';
    }
    return filtered.map(function(r) {
      return '<div class="activity-item">' +
        '<div class="act-icon" style="background:' + r.color + '">📌</div>' +
        '<div class="act-info">' +
          '<h4>' + r.title + '</h4>' +
          '<div class="meta">📅 ' + r.date + ' · ' + r.club + '</div>' +
        '</div>' +
        '<span class="act-status ' + statusClass[r.status] + '">' + statusName[r.status] + '</span>' +
        '<button class="act-cancel" data-id="' + r.id + '">取消报名</button>' +
      '</div>';
    }).join('');
  }

  document.getElementById('panelRegistered').innerHTML = renderList('all');
  document.getElementById('panelApproved').innerHTML = renderList('approved');
  document.getElementById('panelPending').innerHTML = renderList('pending');

  document.getElementById('tabNav').addEventListener('click', function(e) {
    if (e.target.classList.contains('tab-btn')) {
      document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
      e.target.classList.add('active');
      var tab = e.target.dataset.tab;
      document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
      var panelMap = { registered:'panelRegistered', approved:'panelApproved', pending:'panelPending' };
      document.getElementById(panelMap[tab]).classList.add('active');
    }
  });

  var toast = document.getElementById('toast');
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(function() { toast.classList.remove('show'); }, 2000);
  }

  document.querySelectorAll('.act-cancel').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var id = parseInt(btn.dataset.id);
      registrations = registrations.filter(function(r) { return r.id !== id; });
      if (confirm('确定要取消该活动的报名吗？')) {
        showToast('已取消报名');
        document.getElementById('panelRegistered').innerHTML = renderList('all');
        document.getElementById('panelApproved').innerHTML = renderList('approved');
        document.getElementById('panelPending').innerHTML = renderList('pending');
        document.getElementById('statTotal').textContent = registrations.length;
        document.getElementById('statApproved').textContent = registrations.filter(function(r) { return r.status === 'approved'; }).length;
        document.getElementById('statPending').textContent = registrations.filter(function(r) { return r.status === 'pending'; }).length;
        bindCancelEvents();
      }
    });
  });

  function bindCancelEvents() {
    document.querySelectorAll('.act-cancel').forEach(function(btn) {
      btn.onclick = function(e) {
        e.stopPropagation();
        var id = parseInt(btn.dataset.id);
        registrations = registrations.filter(function(r) { return r.id !== id; });
        if (confirm('确定要取消该活动的报名吗？')) {
          showToast('已取消报名');
          document.getElementById('panelRegistered').innerHTML = renderList('all');
          document.getElementById('panelApproved').innerHTML = renderList('approved');
          document.getElementById('panelPending').innerHTML = renderList('pending');
          document.getElementById('statTotal').textContent = registrations.length;
          document.getElementById('statApproved').textContent = registrations.filter(function(r) { return r.status === 'approved'; }).length;
          document.getElementById('statPending').textContent = registrations.filter(function(r) { return r.status === 'pending'; }).length;
          bindCancelEvents();
        }
      };
    });
  }
})();
