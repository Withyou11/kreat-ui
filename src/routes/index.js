import { HeaderOnly, NoLayout } from '~/layouts';
import Newsfeed from '~/pages/Newsfeed';
import Profile_TimeLines from '~/pages/Profile_TimeLines';
import Profile_AboutMe from '~/pages/Profile_AboutMe';
import Profile_Friends from '~/pages/Profile_Friends';
import Profile_Medias from '~/pages/Profile_Medias';
import Login from '~/pages/Login';
import ConfirmEmail from '~/pages/ConfirmEmail';
import DetailPost from '~/pages/DetailPost';
import ForgotPassword from '~/pages/ForgotPassword';
import Settings from '~/pages/Settings';
import VideoCall from '~/pages/VideoCall';
import { useState, useEffect } from 'react';
// public routes

// const [accessToken, setAccessToken] = useState('');
// useEffect(() => {
//     setAccessToken(localStorage.getItem('accessToken'));
// }, [localStorage.getItem('accessToken')]);

const publicRoutes = [
    {
        path: '/',
        component: localStorage.getItem('accessToken') ? Newsfeed : Login,
        layout: localStorage.getItem('accessToken') ? '' : NoLayout,
    },
    { path: '/timelines', component: Profile_TimeLines, layout: HeaderOnly },
    { path: '/timelines/:id', component: Profile_TimeLines, layout: HeaderOnly },
    { path: '/about', component: Profile_AboutMe, layout: HeaderOnly },
    { path: '/friends', component: Profile_Friends, layout: HeaderOnly },
    { path: '/medias', component: Profile_Medias, layout: HeaderOnly },
    { path: '/authentication', component: Login, layout: NoLayout },
    { path: '/confirm', component: ConfirmEmail, layout: NoLayout },
    { path: '/forgot_password', component: ForgotPassword, layout: NoLayout },
    { path: '/settings', component: Settings, layout: HeaderOnly },
    { path: '/post/:id', component: DetailPost, layout: HeaderOnly },
    { path: '/video-call/:id', component: VideoCall, layout: NoLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
