import request from './apiService'

export const getSchoolList = async () => {
  const response = await request.get(`/schools/`);
  return response.data;
}

export const getSchool = async (id: number) => {
  const response = await request.get(`/schools/${id}/`);
  return response.data.message; // For some reasons the data is in the message field
}

export const getSchoolsForRecruiter = async (id: number) => {
  const response = (await request.get(`/schools/`)).data;
  const jobs = (await request.get(`/jobs/`)).data;
  var noJobs = {};
  var res = [];
  for (const job of jobs) {
    for (const school in job.schools) {
      if (noJobs[school]) noJobs[school] = 1;
      else noJobs[school] += 1;
    }
  }
  for (const school of response) {
    res.push({
      key: school.id,
      ID: school.id,
      name: school.name,
      description: school.description || "No description",
      noStudents: 10000,
      noJobs: noJobs[school.id],
      tag: 'Whatever',
    });
  }
  return res;
}