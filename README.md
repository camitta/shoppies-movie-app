UX Developer Intern & Web Developer Intern Challenge - Fall 2021
The Shoppies: Movie awards for entrepreneurs

Shopify has branched out into movie award shows and we need your help. Please build us an app to help manage our movie nominations for the upcoming Shoppies.

The Challenge

We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

We'd like a simple to use interface that makes it easy to:
Search OMDB and display the results (movies only)
Add a movie from the search results to our nomination list
View the list of films already nominated
Remove a nominee from the nomination list

Technical requirements
Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx).
Each search result should list at least its title, year of release and a button to nominate that film.
Updates to the search terms should update the result list
Movies in search results can be added and removed from the nomination list.
If a search result has already been nominated, disable its nominate button.
Display a banner when the user has 5 nominations.


Extras

There is a lot to be improved on here, you can polish the required features by crafting a nicer design, or improve the app by adding new features! Choose something that you feel best showcases your passion and skills.

If you need inspiration, here are examples of what you can work on. If you work on these ideas, we recommend choosing only one or two.


  Save nomination lists if the user leaves the page
  Animations for loading, adding/deleting movies, notifications
  Create shareable links
Submission

Please submit your application via “Apply Now” and make sure you include:
  A link to your hosted code so we can test it (Free hosting available via: Github pages, Netlify and heroku)
  A link to your Github repository containing the code
  Any other notes you'd like us to consider alongside the page


![page load](./readme-assets/page-load.gif)

# the-shoppies
An app to help manage movie nominations for the Shoppies Awards. Submission for the Shopify UX Developer Intern & Web Developer Intern Challenge - Fall 2021
# [🔗 View Deployed App](https://shoppies-movie-app-ac.netlify.app/)

