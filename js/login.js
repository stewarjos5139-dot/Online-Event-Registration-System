(function () {
  let currentRole = 'user';
  let currentTab = 'login';

  const roleBtns = document.querySelectorAll('.role-btn');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const loginPanel = document.getElementById('loginPanel');
  const registerPanel = document.getElementById('registerPanel');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(function () { toast.classList.remove('show'); }, 2000);
  }

  roleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentRole = btn.dataset.role;
      if (currentTab === 'register' && currentRole === 'admin') {
        showToast('管理员无法注册，请切换到用户角色');
        currentRole = 'user';
        return;
      }
      roleBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentTab = btn.dataset.tab;
      if (currentTab === 'register' && currentRole === 'admin') {
        showToast('管理员无法注册，请切换回用户');
        currentTab = 'login';
        return;
      }
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      if (currentTab === 'login') {
        loginPanel.classList.add('active');
        registerPanel.classList.remove('active');
      } else {
        registerPanel.classList.add('active');
        loginPanel.classList.remove('active');
      }
    }
    );
  });

  document.getElementById('goRegister').addEventListener('click', function () {
    document.querySelector('.tab-btn[data-tab="register"]').click();
  });
  document.getElementById('goLogin').addEventListener('click', function () {
    document.querySelector('.tab-btn[data-tab="login"]').click();
  });

  document.getElementById('loginSubmit').addEventListener('click', function () {
    var user = document.getElementById('loginUser').value.trim();
    var pass = document.getElementById('loginPass').value.trim();
    if (!user) { showToast('请输入用户名'); return; }
    if (!pass) { showToast('请输入密码'); return; }
    if (currentRole === 'admin') {
      window.location.href = 'admin-dashboard.html';
    } else {
      window.location.href = 'index.html';
    }
  });

  document.getElementById('regSubmit').addEventListener('click', function () {
    var user = document.getElementById('regUser').value.trim();
    var sid = document.getElementById('regStuId').value.trim();
    var pass = document.getElementById('regPass').value.trim();
    var pass2 = document.getElementById('regPass2').value.trim();
    if (!user) { showToast('请输入用户名'); return; }
    if (!sid) { showToast('请输入学号'); return; }
    if (!/^\d+$/.test(sid)) { showToast('学号格式不正确'); return; }
    if (pass.length < 6) { showToast('密码至少需要6位'); return; }
    if (pass !== pass2) { showToast('两次密码输入不一致'); return; }
    showToast('注册成功！请登录');
    document.querySelector('.tab-btn[data-tab="login"]').click();
  });

  document.querySelectorAll('input').forEach(function (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        if (currentTab === 'login') {
          document.getElementById('loginSubmit').click();
        } else {
          document.getElementById('regSubmit').click();
        }
      }
    });
  });
})();