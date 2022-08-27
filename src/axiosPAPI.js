import axios from 'axios';

const instance = axios.create({
    //baseURL: 'https://asia-south1-midyamezonclone.cloudfunctions.net/api',

    baseURL: 'http://localhost:8000',
});

export default instance;