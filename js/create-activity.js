(function () {
  // 获取Toast元素，用于显示提示消息
  var toast = document.getElementById('toast');

  /**
   * 显示Toast提示消息
   * @param {string} msg - 要显示的消息内容
   * @param {string} cls - 额外的CSS类名（如'success'）
   */
  function showToast(msg, cls) {
    toast.textContent = msg;
    toast.className = 'toast ' + (cls || '');
    toast.classList.add('show');
    // 2.5秒后自动隐藏
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(function () {
      toast.classList.remove('show');
    }, 2500);
  }

  // ============================================
  // 文件上传功能
  // 点击上传区域触发文件选择
  // ============================================
  document.getElementById('uploadArea').addEventListener('click', function () {
    document.getElementById('posterFile').click();
  });

  // ============================================
  // 预览按钮功能
  // 收集表单数据并显示预览
  // ============================================
  document.getElementById('previewBtn').addEventListener('click', function () {
    var title = document.getElementById('actTitle').value.trim();

    // 验证必填项
    if (!title) {
      showToast('请输入活动标题');
      return;
    }

    showToast('预览功能已触发', 'success');
  });

  // ============================================
  // 保存草稿功能
  // ============================================
  document.getElementById('draftBtn').addEventListener('click', function () {
    showToast('草稿已保存', 'success');
  });

  // ============================================
  // 发布活动功能
  // 验证所有必填项后提交
  // ============================================
  document.getElementById('publishBtn').addEventListener('click', function () {
    // 获取所有表单字段值
    var title = document.getElementById('actTitle').value.trim();
    var date = document.getElementById('actDate').value;
    var time = document.getElementById('actTime').value;
    var loc = document.getElementById('actLocation').value.trim();
    var cap = document.getElementById('actCapacity').value;
    var cat = document.getElementById('actCategory').value;
    var club = document.getElementById('actClub').value.trim();
    var summary = document.getElementById('actSummary').value.trim();
    var desc = document.getElementById('actDesc').value.trim();

    // 依次验证每个必填项
    if (!title) { showToast('请输入活动标题'); return; }
    if (title.length < 2) { showToast('活动标题至少需要2个字'); return; }
    if (!date) { showToast('请选择活动日期'); return; }
    if (!time) { showToast('请选择活动时间'); return; }
    if (!loc) { showToast('请输入活动地点'); return; }
    if (!cap || cap < 1) { showToast('请输入有效的名额限制'); return; }
    if (!cat) { showToast('请选择活动分类'); return; }
    if (!club) { showToast('请输入主办社团'); return; }
    if (!summary || summary.length < 10) { showToast('活动简介至少10个字'); return; }
    if (!desc) { showToast('请输入活动详细描述'); return; }

    // 所有验证通过，显示成功消息
    showToast('活动发布成功！', 'success');
  });
})();