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
    const clientId = 'client-key'
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(response) => {
                        const accessToken = response.credential;
                        axios.get('http://localhost:8080/oauth/me/google', {
                            params : {
                                "accessToken" : accessToken
                            }
                        }).then(response => {
                                setResponseData(response.data.result)
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