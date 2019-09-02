










    字段名       	数据类型      长度      主键        描述              外键
   id             int(11      否ENT COMMENT '主键                否
   projectName      varchar(100      否 '项目名称                否
   department             varchar(100      否 '申请部门                否
   applyTime             datetime DEFAULT NULL COMMENT '申请时间                否
   constructionTime` varchar(50      否 '建设时间                否
   field             varchar(50      否OMMENT '项目场地                否
   fund             varchar(5      否COMMENT '项目建设资金                否
   fundSource             tinyint(4)      否资金来源(1.财政专项,2.学校预算 3.部门预算 4.其他渠道)                否
   necessity             varchar(500      否 '项目建设必要性                否
   goal1             varchar(500      否 '项目建设目标1                否
   goal2             varchar(500      否 '项目建设目标2                否
   goal3             varchar(500      否 '项目建设目标3                否
   goal4             varchar(500      否 '项目建设目标4                否
   goal5             varchar(500      否 '项目建设目标5                否
   goal6             varchar(500      否 '项目建设目标6                否
   departmentLeader             varchar(100      否 '申请部门负责人                否
   contact             varchar(100      否 '申请部门联系人                否
   phone             varchar(50      否 '联系人电话                否
   constructionAdvise             varchar(500      否 '项目建设部门估算及意见                否
   developmentAdvise             varchar(500      否 '规划发展处意见                否
   isDelete             tinyint(4      否'删除标识（0：未删除；1：已删除）                否
   createBy             varchar(100      否 '创建者                否
   createTime             datetime DEFAULT NULL COMMENT '创建时间                否
   modifyBy             varchar(100      否 '修改者                否
   modifyTime             datetime DEFAULT NULL COMMENT '修改时间' 否