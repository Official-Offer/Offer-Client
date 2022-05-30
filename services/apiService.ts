import axios from 'axios';

export default axios.create({
    baseURL: "https://dev-api-admin.tokenplay.app/api",
    headers: {
        'Authorization': 'Bearer '+ 'bfc2d4872da46ae420bf3f8b68ac1b445ffa9666e05cc00b3131f0523b786f63bbb72a48f8b344e020e29d1da6e23fae394143f949b435d8b84b5fead975c414d12e078ba8e73e114fd9ab8336d7a0bf7532a0ef1de597efcdb233a459cd1d52f5fb7cf441c8e479c5efba6a693fcec776173e96e5303363a03a8888fd4013e8'
    },
});
