const buttonGetCount = document.getElementById('get-count');
const buttonStoreData = document.getElementById('store-data');
const retrieveOutput = document.getElementById('retrieve-output');
const storeOutput = document.getElementById('store-output');
const storeValueInput = document.getElementById('store-value');


const contractAddress = "0xDcb7A503B22533A8B68A42B4e1328f0B950E571e";

const contractABI = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "newBio",
                    "type": "string"
                }
            ],
            "name": "BioUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "follower",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "followed",
                    "type": "address"
                }
            ],
            "name": "Followed",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_followedUser",
                    "type": "address"
                }
            ],
            "name": "followUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_postId",
                    "type": "uint256"
                }
            ],
            "name": "likePost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "liker",
                    "type": "address"
                }
            ],
            "name": "PostLiked",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_content",
                    "type": "string"
                }
            ],
            "name": "postPost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "content",
                    "type": "string"
                }
            ],
            "name": "PostPosted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "follower",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "unfollowed",
                    "type": "address"
                }
            ],
            "name": "Unfollowed",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_unfollowedUser",
                    "type": "address"
                }
            ],
            "name": "unfollowUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_newBio",
                    "type": "string"
                }
            ],
            "name": "updateBio",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllPosts",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "author",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "content",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "likes",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Waves.Post[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_postId",
                    "type": "uint256"
                }
            ],
            "name": "getLikes",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getLikesOfUser",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getPostsOfUser",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_postId",
                    "type": "uint256"
                }
            ],
            "name": "getPostt",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getUserPostCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getUserProfile",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "postCounter",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "posts",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "content",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "likes",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "users",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "bio",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "postCount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

// Function names based on the  ABI
const retrieveFunction = "retrieve";
const storeFunction = "store";

// Ensure script execution after DOMContentLoaded (prevents errors)
document.addEventListener('DOMContentLoaded', async function() {
    buttonGetCount.addEventListener('click', async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            try {
                // Request user account connection (if not already connected)
                await provider.send("eth_requestAccounts");
                const signer = provider.getSigner();

                
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                // Retrieve data
                const data = await contract[retrieveFunction]();
                const stringData = data.toString(); // Convert number to string

                retrieveOutput.textContent = "Number of Tweets: " + stringData;
            } catch (error) {
                console.error(error);
                retrieveOutput.textContent = "Error: " + error.message;
            }
        } else {
            retrieveOutput.textContent = "Please install MetaMask!";
        }
    });

    buttonStoreData.addEventListener('click', async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            try {
                // Request user account connection (if not already connected)
                await provider.send("eth_requestAccounts");
                const signer = provider.getSigner();

                
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                // Get the value to store from the user input
                const storeValue = parseInt(storeValueInput.value);
                if (isNaN(storeValue)) {
                    storeOutput.textContent = "Please enter a valid number!";
                    return;
                }

                // Call the store function (requires a transaction)
                const tx = await contract[storeFunction](storeValue);
                await tx.wait(); // Wait for transaction confirmation

                storeOutput.textContent = "Data stored successfully!";
            } catch (error) {
                console.error(error);
                storeOutput.textContent = "Error: " + error.message;
            }
        } else {
            storeOutput.textContent = "Please install MetaMask!";
        }
    });
}); // End of DOMContentLoaded event listener


async function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
        // Prompt user to connect to WalletConnect
        await provider.send("wallet_requestPermissions", [{ eth_accounts: {} }]);
        const accounts = await provider.send("eth_requestAccounts");
        
        // Display connected wallet address
        document.getElementById('walletadd').textContent = "Connected Wallet Address: " + accounts[0];
    } catch (error) {
        console.error(error);
        // Handle errors here
    }
}

// Add event listener to the Connect button
document.getElementById('walletconnect').addEventListener('click', connectWallet);