import {
    queryProjectList,

} from './http';

export async function getProjectList(key,status, currentPage, pageCount) {
    var res = await queryProjectList(
        key,
        status,
        currentPage,
        pageCount
    );
    var projectList = res.projectList.map((i_v, i_k) => {
        var o_v = {
            id: i_v.id,
            projectName: i_v.projectName,
            establishment: i_v.establishment,
            estimate:i_v.estimate,
        };
        return o_v;
    });
    return {
        pageSize: res.pageCount,
        currentPage: res.currentPage,
        caseCount: res.caseCount,
        projectList: projectList
    };
}
