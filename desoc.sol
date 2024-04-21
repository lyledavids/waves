// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Waves {
    // Structure to represent a post
    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }

    // Structure to represent a user
    struct User {
        address userAddress;
        string username;
        string bio;
        uint256 postCount;
        mapping(uint256 => uint256) posts;
        mapping(address => bool) followers;
    }

    // State variables
    uint256 public postCounter;
    mapping(uint256 => Post) public posts;
    mapping(address => User) public users;

    // Events
    event PostPosted(address indexed author, uint256 postId, string content);
    event PostLiked(uint256 postId, address indexed liker);
    event Followed(address indexed follower, address indexed followed);
    event Unfollowed(address indexed follower, address indexed unfollowed);
    event BioUpdated(address indexed user, string newBio);

    // Function to post a post
    function postPost(string memory _content) public {
        require(bytes(_content).length > 0, "Content cannot be empty");

        // Increment post counter
        postCounter++;
        
        // Create new post
        Post storage newPost = posts[postCounter];
        newPost.id = postCounter;
        newPost.author = msg.sender;
        newPost.content = _content;
        newPost.timestamp = block.timestamp;
        newPost.likes = 0;

        // Add post to user
        users[msg.sender].posts[users[msg.sender].postCount] = postCounter;
        users[msg.sender].postCount++;

        // Emit event
        emit PostPosted(msg.sender, postCounter, _content);
    }

    // Function to like a post
    function likePost(uint256 _postId) public {
        require(posts[_postId].id > 0, "Post does not exist");
        
        // Increment likes
        posts[_postId].likes++;
        
        // Emit event
        emit PostLiked(_postId, msg.sender);
    }

    // Function to follow another user
    function followUser(address _followedUser) public {
        require(_followedUser != msg.sender, "Cannot follow yourself");

        // Mark the user as a follower
        users[_followedUser].followers[msg.sender] = true;

        // Emit event
        emit Followed(msg.sender, _followedUser);
    }

    // Function to unfollow another user
    function unfollowUser(address _unfollowedUser) public {
        require(_unfollowedUser != msg.sender, "Cannot unfollow yourself");

        // Mark the user as not a follower
        users[_unfollowedUser].followers[msg.sender] = false;

        // Emit event
        emit Unfollowed(msg.sender, _unfollowedUser);
    }

    // Function to update user's bio
    function updateBio(string memory _newBio) public {
        require(bytes(_newBio).length > 0, "Bio cannot be empty");

        // Update user's bio
        users[msg.sender].bio = _newBio;

        // Emit event
        emit BioUpdated(msg.sender, _newBio);
    }

    // Function to get the number of likes on a post
    function getLikes(uint256 _postId) public view returns (uint256) {
        return posts[_postId].likes;
    }

    // Function to get the content of a post
    function getPostt(uint256 _postId) public view returns (string memory) {
        return posts[_postId].content;
    }

    // Function to get the number of posts a user has made
    function getUserPostCount(address _user) public view returns (uint256) {
        return users[_user].postCount;
    }

    // Function to get posts posted by a user
    function getPostsOfUser(address _user) public view returns (uint256[] memory) {
        uint256[] memory userPosts = new uint256[](users[_user].postCount);
        for (uint256 i = 0; i < users[_user].postCount; i++) {
            userPosts[i] = users[_user].posts[i];
        }
        return userPosts;
    }

    // Function to get likes of a user
    function getLikesOfUser(address _user) public view returns (uint256) {
        uint256 totalLikes;
        for (uint256 i = 1; i <= postCounter; i++) {
            if (posts[i].author == _user) {
                totalLikes += posts[i].likes;
            }
        }
        return totalLikes;
    }

    // Function to get all posts
    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](postCounter);
        for (uint256 i = 1; i <= postCounter; i++) {
            allPosts[i - 1] = posts[i];
        }
        return allPosts;
    }

    // Function to get user profile
    function getUserProfile(address _user) public view returns (string memory, string memory) {
        return (users[_user].username, users[_user].bio);
    }

    // // Function to get suggested users to follow
    // function getSuggestedUsers() public view returns (address[] memory, string[] memory) {
    //     address[] memory suggestedAddresses = new address[](3);
    //     string[] memory suggestedUsernames = new string ;
    //     uint256 count;
    //     for (uint256 i = 0; i < 3 && count < 3; i++) {
    //         if (!users[msg.sender].followers[users[users[msg.sender].userAddress + i].userAddress] && users[users[msg.sender].userAddress + i].userAddress != msg.sender) {
    //             suggestedAddresses[count] = users[users[msg.sender].userAddress + i].userAddress;
    //             suggestedUsernames[count] = users[users[msg.sender].userAddress + i].username;
    //             count++;
    //         }
    //     }
    //     return (suggestedAddresses, suggestedUsernames);
    // }
}
