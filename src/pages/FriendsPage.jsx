import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";
import { getUserFriends } from '../lib/api';
import NoFriendsFound from '../components/NoFriendsFound';

// Helper function to get language flags
const getLanguageFlag = (language) => {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
};

// FriendCard Component
const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};


// Main FriendsPage component
const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch friends data using the API function
    const fetchFriends = async () => {
      try {
        const friendsData = await getUserFriends();
        setFriends(friendsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching friends:', error);
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Friends</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          {friends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map(friend => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          ) : (
            <NoFriendsFound />
          )}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;