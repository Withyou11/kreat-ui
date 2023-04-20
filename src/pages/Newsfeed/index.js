import ListPosts from '~/components/ListPosts';
import PostForm from '~/components/PostForm';

function Newsfeed() {
    return (
        <div>
            <PostForm />
            <ListPosts></ListPosts>
        </div>
    );
}

export default Newsfeed;
