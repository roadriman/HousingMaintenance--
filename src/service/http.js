
import _ from 'lodash';

import {
    URL_ROOT,
    CAS_LOGOUT
} from '../global/config';
/**
 * 拼接字符串
 * @param {Object} object - 传入的原始对象
 */
function objToParams(object) {
    return _.join(map(object, (v, k) => [k, v || ''].join('=')), '&');
}

function objToFormData(object) {
    var form = new FormData();
    _.map(object, (v, k) => form.append(k, v));
    return form;
}

/** */
function addParamIn(str) {
    return 'paramIn=' + str;
}
/**
 *
 * @param {*} paths
 */
function joinPath(...paths) {
    return paths
        .map(v => v && v.split(/^\/|\/$/).filter(x => x))
        .reduce((r, v) => r.concat(v), [])
        .join('/');
}

/**
 * 输入url
 * @param {String} url 输入的url
 */
function urlInterceptor(url) {
    return url && url.indexOf('http') > -1 ? url : joinPath(URL_ROOT, url);
}

/**
 *
 * @param {String} url 请求路径
 * @param {Object} options 对象
 */
export async function http(url, options) {
    var init = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        credentials: 'include',
        mode: 'cors',
        redirect: 'manual',
        referrer: 'no-referrer'
    };
    let rtn = null;
    let res = null;

    Object.assign(init, options);
    try {
        res = await fetch(urlInterceptor(url), init);
        rtn = await res.json();
    } catch (e) {
        // if (res.status == 0) {
        //     window.location.href = URL_ROOT;
        // }
        // console.log('NetWork Error');
    }

    return rtn;
}

/**
 * POST方法请求数据
 * @param {String} url 请求路径
 * @param {Object} data 请求数据 - 以对象的形式输入
 */
export function POST(url, data) {
    return http(url, {
        method: 'POST',
        body: encodeURI(addParamIn(JSON.stringify(data)))
    });
}

/**
 * GET方法请求数据
 */
export function GET(url, data) {
    return http(url, {
        method: 'GET'
    });
}

/**
 * 上传文件方法
 */
async function UPLOAD(url, data, fileList) {
    let form = new FormData();
    form.append('paramIn', JSON.stringify(data));
    fileList.map(v => form.append(v.key, v.value));
    let rtn = await fetch(urlInterceptor(url), {
        method: 'POST',
        credentials: 'include',
        body: form
    });

    if (rtn.redirected == true) {
        window.location.href = rtn.url;
    }

    return rtn.json();
}


/**
 * **********************************************
 * 从这里开始是调用后端接口
 * **********************************************
 */

/**
 * 登录验证接口
 * 可以获得当前登录帐号的用户名
 * 用于接口调用
 * @return {Object} Info - 接口返回的用户信息
 */
export async function validatelogin() {
    let rtn = null;
    try {
        rtn = await GET('/login/validatelogin');
        // sessionStorage.setItem('userName', rtn.account);
        // sessionStorage.setItem('userName', "shihm");
    } catch (e) {
        throw e;
    } finally {
        return rtn;
    }
}
export async function getCurrentAuthority() {
    let rtn = null;
    try {
        rtn = await GET('/login/getCurrentAuthority');
    } catch (e) {
        throw e;
    } finally {
        return rtn;
    }
}

export async function logout() {
    let rtn = null;
    try {
        rtn = await GET('/login/logout');
    } catch (e) {
        throw e;
    } finally {
        return rtn;
    }
}
/**
 * 查询列表接口
 * @param {String} key - 用户名搜索
 * @param {String} status - 状态
 * @param {Int} currentPage - 当前页数
 * @param {Int} pageSize - 当前每页总量
 */
export async function queryProjectList(
    key,
    status,
    currentPage,
    pageSize,
    startTime,
    endTime,
) {

    let rtn = {};
    rtn = await POST('/projectList/queryProjectList', {
        key: key,
        status: status,
        currentPage: currentPage,
        pageSize: pageSize,
        startTime:startTime,
        endTime:endTime
    });
    return rtn;
}

