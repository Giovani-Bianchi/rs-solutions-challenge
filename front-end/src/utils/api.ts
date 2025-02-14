import axios from 'axios';

import { useState, useEffect } from 'react';

const CLIENT_ID = '5d083833efaea3d487cf189a201e861db29d8d3a';
const CLIENT_SECRET =
    'eae0e6b53ff8fd8169046d4f53a406c51a5d044dd45110fe4b172f33b38bbe87b3c9cea542f296332701ee43c491884ab30170b6c532ef5c779857b51794eb58d89a40472d4a449170b1fe98467705d2c9b6af932c6afccdf106f243fcebaadaf322a3e57113037e69585e2aeed972e34ecb6d75e2f6243d811cd2dd08b1a3b46b83ff50cafc41c210452a8b49cf05138bd32f2acf80ad86a2bbd9663184244240a40113363f9dbff6e3049e833fa04ce41ded6b6d0f1ef823a97be081a5a61b0e95832d26dc3b518c6c552a93747ec6b172992778f5400798f6233d7d0cbdbada5ed545fd97e3ef04c23685c63b19901f1ec4cb5610a7c290172be26bc0fe7f';

const useApi = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const getToken = async () => {
            try {
                const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
                const authBase64 = btoa(authString);

                const response = await axios.post(
                    'https://integration.plataformaseru.com.br/v1/oauth/token',
                    { grantType: 'client_credentials' },
                    {
                        headers: {
                            Authorization: `Basic ${authBase64}`,
                        },
                    },
                );

                if (response.data && response.data.accessToken) {
                    setToken(response.data.accessToken);
                }
            } catch (error) {
                console.error('Erro ao obter token:', error);
            }
        };

        getToken();
    }, []);

    const api = axios.create({
        baseURL: 'https://integration.plataformaseru.com.br/v1',
    });

    api.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    return api;
};

export default useApi;
