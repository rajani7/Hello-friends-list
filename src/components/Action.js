import React, { useState } from 'react'
import { SCREENS } from '../App'
import '../styles/Action.css'

const Action = ({ addFriend, searchFriend, activeScreen, setactiveScreen }) => {
  const [friendName, setfriendName] = useState('')

  function RenderSearch() {
    return (
      <div>
        <input
          placeholder="Search by typing friend name."
          type="text"
          onChange={searchFriend}
          autoFocus
        ></input>
        <button
          className="search-close"
          title="Go Back"
          onClick={() => setactiveScreen(SCREENS.DEFAULT)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    )
  }

  function RenderAddFriend() {
    return (
      <div>
        <input
          placeholder="Enter your friend name"
          value={friendName}
          onChange={(e) => setfriendName(e.target.value)}
        ></input>
        <button
          className="search-add"
          title="Add new friend"
          disabled={friendName.length === 0}
          onClick={() => {
            addFriend({
              name: friendName,
            })
            setfriendName('')
          }}
        >
          Add
        </button>
        <button
          className="search-close"
          title="Go Back"
          onClick={() => setactiveScreen(SCREENS.DEFAULT)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    )
  }

  function RenderDefaultUI() {
    const btnClass = (str) =>
      activeScreen === str ? 'btn btn-cta active' : 'btn btn-cta'
    return (
      <>
        <button
          className={btnClass(SCREENS.DEFAULT)}
          onClick={() => {
            setactiveScreen(SCREENS.DEFAULT)
          }}
        >
          <i className="fas fa-list-ul"></i>
          <span>View All</span>
        </button>
        <button
          className={btnClass(SCREENS.ADDFRIEND)}
          onClick={() => {
            setactiveScreen(SCREENS.ADDFRIEND)
          }}
        >
          <i className="fas fa-user-plus"></i>
          <span>Add</span>
        </button>
        <button
          className={btnClass(SCREENS.SEARCH)}
          onClick={() => {
            setactiveScreen(SCREENS.SEARCH)
          }}
        >
          <i className="fas fa-search"></i>
          <span>Search</span>{' '}
        </button>
        <button
          className={btnClass(SCREENS.FAVS)}
          onClick={() => {
            setactiveScreen(SCREENS.FAVS)
          }}
        >
          <i className="fas fa-heart"></i>
          <span>Favs</span>
        </button>
      </>
    )
  }

  function renderUI() {
    switch (activeScreen) {
      case SCREENS.DEFAULT:
        return RenderDefaultUI()
      case SCREENS.SEARCH:
        return RenderSearch()
      case SCREENS.ADDFRIEND:
        return RenderAddFriend()

      default:
        return RenderDefaultUI()
    }
  }

  return <div className="action-container">{renderUI()}</div>
}

export default Action
