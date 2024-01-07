import { companyList } from './companyList';
import { majorList } from './majorList';
import { schoolList } from './schoolList';
import { skillList } from './skillList';
import { formatAPIData } from '@utils/formatters/dataFormat';

export const processedMajorList = formatAPIData(majorList);
export const processedCompanyList = formatAPIData(companyList);
export const processedSchoolList = formatAPIData(schoolList);
export const processedSkillList = formatAPIData(skillList);
export {
    skillList,
    companyList,
    majorList,
    schoolList,
}