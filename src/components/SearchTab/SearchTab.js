import './SearchTab.css';

function SearchTab({
 tabs, search, loadingIndicator, filmList, offline, errorMessage, pagination,
}) {
  return (
    <>
      {tabs}
      {search}
      {loadingIndicator}
      {errorMessage}
      {offline}
      {filmList}
      {pagination}
    </>
  );
}

export default SearchTab;