## Table Of Contents
* [The Challenge](#The-Challenge)
* [My Approach](#My-Approach)
* [Tech Used](#Tech-Used)
* [Feature Highlights](#Feature-Highlights)
* [Future Additions](#Future-Additions)

---
## The Challenge

* Build webpage that searches OMDB API for movies
* Allow users to nominate up to 5 favorite films
* Notify user when they're finished
* Simple and intuitive UI

### Technical Requirements

* The ability to search the OMDB API and return a list of movies that show at least the title, release year and a button to nominate them.
* Search results should only be of movies.
* Updates to the search terms should update the result list.
* If a movie has been nominated already, it's button should be disabled within in search results.
* Nominated movies should move to their own "Nomination List".
* Movies in the nomination list should be able to be removed.
* Display a banner when the user has 5 nominations.

### Provided Reference Image
![Reference Image](./readme-assets/reference-image.png)

### Extras
Add animations and give attention to the design and layout.

[Back To Top](#Table-Of-Contents)

---
## Tech Used
* React.js (Hooks)
* Axios
* OMDB API
* Dot ENV
* React Router
* Redux
* Redux-Thunk
* Node SASS
* CSS Animations
* CSS Grids
* Flexbox
* Local Storage
* Netlify


[Back To Top](#Table-Of-Contents)


---

## Feature Highlights

### Responsive Layout

![Responsive Layout](./readme-assets/responsive-layout.gif)

Layouts are archived with CSS Grids, Flexbox, Transform and Relative/Absolute positioning. I used SCSS mixins and variables to standardize the media queries across the site and ensure an optimized layout for all screens.

```scss
@mixin xxlMinBreakPoint {
    @media (min-width: #{$screen-xxl}) {
        @content;
    }
}

@mixin customMinBreakPoint($size) {
    @media (min-width: $size+'px') {
        @content;
    }
 }
```

### Animation Storage
There are many css animations used across the site to introduce and exit difference elements. I created some manually and generated others with [animista.net](https://animista.net/). To help streamline the SCSS files I placed the actual keyframes into an "_animations.scss" partial file. This allowed animations to be re-used without repeating code and reduced the overall size of the main SCSS files.

```
components
|— WinnerWrapper
|— — winnerWrapper.js <--- uses animation

sassStyles
|— _animations.scss <--- stores animation
|— _functions.scss
|— _global.scss
|— •••
```

### Debounce
To ensure that multiple api calls are not made with each letter inputted, I used a debounce custom hook to delay the api call until the user finished typing.

```js
 // Sends search term to API
useEffect(() => {

    // Cancels search if nothing is inputted
    if (!searchTerm) {
        return;
    }

    // Send search term to Redux once the Denouncer Hook is ready
    if (debouncedSearchTerm) {
        searchOmdbApi(action.searchOmdb(searchTerm, searchSeries));
    }

}, [debouncedSearchTerm]);
```

### A Spinner/Loader Is Shown During API Calls
This helps the user know something is happening if the API doesn't respond right away.

```jsx
 // Search Results Display
let searchResults = null;

 // If the person is currently searching...
if (searching) {

    // ...Then a loader will show until the api returns results
    if (searchLoadingStatus || nominationLoadingStatus) {
        searchResults = <Loader />
    } else {

        // Stores the MovieSearchMetaInfo component (which gets mapped through)
        searchResults = movieListArray && movieListArray.map((movie, index) => {

            // Checks if movie has been nominated already
            const isNominated = nominationList.find(result => result.Title === movie.Title)

            return <MovieSearchMetaInfo
                key={movie.imdbID}
                exitResults={triggerExitResults}
                title={movie.Title}
                year={movie.Year}
                type={movie.Type}
                index={index}
                disable={isNominated}
                handleClick={() => handleNominate(movie.Title, movie.Year)}
            />
        });
    }
}
```

### Series / Movie Switcher & Series Release Year Fix
Since some people pefer The Office over Star Wars, I felt it was important to also allow people to search series. However, this is a separated from the movie search, to follow the project requirements.

First the Search Action Creator (using redux-thunk) checks to see if the user searching movies or a series.

```jsx
// OMDB Movie API
let omdbUrl = null;

// Check to see the user media type preference
if (seriesToggle) {
    omdbUrl = `https://www.omdbapi.com/?s=${searchTerm}&type=series&apikey=${process.env.REACT_APP_OMDB_KEY}`;
} else {
    omdbUrl = `https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${process.env.REACT_APP_OMDB_KEY}`;
}
```

It then makes the API call. The response is run through several checks, which are described in the below comments.

```jsx
axios.get(omdbUrl)
    .then((res) => {
        const response = res.data;

        if (response.Response) {
            let resultList = response.Search;

            // Checks if the results list is an array to prevent an error
            if (Array.isArray(resultList)) {

                // Limits the search results to 3 if needed
                resultList = resultList.length > 3 ? resultList.slice(0, 3) : resultList;

                // Series that are still going don't come formatted nicely
                // This loop adds a "Present" to the end if needed
                // Some movies also come formatted incorrectly and they are fixed here
                resultList.forEach(result => {

                    // Creates an array of the year
                    let resultYearArray = result.Year.split('');

                    // If there is no end date this will add a "Present"
                    if (resultYearArray.length < 6
                        && result.Type === "series") {
                        let updatedResultYear = resultYearArray.concat("Present")

                        return result.Year = updatedResultYear.join("")
                    }

                    // If a movie has "-Present", this will remove it
                    if (resultYearArray.length > 4
                        && result.Type === "movie") {
                        let updatedResultYear = resultYearArray.slice(0, 4)

                        return result.Year = updatedResultYear.join("")
                    }
                });
            }

            // Sends the final array to another action creator that talks to the reducer
            dispatch(searchSucceeded(resultList))
        }
```

### Reducer Helper Functions
Helper functions are used within the Reducer stores, to make the switch cases more streamline.

```jsx
// Function example that contains some logic
const nominationSuccess = (state, action) => {
    let updatedNominationList = null;

    const movieAlreadyNominated = state.nominationList.find(result => result.Title === action.omdbResult.Title)

    if (movieAlreadyNominated) {
        updatedNominationList = state.nominationList;
    } else {
        updatedNominationList = state.nominationList.concat(action.omdbResult)
    }

    return updateObject(state, {
        loading: false,
        error: false,
        nominationList: updatedNominationList
    });
}

// Greatly streamlined switch case
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NOMINATED_STARTED:
            return nominationStarted(state, action);
        case actionTypes.NOMINATED_SUCCESS:
            return nominationSuccess(state, action); // <--- one line used
        case actionTypes.NOMINATED_FAILED:
            return nominationFailed(state, action);
        case actionTypes.NOMINATION_CANCELED:
            return nominationCanceled(state, action);
        case actionTypes.NOMINATIONS_STORED:
            return nominationStored(state, action);
        case actionTypes.NOMINATIONS_COMPLETED:
            return nominationCompleted(state, action);
        case actionTypes.NOMINATIONS_CLEARED:
            return nominationCleared(state, action);
        default: return state;
    };
};
```


### Secondary API Call
The OMDB API was queiried again using Redux Thunk in an action creator, so that nominations can have complete movie details. (This is needed because when querying for a list of results only a few points of movie specific data is returned.)

```jsx
// Searches the API asynchronously
export const queryOmdbNomination = (movieTitle, movieYear) => {

    return dispatch => {
        dispatch(nominationQueryStarted());

        // OMDB Movie API Query String
        const omdbUrl = `https://www.omdbapi.com/?t=${movieTitle}&y=${movieYear}&apikey=${process.env.REACT_APP_OMDB_KEY}`;

        // API Request
        axios.get(omdbUrl)
            .then((res) => {
                const response = res.data;
                dispatch(nominationQuerySucceeded(response));

            })
            .catch((error) => {
                dispatch(nominationQueryFailed(error));
            })
    }

}
```




### IMDB Links
Nominated films allow you to open their page in IMDB. This is achieved by taking the `imdbId` and dynamically inserting it into the  `<a href="">` with it's `""` removed.

```jsx
<a
    className="nom-row__imdb-link"
    href={`https://www.imdb.com/title/${props.imdbID.replace(/['"]+/g, '')}`}
    target="_blank"
    rel="noreferrer noopener"
>
```



### Genre Cut Off
To help control the layout for nominated movies, their genres have been restricted to the first 3.

```jsx
let updatedGeneres = null;
let propsArray = props.genres.split(" ");

// Shortens generes to 3 items
if (propsArray.length > 3) {
    updatedGeneres = propsArray.splice(0, 3).join(" ").slice(0, -1);
} else {
    updatedGeneres = props.genres;
}
```

### Local Storage
For a better user experience, nominated movies and the winner preserve their data in local storage. That way nothing goes away when the user refreshes the screen.

The nomination container component looks out newly nominated movies and then stores.
```jsx
// Pulls Nomination List from local storage
useEffect(() => {

    const localData = localStorage.getItem('nominationList');

    if (localData) {
        setNominationList(action.storeAllNominations(JSON.parse(localData)));
    }

}, [setNominationList])


// Saves resultsArray to local storage
useEffect(() => {
    localStorage.setItem('nominationList', JSON.stringify(nominationList));

}, [nominationList])
```

When the user is ready to view the winners, the movies are shuffled and this new list is stored in local storage.
```jsx
// Shuffles the nomination list to pick a winner
shuffle(localStorageList);
localStorage.setItem('winnerList', JSON.stringify(localStorageList));
```

The winner container component then checks that new local storage list
```jsx
const winnerList = JSON.parse(localStorage.getItem('winnerList'));
```

Lastly, both lists are removed from local storage, when the user clicks the reset button.
```jsx
localStorage.removeItem("winnerList");
localStorage.removeItem("nominationList");
```

[Back To Top](#Table-Of-Contents)

---

## Next Steps
* Add a pop out drawer for the nominations
* Add animations to the navbar that act as a counter for how many nominations given so far
* Add a popover response to clicking on the `Nominate` button

[Back To Top](#Table-Of-Contents)
