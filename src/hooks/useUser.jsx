import axios from 'axios';

const useUser = () => {
    const API_HOST = "https://proyecto-asw-api.herokuapp.com";
    const getUser = async(username) => {
        try {
            const result = await axios.get(`${API_HOST}/api/user/`, { params: { username: username } });
            //console.log(result.data.user);
            return result.data.user;
        } catch (error) {
            console.log(error);
        }
    }

    return { getUser };
};

export default useUser;