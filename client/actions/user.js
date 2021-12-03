import cookie from 'js-cookie';
import getConfig from 'next/config'
import axios from 'axios';


/**
 * Retrieve users respecting the query parameters.
 * @param props Object containing query parameters.
 * @returns List all items that exist in users.
 */
export const getUser =  (uid)  => {

    return axios.get(`${process.env.NEXT_PUBLIC_BACK_API_URL}/user/${uid}`)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
};



