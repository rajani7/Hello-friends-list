import { useEffect, useState } from 'react'
import './App.css'
import Action from './components/Action'
import List from './components/List'

export const SCREENS = {
  DEFAULT: 'DEFAULT',
  SEARCH: 'SEARCH',
  ADDFRIEND: 'ADDFRIEND',
  FAVS: 'FAVS',
}
function App() {
  const list = [
    {
      id: 0,
      name: 'harish',
      isFavorite: false,
    },
    {
      id: 1,
      name: 'Rajani',
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Priya',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'deepak',
      isFavorite: true,
    },
  ]

  const [friends, setFriends] = useState(list)
  const [filteredFriends, setfilteredFriends] = useState([])
  const [activeScreen, setactiveScreen] = useState(SCREENS.DEFAULT)
  const [isSearching, setIsSearching] = useState(false)

  const toggleFav = (id) => {
    const clonedFriends = [...friends]
    const findFriend = clonedFriends.findIndex((f) => f.id === id)
    clonedFriends[findFriend].isFavorite = !clonedFriends[findFriend].isFavorite
    setFriends(clonedFriends)
  }

  const deleteFriend = (id) => {
    var result = window.confirm('Are you sure you want to delete?')
    if (result) {
      const newFriendList = friends.filter((friend) => {
        return friend.id !== id
      })

      filterFavFriends(newFriendList)
      setFriends(newFriendList)
    }
  }

  const searchFriend = (e) => {
    const key = e.target.value.toLowerCase()

    if (key?.length) setIsSearching(true)
    else setIsSearching(false)

    const matchingFriends = friends?.filter((friend) =>
      friend.name.toLowerCase().includes(key),
    )
    setfilteredFriends(matchingFriends)
  }

  const addFriend = (newFriend) => {
    let payload = {
      name: newFriend.name,
      id: friends.length,
      isFavorite: false,
    }

    setFriends((prevState) => [payload,...prevState])
  }

  const filterFavFriends = (list) => {
    if (activeScreen === SCREENS.DEFAULT) {
      return
    }
    const favFriends = []
    const notFavFriends = []
    list.forEach((f) => {
      if (f.isFavorite) favFriends.push(f)
      else notFavFriends.push(f)
    })

    setfilteredFriends([...favFriends, ...notFavFriends])
  }

  useEffect(() => {
    if (activeScreen === SCREENS.DEFAULT) {
      setfilteredFriends([])
    }

    if (activeScreen === SCREENS.FAVS) {
      filterFavFriends(friends)
    }
  }, [activeScreen])

  const friendsToRender = () => {
    switch (activeScreen) {
      case SCREENS.FAVS:
        return filteredFriends
      case SCREENS.SEARCH:
        return isSearching ? filteredFriends : friends
      default:
        return friends
    }
  }

  return (
    <div className="app">
      <div className="main">
        <Action
          addFriend={addFriend}
          searchFriend={searchFriend}
          setactiveScreen={setactiveScreen}
          activeScreen={activeScreen}
        ></Action>
        <div className="hr"></div>
        <List
          friends={friendsToRender()}
          toggleFav={toggleFav}
          deleteFriend={deleteFriend}
          activeScreen={activeScreen}
        ></List>
      </div>
    </div>
  )
}

export default App
