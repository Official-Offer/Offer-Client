import { companyList } from './companyList';
import { majorList } from './majorList';
import { schoolList } from './schoolList';
import { skillList } from './skillList';

type Option = {
    value: string;
    label: string;
}

export const process = (list: any[]): Option[] => {
    return list.map(item => {
        return {
            value: item.value || item.pk || item.id,
            label: item.label || item.name
        }
    })
}

export const value_to_label = (value: string, dict: Option[]) => {
    const item = dict.find(item => item.value === value);
    return item ? item.label : "";
}

export const processedMajorList = process(majorList);
export const processedCompanyList = process(companyList);
export const processedSchoolList = process(schoolList);
export const processedSkillList = process(skillList);
export {
    skillList,
    companyList,
    majorList,
    schoolList,
}