export async function submitEstablishment(
    projectName,
    department,
    applyTime,
    constructionTime,
    field,
    fund,
    fundSource,
    necessity,
    goal1,
    goal2,
    goal3,
    goal4,
    goal5,
    goal6,
    departmentLeader,
    contact,
    phone,
    constructionAdvise,
    developmentAdvise
) {
    let rtn = {};
    rtn = await POST('/establishment/addEstablishment', {
        projectName: projectName,
        department: department,
        applyTime: applyTime,
        constructionTime: constructionTime,
        field: field,
        fund: fund,
        fundSource: fundSource,
        necessity: necessity,
        goal1: goal1,
        goal2: goal2,
        goal3: goal3,
        goal4: goal4,
        goal5: goal5,
        goal6: goal6,
        departmentLeader: departmentLeader,
        contact: contact,
        phone: phone,
        constructionAdvise: constructionAdvise,
        developmentAdvise: developmentAdvise
    });
    return rtn;
}

export async function submitEstimate(
    projectName,
    department,
    applyTime,
    constructionStartTime,
    constructionEndTime,
    field,
    fund,
    fundSource,
    content1,
    content2,
    content3,
    content4,
    content5,
    content6,
    content7,
    content8,
    estimate1,
    estimate2,
    estimate3,
    estimate4,
    estimate5,
    estimate6,
    estimate7,
    estimate8,
    total,
    departmentLeader,
    contact,
    phone,
    auditAdvise,
) {
    let rtn = {};
    rtn = await POST('/estimate/addEstimate', {
        projectName: projectName,
        department: department,
        applyTime: applyTime,
        constructionStartTime: constructionStartTime,
        constructionEndTime: constructionEndTime,
        field: field,
        fund: fund,
        fundSource: fundSource,
        content1: content1,
        content2: content2,
        content3: content3,
        content4: content4,
        content5: content5,
        content6: content6,
        content7: content7,
        content8: content8,
        estimate1: estimate1,
        estimate2: estimate2,
        estimate3: estimate3,
        estimate4: estimate4,
        estimate5: estimate5,
        estimate6: estimate6,
        estimate7: estimate7,
        estimate8: estimate8,
        total: total,
        departmentLeader: departmentLeader,
        contact: contact,
        phone: phone,
        auditAdvise: auditAdvise,
    });
    return rtn;
}

export async function submitApproval(
    projectName,
    department,
    applyTime,
    constructionStartTime,
    constructionEndTime,
    field,
    fund,
    fundSource,
    necessity,
    applyLeader,
    content1,
    content2,
    content3,
    content4,
    content5,
    content6,
    estimate1,
    estimate2,
    estimate3,
    estimate4,
    estimate5,
    estimate6,
    total,
    departmentLeader,
    departmentAdvise,
    schoolAdvise,
) {
    let rtn = {};
    rtn = await POST('/approval/addApproval', {
        projectName: projectName,
        department: department,
        applyTime: applyTime,
        constructionStartTime: constructionStartTime,
        constructionEndTime: constructionEndTime,
        field: field,
        fund: fund,
        fundSource: fundSource,
        necessity: necessity,
        applyLeader: applyLeader,
        content1: content1,
        content2: content2,
        content3: content3,
        content4: content4,
        content5: content5,
        content6: content6,
        estimate1: estimate1,
        estimate2: estimate2,
        estimate3: estimate3,
        estimate4: estimate4,
        estimate5: estimate5,
        estimate6: estimate6,
        total: total,
        departmentLeader: departmentLeader,
        departmentAdvise: departmentAdvise,
        schoolAdvise: schoolAdvise
    });
    return rtn;
}
/**
 * 查询列表接口
 * @param {String} id - 用户名搜索
 */
export async function queryEstablishment(
    id
) {
    let rtn = {};
    rtn = await POST('/establishment/querytEstablishment', {
        id: id
    });
    return rtn;
};
export async function queryEstimate(
    id
) {
    let rtn = {};
    rtn = await POST('/estimate/querytEstimate', {
        id: id
    });
    return rtn;
};
export async function queryApproval(
    id
) {
    let rtn = {};
    rtn = await POST('/approval/queryApproval', {
        id: id
    });
    return rtn;
};
/**
 * 更新接口
 * @param {String} id - 用户名搜索
 */
