import {Header, Search, NomineesList, SearchResults, Banner} from './components'
import { AppState } from './context/appState';

const App = () => {
  return (
    <AppState>
      <Header/>
      <Banner/>
      <div id="flex-container">
      <div id="left-col">
        <Search />
        <SearchResults />
      </div>
      <NomineesList/>
      </div>
    </AppState>
  );
};

export default App;
