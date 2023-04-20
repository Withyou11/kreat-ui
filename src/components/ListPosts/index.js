import Post from '../Post';
import ListPost from '~/StaticData/ListPost';
function ListPosts() {
    // Call API here

    return (
        <div>
            {ListPost.map((post) => (
                <div key={post.id_post}>
                    <Post data={post} />
                </div>
            ))}
        </div>
    );
}

export default ListPosts;
