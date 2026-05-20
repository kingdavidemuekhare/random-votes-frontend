import { formatVotingCloseAt } from '../utils/votingWindow';

const VotingClosedPanel = ({ closesAt }) => (
  <section className="page-grid submission-page">
    <div className="panel submission-panel">
        <img
          alt="KayPolls logo"
          className="submission-logo"
          src="/branding/logo.png"
        />
      <p className="eyebrow">Selections Closed</p>
      <h2>The selection period has ended.</h2>
      <p className="muted-text">
        KayPolls is now closed and no more choices can be submitted.
      </p>
      <p className="notice-text">
        Picks closed at {formatVotingCloseAt(closesAt)} Nigerian time.
      </p>
    </div>
  </section>
);

export default VotingClosedPanel;
