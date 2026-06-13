(function () {
  var activities = {
    1: { title: 'Python数据分析实战工作坊', date: '2026-05-20', time: '14:00-17:00', location: '教学楼A301', club: '数据科学社', remain: 12, total: 40, status: 'open', desc: '本次工作坊面向对数据分析感兴趣的同学，将由资深学长带领大家从零开始学习 Python 数据处理。无论你是编程新手还是有一定基础，都能从中收获实用技能。', color1: '#1a5276', color2: '#2e86c1' },
    2: { title: '校园足球联赛春季赛', date: '2026-05-18', time: '09:00-12:00', location: '西区体育场', club: '足球协会', remain: 3, total: 20, status: 'open', desc: '春季校园足球联赛正式开启！各院系代表队将展开激烈角逐。本次比赛采用小组赛+淘汰赛制，冠军队伍将获得校级荣誉证书。欢迎同学们前来观赛助威！', color1: '#c0392b', color2: '#e74c3c' },
    3: { title: '水彩画入门体验课', date: '2026-05-22', time: '15:00-17:30', location: '艺术楼B205画室', club: '美术社', remain: 8, total: 30, status: 'open', desc: '零基础水彩画体验课，由美术社社长亲自指导。课程包含水彩基础技法讲解、色彩搭配原理、现场作画练习。所有绘画材料由社团提供，你只需要带上好心情。', color1: '#7d3c98', color2: '#9b59b6' },
    4: { title: '人工智能前沿讲座', date: '2026-05-19', time: '18:30-20:30', location: '图书馆报告厅', club: 'AI研习社', remain: 0, total: 60, status: 'closed', desc: '本次讲座邀请到了知名AI企业的技术专家，将深入浅出地介绍大语言模型的原理与应用趋势。讲座结束后设有Q&A环节和现场互动。欢迎全校师生参加！', color1: '#1e8449', color2: '#2ecc71' },
    5: { title: '支教志愿者招募说明会', date: '2026-05-25', time: '19:00-21:00', location: '综合教学楼C102', club: '青年志愿者协会', remain: 15, total: 50, status: 'open', desc: '暑期支教项目正在招募志愿者！本次说明会将详细介绍支教地点、时间安排、课程设置以及志愿者培训计划。参与支教的同学可获得志愿服务证书和社会实践学分。', color1: '#a04000', color2: '#e67e22' },
    6: { title: '数学建模竞赛培训', date: '2026-05-21', time: '10:00-12:00', location: '理工楼D208', club: '数学建模社', remain: 6, total: 35, status: 'open', desc: '为备战全国大学生数学建模竞赛，数学建模社特别组织了系列培训课程。本次培训将重点讲解建模思路、常用算法及论文写作技巧。欢迎有参赛意向的同学踊跃报名！', color1: '#0e6655', color2: '#1abc9c' },
    7: { title: '街舞社公开体验课', date: '2026-05-23', time: '19:00-20:30', location: '体育馆舞蹈室', club: '街舞社', remain: 20, total: 40, status: 'open', desc: '街舞社新学期公开体验课来啦！本次课程涵盖Hip-Hop和K-Pop基础动作教学，由专业教练带队。无论有无舞蹈基础均可报名参加，现场感受街舞的魅力！', color1: '#880e4f', color2: '#e91e63' },
    8: { title: '摄影技巧分享会', date: '2026-05-24', time: '14:00-16:00', location: '图书馆多功能厅', club: '摄影协会', remain: 5, total: 25, status: 'open', desc: '相机还是手机，都能拍出好照片！本次分享会将讲解构图法则、光影运用、后期调色等实用技巧。现场设有器材体验区和优秀作品展览，欢迎摄影爱好者参与。', color1: '#e65100', color2: '#ff9800' },
  };

  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || '1';
  var activity = activities[id] || activities['1'];

  document.getElementById('posterTitle').textContent = activity.title;
  document.getElementById('posterStatus').textContent = activity.status === 'open' ? '报名中' : '已满员';
  document.getElementById('posterStatus').className = 'badge ' + (activity.status === 'open' ? 'badge-open' : 'badge-closed');
  document.getElementById('posterBanner').style.background = 'linear-gradient(135deg, ' + activity.color1 + ' 0%, ' + activity.color2 + ' 100%)';
  document.getElementById('activityDesc').textContent = activity.desc;
  document.getElementById('infoDate').textContent = activity.date;
  document.getElementById('infoTime').textContent = activity.time;
  document.getElementById('infoLoc').textContent = activity.location;
  document.getElementById('infoClub').textContent = activity.club;
  document.getElementById('infoRemain').textContent = activity.remain;
  document.getElementById('infoTotal').textContent = activity.total;

  if (activity.status === 'closed' || activity.remain === 0) {
    document.getElementById('regFormCard').style.display = 'none';
    document.getElementById('closedHint').style.display = '';
  }

  var toast = document.getElementById('toast');
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timeout);//清除之前的定时器，避免多次点击导致的显示异常
    toast._timeout = setTimeout(function () { toast.classList.remove('show'); }, 2000);
  }


  document.getElementById('regSubmit').addEventListener('click', function () {
    // 1. 获取输入内容并去除前后空格
    var name = document.getElementById('regName').value.trim();
    var sid = document.getElementById('regStuId').value.trim();
    var contact = document.getElementById('regContact').value.trim();
    var remark = document.getElementById('regRemark').value.trim();

    // 2. 表单校验
    if (!name) { showToast('请输入姓名'); return; }
    if (!sid) { showToast('请输入学号'); return; }
    if (!/^\d+$/.test(sid)) { showToast('学号格式不正确'); return; }
    if (!contact) { showToast('请输入联系方式'); return; }

    // ----------------- 新增功能开始 -----------------
    // 3. 构建数据对象
    var formData = {
      activityId: id, // 顺便把当前报名的活动ID也带上，方便后端区分
      studentName: name,
      studentId: sid,
      contactInfo: contact,
      remarks: remark
    };

    // 4. 转换为 JSON 格式字符串
    // JSON.stringify 的第三个参数 2 用于保持 2 个空格的缩进，让弹窗里显示的 JSON 更美观易读
    var jsonString = JSON.stringify(formData, null, 2);

    // 5. 使用浏览器原生弹窗显示
    alert("最终提交的表单数据：\n" + jsonString);
    // ----------------- 新增功能结束 -----------------

    // 6. 原有的成功提示与清空表单逻辑
    showToast('报名成功！请等待审核');
    document.getElementById('regName').value = '';
    document.getElementById('regStuId').value = '';
    document.getElementById('regContact').value = '';
    document.getElementById('regRemark').value = '';
  });
})();