export async function updateEstablishment(
    id,
    projectName,
    department,
    applyTime,
    constructionTime,
    field,
    fund,
    fundSource,
    necessity,
    goal1,
    goal2,
    goal3,
    goal4,
    goal5,
    goal6,
    departmentLeader,
    contact,
    phone,
    constructionAdvise,
    developmentAdvise
) {
    let rtn = {};
    rtn = await POST('/establishment/updateEstablishment', {
        id: id,
        projectName: projectName,
        department: department,
        applyTime: applyTime,
        constructionTime: constructionTime,
        field: field,
        fund: fund,
        fundSource: fundSource,
        necessity: necessity,
        goal1: goal1,
        goal2: goal2,
        goal3: goal3,
        goal4: goal4,
        goal5: goal5,
        goal6: goal6,
        departmentLeader: departmentLeader,
        contact: contact,
        phone: phone,
        constructionAdvise: constructionAdvise,
        developmentAdvise: developmentAdvise
    });
    return rtn;
}
export async function updateEstimate(
    id,
    projectName,
    department,
    applyTime,
    constructionStartTime,
    constructionEndTime,
    field,
    fund,
    fundSource,
    content1,
    content2,
    content3,
    content4,
    content5,
    content6,
    content7,
    content8,
    estimate1,
    estimate2,
    estimate3,
    estimate4,
    estimate5,
    estimate6,
    estimate7,
    estimate8,
    total,
    departmentLeader,
    contact,
    phone,
    auditAdvise,
) {
    let rtn = {};
    rtn = await POST('/estimate/updateEstimate', {
        id:id,
        projectName: projectName,
        department: department,
        applyTime: applyTime,
        constructionStartTime: constructionStartTime,
        constructionEndTime: constructionEndTime,
        field: field,
        fund: fund,
        fundSource: fundSource,
        content1: content1,
        content2: content2,
        content3: content3,
        content4: content4,
        content5: content5,
        content6: content6,
        content7: content7,
        content8: content8,
        estimate1: estimate1,
        estimate2: estimate2,
        estimate3: estimate3,
        estimate4: estimate4,
        estimate5: estimate5,
        estimate6: estimate6,
        estimate7: estimate7,
        estimate8: estimate8,
        total: total,
        departmentLeader: departmentLeader,
        contact: contact,
        phone: phone,
        auditAdvise: auditAdvise,
    });
    return rtn;
}

export async function updateApproval(
    id,
    projectName,
    department,
    applyTime,
    constructionStartTime,
    constructionEndTime,
    field,
    fund,
    fundSource,
    necessity,
    applyLeader,
    content1,
    content2,
    content3,
    content4,
    content5,
    content6,
    estimate1,
    estimate2,
    estimate3,
    estimate4,
    estimate5,
    estimate6,
    total,
    departmentLeader,
    departmentAdvise,
    schoolAdvise,
) {
    let rtn = {};
    rtn = await POST('/approval/updateApproval', {
        id:id,
        projectName: projectName,
        department: department,
        applyTime: applyTime,
        constructionStartTime: constructionStartTime,
        constructionEndTime: constructionEndTime,
        field: field,
        fund: fund,
        fundSource: fundSource,
        necessity: necessity,
        applyLeader: applyLeader,
        content1: content1,
        content2: content2,
        content3: content3,
        content4: content4,
        content5: content5,
        content6: content6,
        estimate1: estimate1,
        estimate2: estimate2,
        estimate3: estimate3,
        estimate4: estimate4,
        estimate5: estimate5,
        estimate6: estimate6,
        total: total,
        departmentLeader: departmentLeader,
        departmentAdvise: departmentAdvise,
        schoolAdvise: schoolAdvise
    });
    return rtn;
}

export async function uploadAttachment(
    projectId,
    key,
    type,
    file
) {
    let rtn = null;
    try {
        rtn = await UPLOAD(
            '/attachment/uploadAttachment', {
                projectId: projectId,
                key: key,
                type: type
            },
            [{
                key: 'file',
                value: file
            }]
        );
    } catch (e) {
        throw e;
    } finally {
        return rtn;
    }
}


export async function deleteAttachment(
    id
) {
    let rtn = null;
    rtn = await POST(
        '/attachment/deleteAttachment', {
            id: id
        });
    return rtn;
}

export async function getAttachmentList(
    projectId
) {
    let rtn = null;
    rtn = await POST(
        '/attachment/getAttachmentList', {
            projectId: projectId
        });
    return rtn;
}


