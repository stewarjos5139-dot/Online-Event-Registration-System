// ===================== 全局变量 =====================
// 总申请数量
let total = 8;
// 待审核数量
let wait = 4;
// 已通过数量
let pass = 3;
// 已拒绝数量
let refuse = 1;

// ===================== 核心函数 =====================

/**
 * 更新仪表盘上的统计数字
 * 作用：同步显示总申请、待审核、已通过、已拒绝的实时数量
 */
function updateNum(){
    // 获取总申请数元素并赋值
    document.getElementById("totalNum").innerText = total;
    // 获取待审核数元素并赋值
    document.getElementById("waitNum").innerText = wait;
    // 获取已通过数元素并赋值
    document.getElementById("passNum").innerText = pass;
    // 获取已拒绝数元素并赋值
    document.getElementById("refuseNum").innerText = refuse;
}

/**
 * 切换页面和菜单高亮
 * @param {string} pageId - 要显示的页面ID
 * @param {object} obj - 当前点击的菜单DOM对象
 */
function go(pageId,obj){
    // 获取所有页面模块
    let allPage = document.querySelectorAll(".page");
    // 循环隐藏所有页面
    for(let i=0;i<allPage.length;i++){
        allPage[i].classList.remove("active");
    }
    // 显示目标页面
    document.getElementById(pageId).classList.add("active");

    // 获取所有菜单项
    let allMenu = document.querySelectorAll(".menu a");
    // 循环取消所有菜单高亮
    for(let i=0;i<allMenu.length;i++){
        allMenu[i].classList.remove("active");
    }
    // 给当前点击菜单添加高亮
    obj.classList.add("active");
}

/**
 * 手机端侧边栏开关
 * 作用：点击手机菜单按钮显示/隐藏侧边栏
 */
function toggleMenu(){
    // 切换sidebar的show类名
    document.getElementById("sidebar").classList.toggle("show");
}

/**
 * 获取当前日期，格式：YYYY-MM-DD
 * @returns {string} 格式化后的日期字符串
 */
function getNowTime(){
    // 创建日期对象
    let d = new Date();
    // 拼接年月日，月份和日期不足两位自动补0
    return d.getFullYear()+"-"+(d.getMonth()+1).toString().padStart(2,'0')+"-"+d.getDate().toString().padStart(2,'0');
}

/**
 * 添加成员到成员列表
 * @param {string} name - 学生姓名
 * @param {string} stuId - 学生学号
 */
function addMember(name,stuId){
    // 获取成员列表tbody
    let tbody = document.getElementById("memberBody");
    // 获取当前日期
    let time = getNowTime();
    // 拼接HTML行结构
    let html = `<tr><td>${name}</td><td>${stuId}</td><td>2024级</td><td>${time}</td><td>社员</td></tr>`;
    // 追加到表格中
    tbody.innerHTML += html;
    // 重新统计成员人数
    countMember();
}

/**
 * 根据姓名删除成员
 * @param {string} name - 要删除的成员姓名
 */
function delMember(name){
    // 获取所有成员行
    let trs = document.querySelectorAll("#memberBody tr");
    // 循环查找匹配姓名的行
    for(let i=0;i<trs.length;i++){
        if(trs[i].cells[0].innerText == name){
            // 删除该行
            trs[i].remove();
            // 找到后跳出循环
            break;
        }
    }
    // 重新统计成员人数
    countMember();
}

/**
 * 统计并更新成员总人数
 */
function countMember(){
    // 获取成员表格行数
    let num = document.querySelectorAll("#memberBody tr").length;
    // 更新页面显示
    document.getElementById("memberCount").innerText = num;
}

/**
 * 根据状态筛选申请表格
 */
function filterTable(){
    // 获取筛选下拉框
    let select = document.getElementById("filterSelect");
    // 获取选中值
    let val = select.value;
    // 获取所有带状态的表格行
    let trs = document.querySelectorAll("#applyTable tr[data-status]");
    
    // 循环判断每一行是否显示
    for(let i=0;i<trs.length;i++){
        // 获取当前行状态
        let status = trs[i].getAttribute("data-status");
        // 全部 或 状态匹配则显示
        if(val == "all" || val == status){
            trs[i].style.display = "";
        }else{
            // 不匹配则隐藏
            trs[i].style.display = "none";
        }
    }
}

/**
 * 审核状态切换（通过/拒绝/撤销）
 * @param {object} btn - 点击的按钮对象
 * @param {string} type - 操作类型：pass通过 / refuse拒绝 / back撤销
 */
function changeStatus(btn,type){
    // 获取当前按钮所在的行
    let tr = btn.parentElement.parentElement;
    // 获取该行原来的状态
    let oldStatus = tr.getAttribute("data-status");
    // 获取学生姓名
    let userName = tr.getAttribute("data-name");
    // 获取学生学号
    let userStu = tr.getAttribute("data-stu");

    // ———— 审核通过 ————
    if(type == "pass"){
        wait--;        // 待审核-1
        pass++;       // 已通过+1
        tr.setAttribute("data-status","pass"); // 更新行状态
        // 更新行HTML结构
        tr.innerHTML = `
            <td>${userName}</td>
            <td>${tr.cells[1].innerText}</td>
            <td><span class="badge success">已通过</span></td>
            <td><button class="btn-back" onclick="changeStatus(this,'back')">撤销</button></td>
        `;
        addMember(userName,userStu); // 添加到成员列表
        alert("审核通过，已自动加入社团成员！");
    }
    // ———— 拒绝申请 ————
    else if(type == "refuse"){
        wait--;        // 待审核-1
        refuse++;      // 已拒绝+1
        tr.setAttribute("data-status","refuse"); // 更新行状态
        // 更新行HTML结构
        tr.innerHTML = `
            <td>${userName}</td>
            <td>${tr.cells[1].innerText}</td>
            <td><span class="badge danger">已拒绝</span></td>
            <td><button class="btn-back" onclick="changeStatus(this,'back')">撤销</button></td>
        `;
        alert("已拒绝该申请！");
    }
    // ———— 撤销审核，退回待审核 ————
    else if(type == "back"){
        // 如果是从“已通过”撤销
        if(oldStatus == "pass"){
            pass--;        // 已通过-1
            delMember(userName); // 删除成员
        }
        // 如果是从“已拒绝”撤销
        else if(oldStatus == "refuse"){
            refuse--;      // 已拒绝-1
        }
        wait++; // 待审核+1
        tr.setAttribute("data-status","pending"); // 更新行状态
        // 恢复为待审核界面
        tr.innerHTML = `
            <td>${userName}</td>
            <td>${tr.cells[1].innerText}</td>
            <td><span class="badge pending">待审核</span></td>
            <td>
                <button class="btn-yes" onclick="changeStatus(this,'pass')">通过</button>
                <button class="btn-no" onclick="changeStatus(this,'refuse')">拒绝</button>
            </td>
        `;
        alert("已撤销审核，退回待审核！");
    }
    // 更新统计数字
    updateNum();
    // 重新筛选表格
    filterTable();
}

// ===================== 页面初始化 =====================
// 初始化仪表盘数字
updateNum();

// 页面加载完成后执行
window.onload = function(){
    // 自动添加已通过的成员
    addMember("赵伟","20220105030");
    addMember("孙悦","20240106035");
    addMember("周杰","20230107040");
    // 统计成员总数
    countMember();
}