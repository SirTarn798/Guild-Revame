import './FollowingContent.css'
import FullReview from './FullReview/FullReview';

function FollowingContent() {
    return(
        <div className='followingContentContainer'>
            <h1>Reviews from accounts you followed</h1>
            <FullReview/>
            <FullReview/>

        </div>
    )
}

export default FollowingContent;