export async function deleteProject(
    id
) {
    let rtn = null;
    rtn = await POST(
        '/projectList/deleteProject', {
            id: id
        });
    return rtn;
}

export async function addProject(
    projectName,
    status
) {
    let rtn = null;
    rtn = await POST(
        '/projectList/addProject', {
            projectName: projectName,
            status:status
        });
    return rtn;
}

export async function queryProject(
    projectId
) {
    let rtn = null;
    rtn = await POST(
        '/projectList/querySingleProject', {
            projectId: projectId
        });
    return rtn;
}

export async function updateProject(
    id,
    projectName,
    establishment,
    estimate,
    approval
) {
    let rtn = {};
    rtn = await POST('/projectList/updateProject', {
        id: id,
        projectName: projectName,
        establishment: establishment,
        estimate: estimate,
        approval: approval
    });
    return rtn;
}

export async function countProject(
    key,
    status,
    startTime,
    endTime,
    type
) {

    let rtn = {};
    rtn = await POST('/projectList/countProject', {
        key: key,
        status: status,
        startTime:startTime,
        endTime:endTime,
        type:type
    });
    return rtn;
}
export async function countProjectExcel(
    key,
    status,
    startTime,
    endTime,
    type
) {

    let rtn = {};
    rtn = await POST('/projectList/countProjectExcel', {
        key: key,
        status: status,
        startTime:startTime,
        endTime:endTime,
        type:type
    });
    return rtn;
}
export async function approvalGenerateDoc(
    id
) {
    let rtn = {};
    rtn = await POST('/approval/generateDoc', {
        id: id
    });
    return rtn;
};
export async function estimateGenerateDoc(
    id
) {
    let rtn = {};
    rtn = await POST('/estimate/generateDoc', {
        id: id
    });
    return rtn;
};
export async function establishmentGenerateDoc(
    id
) {
    let rtn = {};
    rtn = await POST('/establishment/generateDoc', {
        id: id
    });
    return rtn;
};
export async function updateProjectStatus(
    id,
    status,
) {
    let rtn = {};
    rtn = await POST('/projectList/updateProjectStatus', {
        id: id,
        status: status
    });
    return rtn;
}

export async function queryProjectListApply(
    key,
    status,
    currentPage,
    pageSize,
    startTime,
    endTime,
    createBy
) {

    let rtn = {};
    rtn = await POST('/projectList/queryProjectList', {
        key: key,
        status: status,
        currentPage: currentPage,
        pageSize: pageSize,
        startTime:startTime,
        endTime:endTime,
        createBy:createBy
    });
    return rtn;
}

export async function queryProjectListByMultipleStatus(
    key,
    status,
    currentPage,
    pageSize,
    startTime,
    endTime,
) {

    let rtn = {};
    rtn = await POST('/projectList/queryProjectListByMultipleStatus', {
        key: key,
        status: status,
        currentPage: currentPage,
        pageSize: pageSize,
        startTime:startTime,
        endTime:endTime
    });
    return rtn;
}

export async function queryProjectListEstimate(
    key,
    status,
    currentPage,
    pageSize,
    startTime,
    endTime,
    total
) {

    let rtn = {};
    rtn = await POST('/projectList/queryProjectListByMultipleStatus', {
        key: key,
        status: status,
        currentPage: currentPage,
        pageSize: pageSize,
        startTime:startTime,
        endTime:endTime,
        total:total
    });
    return rtn;
}

export async function getProjectMessage(
      projectId
) {
    let rtn = {};
    rtn = await POST('/message/getProjectMessage', {
        projectId: projectId
    });
    return rtn;
}

export async function queryProjectCountByStatus(
    projectId
) {
  let rtn = {};
  rtn = await POST('/projectList/queryProjectCountByStatus', {
      status: status
  });
  return rtn;
}


export async function queryReason(
    projectId
  ) {
  let rtn = {};
  rtn = await POST('/message/queryReason', {
    projectId: projectId
  });
  return rtn;
  }

  
export async function addReason(
    detail,
    projectId,
    status
  ) {
  let rtn = {};
  rtn = await POST('/message/addReason', {
    detail:detail,
    projectId: projectId,
    status:status
  });
  return rtn;
  }