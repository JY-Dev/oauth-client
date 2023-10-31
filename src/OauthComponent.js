import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacebookOauthComponent = () => {
    const [isLoggedin, setIsLoggedin] = useState(false);

    const onLoginClick = () => {
        window.FB.login(function (response) {
            const authResponse = response.authResponse;
            const requestData = new URLSearchParams();
            requestData.append('accessToken', authResponse.accessToken);
            if(authResponse) {
                axios.post('http://localhost:8080/public/auth/sign-in/facebook', requestData , {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(response => {
                        // 성공 시 처리
                        console.log(response);
                    })
                    .catch(error => {
                        // 실패 시 처리
                        console.error(error);
                    })
            }
        });
    };

    useEffect(() => {
        window.fbAsyncInit = () => {
            window.FB.init({
                appId            : '1279027846129707',
                xfbml            : true,
                version          : 'v18.0'
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    return (
        <div><button onClick={onLoginClick}>Login with Facebook</button></div>
    );
};

const GoogleOauthComponent = () => {
    const [responseData, setResponseData] = useState(null);
    const clientId = '49790634779-dovdfpe3pveg6c4phldc5tp6upv726im.apps.googleusercontent.com'
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(response) => {
                        const accessToken = response.credential;
                        const requestData = new URLSearchParams();
                        requestData.append('accessToken', accessToken);

                        axios.post('http://localhost:8080/public/auth/sign-in/google', requestData, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                            .then(response => {
                                setResponseData(response.data.result);
                                console.log(response);
                            })
                            .catch(error => {
                                console.error('Error sending HTTP request:', error);
                            });
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                />
                <div>
                    {responseData ? (
                        // API 응답이 있을 경우 동적으로 렌더링
                        <div>
                            <h1>{responseData.sub}</h1>
                            <h1>{responseData.name}</h1>
                            <h1>{responseData.email}</h1>
                        </div>
                    ) : (
                        // API 응답이 없을 경우의 렌더링
                        <p>Loading...</p>
                    )}
                </div>
            </GoogleOAuthProvider>
        </>
    );
};

export {FacebookOauthComponent, GoogleOauthComponent} ;