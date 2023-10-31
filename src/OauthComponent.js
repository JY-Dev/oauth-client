import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FacebookOauthComponent() {
    return (
        <div>
            <h1>페이스북</h1>
        </div>
    );
}

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