import './RatedTab.css';

function RatedTab({
 tabs, loadingIndicator, ratedFilmsList, offline, errorMessage, ratedPagination,
}) {
  return (
    <>
      {tabs}
      {loadingIndicator}
      {errorMessage}
      {offline}
      {ratedFilmsList}
      {ratedPagination}
    </>
  );
}

export default RatedTab;