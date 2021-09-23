import React, { useState } from 'react'
import { SCREENS } from '../App'
import '../styles/List.css'

const UsePagination = (rowsPerPage, array) => {
  const mainChunk = []
  const [pageIndex, setPageIndex] = useState(0)
  const canGoNext =
    pageIndex + 1 < Math.ceil(array.length / rowsPerPage) ? true : false
  const canGoPrev = pageIndex === 0 ? false : true

  if (rowsPerPage > 0) {
    let chunk = []
    array.forEach((row, i) => {
      if (chunk.length === rowsPerPage) {
        mainChunk.push(chunk)
        chunk = []
      }

      chunk.push(row)

      if (array.length === i + 1) {
        mainChunk.push(chunk)   
      }
    })
  }

  const goNext = () => {
    setPageIndex((prev) => prev + 1)
  }

  const goPrev = () => {
    setPageIndex((prev) => prev - 1)
  }

  const gotoPage = (index) => {
    let maxPagesNo = Math.ceil(array.length / rowsPerPage)
    let gotoIndex = Number(index)
    
    // handle boundary for pageIndex and sanitize inputs
    if (gotoIndex >= maxPagesNo) {
      gotoIndex = maxPagesNo - 1
    }
    if (gotoIndex < 1) {
      gotoIndex = 0
    }

    setPageIndex(gotoIndex)
  }

  const getRows = (pageIndex) => {
    if(!mainChunk?.length) return [];
    if(mainChunk[pageIndex]) return mainChunk[pageIndex]
    

    if(pageIndex >= mainChunk.length) {
      gotoPage(pageIndex--)
    }
  }

  return {
    friends: getRows(pageIndex),
    goNext,
    goPrev,
    gotoPage,
    pageIndex,
    canGoNext,
    canGoPrev,
  }
}

const List = ({
  friends: rows,
  activeScreen,
  toggleFav,
  deleteFriend,
  fav,
}) => {
  const {
    friends = [],
    goNext,
    goPrev,
    pageIndex,
    canGoNext,
    canGoPrev,
    gotoPage,
  } = UsePagination(4, rows)

  // console.log("knasd", friends, pageIndex);

  if (friends?.length === 0 && activeScreen === SCREENS.SEARCH) {
    return <p>No matching friends found!</p>
  }

  if (friends.length === 0 && activeScreen === SCREENS.DEFAULT) {
    return (
      <p>
        <b>Add friends</b> to view all your friends here.
      </p>
    )
  }

  function renderScreenHeading(params) {
    switch (activeScreen) {
      case SCREENS.SEARCH:
        return `Search Results (${friends.length})`
      case SCREENS.FAVS:
        return 'Sort by Favorite Friends'

      default:
        return 'My Friends'
    }
  }

  return (
    <>
      <div className="list-container">
        {friends?.length ? <h4>{renderScreenHeading()}</h4> : null}
        {friends?.map((friend, i) => {
          return (
            <div key={friend.id} className="friend-list">
              <span className="list-name">
                <span className="list-medium-text">{friend.name}</span>
                <span className="list-small-text">is your friend</span>
              </span>
              <button className="list-btn" onClick={() => toggleFav(friend.id)}>
                {friend.isFavorite ? (
                  <i title='add favorite' className="fas fa-star"></i>
                ) : (
                  <i title='remove favorite' className="far fa-star"></i>
                )}
              </button>
              <button
                className="list-btn"
                onClick={() => deleteFriend(friend.id)}
              >
                <i title='Delete' className="far fa-trash-alt"></i>
              </button>
            </div>
          )
        })}
      </div>
      {friends.length ? (
        <div className="pagination">
          <button className="btn" onClick={goPrev} disabled={!canGoPrev}>
            Prev
          </button>
          <input
            type="number"
            value={Number(pageIndex + 1)}
            onChange={(e) => gotoPage(e.target.value - 1)}
          ></input>
          <button className="btn" onClick={goNext} disabled={!canGoNext}>
            Next
          </button>
        </div>
      ) : null}
    </>
  )
}
export default List
