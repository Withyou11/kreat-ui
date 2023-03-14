import { HeaderOnly } from '~/layouts';
import Newsfeed from '~/pages/Newsfeed';
import Profile_TimeLines from '~/pages/Profile_TimeLines';
// public routes
const publicRoutes = [
    { path: '/', component: Newsfeed },
    { path: '/timelines', component: Profile_TimeLines, layout: HeaderOnly },
    { path: '/:nickname', component: Profile_TimeLines, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
