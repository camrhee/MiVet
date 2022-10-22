import axios from "axios";
import * as helper from "../../services/serviceHelpers";
import { API_HOST_PREFIX } from "../../services/serviceHelpers";

const API = process.env.REACT_APP_API_HOST_PREFIX;
const vetProfilesService = {
    endpoint: `${API}/api/messages`,
};

vetProfilesService.checkIfVetHasProfile = () =>{
    const config = {
        method: "GET",
        url: `${API_HOST_PREFIX}/api/vetprofiles/initial`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError)
};

vetProfilesService.getAllPaginated = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `${API_HOST_PREFIX}/api/vetprofiles/paginateall/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError)
};

vetProfilesService.search = (pageIndex, pageSize, query, categoryId) => {
    let config 
    if(categoryId){
        config = {
            method: "GET",
            url: `${API_HOST_PREFIX}/api/vetprofiles/searchbycategory/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}&categoryId=${categoryId}`,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
        }
    } else {
    config = {
        method: "GET",
        url: `${API_HOST_PREFIX}/api/vetprofiles/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    }
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError)
};

vetProfilesService.getById = (id) => {
    const config = {
        method: "GET",
        url: `${API_HOST_PREFIX}/api/vetprofiles/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError)
};

vetProfilesService.addProfile = (payload) => {
    const config = {
        method: "POST",
        url: `${API_HOST_PREFIX}/api/vetprofiles`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError)
};

vetProfilesService.updateProfile = (newProfile) => {
    const config = {
        method: "PUT",
        url: `${API_HOST_PREFIX}/api/vetprofiles/${newProfile.id}`,
        data: newProfile,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError)
};

vetProfilesService.getByPracticeId = (id) => {
    const config = {
        method: "GET",
        url: `${API_HOST_PREFIX}/api/vetprofiles/practice/${id}?pageIndex=0&pageSize=10`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError)
};

export default vetProfilesService