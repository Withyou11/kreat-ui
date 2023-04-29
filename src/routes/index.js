import { HeaderOnly } from '~/layouts';
import Newsfeed from '~/pages/Newsfeed';
import Profile_TimeLines from '~/pages/Profile_TimeLines';
import Profile_AboutMe from '~/pages/Profile_AboutMe';
import Profile_Friends from '~/pages/Profile_Friends';
import Profile_Medias from '~/pages/Profile_Medias';
// public routes
const publicRoutes = [
    { path: '/', component: Newsfeed },
    { path: '/timelines', component: Profile_TimeLines, layout: HeaderOnly },
    { path: '/:nickname', component: Profile_TimeLines, layout: HeaderOnly },
    { path: '/about', component: Profile_AboutMe, layout: HeaderOnly },
    { path: '/friends', component: Profile_Friends, layout: HeaderOnly },
    { path: '/medias', component: Profile_Medias, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
