import Axios from "axios";
// true for heroku false for local

const environment = window.location.origin === 'http://localhost:3000';
const platform = window.navigator.platform;
const baseURL =    environment ? platform === 'Win32'? 'http://localhost:5000': '192.168.1.244:5000' :'https://bkeeperserver.herokuapp.com' ;
const { get:g, put:u, post:p , delete:d } = Axios;
const config = {headers:{'auth-token':sessionStorage.getItem('auth-token')}};
const routes = {
    user:'/user',
    artist:'/artist',
    project:'/project',
    session:'/session',
    appointment:'/appointment',
    payment:'/payment',
    login:'/login',
};
const makeUrl = (route) => `${baseURL}${routes[route]}`;

/**
 *
 *
 * @returns
 */
function Request( ){
    return {
            user:{
                post:   (data)    => p(`${makeUrl('user')}/`,data),
                get:    ()      => g(`${makeUrl('user')}/`,config),
                getWithId:    (id)      => g(`${makeUrl('user')}/${id}`,config),
                update: (id,data) => u(`${makeUrl('user')}/${id}`,data,config),
                delete: (id)      => d(`${makeUrl('user')}/${id}`,config),
            },
            artist:{
                post:   (data) => p(`${makeUrl('artist')}/`,data,config),
                get:    () => g(`${makeUrl('artist')}/`,config),
                update: (id,data) => u(`${makeUrl('artist')}/${id}`,data,config),
                delete: (id) => d(`${makeUrl('artist')}/${id}`,config),
            },
            project:{
                post:   (artistID,data) =>p(`${makeUrl('project')}/${artistID}`,data,config),
                get:    (artistID)      =>g(`${makeUrl('project')}/${artistID}`,config),
                update: (artistID,id,data) =>u(`${makeUrl('project')}/${artistID}/${id}`,data,config),
                delete: (artistID,id)      =>d(`${makeUrl('project')}/${artistID}/${id}`,config),
            },
            session:{
                post:  (artistID,projectID,data)=>p(`${makeUrl('session')}/${artistID}/${projectID}`,data,config),
                get:   (artistID,projectID)=>g(`${makeUrl('session')}/${artistID}/${projectID}`,config),
                update:(artistID,projectID,id,data)=>u(`${makeUrl('session')}/${artistID}/${projectID}/${id}`,data,config),
                delete:(artistID,projectID,id)=>d(`${makeUrl('session')}/${artistID}/${projectID}/${id}`,config),
            },
            appointment:{
                post:   (data)=>{p(`${makeUrl('appointment')}`,data,config)},
                get:    ()=>{g(`${makeUrl('appointment')}`,config)},
                update: (id,data)=>{u(`${makeUrl('appointment')}/${id}`,data,config)},
                delete: (id)=>{d(`${makeUrl('appointment')}/${id}`,config)},
            },
            payment:{
                post:  (artistID,projectID,data)    =>p(`${makeUrl('payment')}/${artistID}/${projectID}`,data,config),
                get:   (artistID,projectID)         =>g(`${makeUrl('payment')}/${artistID}/${projectID}`,config),
                update:(artistID,projectID,id,data) =>u(`${makeUrl('payment')}/${artistID}/${projectID}/${id}`,data,config),
                delete:(artistID,projectID,id)      =>d(`${makeUrl('payment')}/${artistID}/${projectID}/${id}`,config),
            },
                login:(data)=>p(`${makeUrl('login')}/`,data)
            }
}
const requester = new Request();
export default requester

