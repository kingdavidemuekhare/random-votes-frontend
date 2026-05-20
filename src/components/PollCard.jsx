import { memo, useEffect, useState } from 'react';
import { getNomineeInitials, getNomineePhoto } from '../utils/nomineeMedia';

const NomineeAvatar = ({ categoryTitle, option }) => {
  const nomineePhoto = getNomineePhoto(option, categoryTitle);
  const [showFallback, setShowFallback] = useState(!nomineePhoto);

  useEffect(() => {
    setShowFallback(!nomineePhoto);
  }, [nomineePhoto]);

  if (showFallback) {
    return (
      <span className="nominee-photo nominee-photo-fallback" aria-hidden="true">
        {getNomineeInitials(option)}
      </span>
    );
  }

  return (
    <img
      alt=""
      className="nominee-photo"
      onError={() => setShowFallback(true)}
      src={nomineePhoto}
    />
  );
};

const PollCard = ({
  field,
  selectedOption,
  submitting,
  votingLocked,
  onVote,
  currentIndex,
  totalFields,
  onPrevious,
  onNext,
  onSubmitBallot,
  canSubmitBallot,
  submitBallotPending
}) => {
  const hasSelected = Boolean(selectedOption);
  const isFirstField = currentIndex === 0;
  const isLastField = currentIndex === totalFields - 1;

  return (
    <article className="poll-card">
      <div className="poll-card-header">
        <div>
          <p className="eyebrow">Poll Category</p>
          <h3>{field.title}</h3>
        </div>
      </div>

      <div className="poll-progress">
        <strong>
          Category {currentIndex + 1} of {totalFields}
        </strong>
        <span>
          {votingLocked
            ? 'Selections are complete. Your choices are now locked.'
            : hasSelected
              ? 'You can still change this choice until you submit.'
              : 'Select one option to make your pick.'}
        </span>
      </div>

      <div className="option-grid">
        {field.options.map((option) => {
          const isSelected = selectedOption === option;

          return (
            <button
              key={option}
              className={`option-button ${isSelected ? 'selected' : ''}`}
              disabled={votingLocked || submitting}
              onClick={() => onVote(field.id, option)}
              type="button"
            >
              <div className="option-media" aria-hidden="true">
                <NomineeAvatar categoryTitle={field.title} option={option} />
              </div>
              <div className="option-copy">
                <span className="option-name">{option}</span>
                <span className="option-hint">
                  {votingLocked
                    ? 'Selection locked.'
                    : isSelected
                      ? 'Current selection. Tap another option to change it.'
                      : 'Tap to pick or update your choice.'}
                </span>
              </div>
              {isSelected ? <strong className="option-state">Selected</strong> : null}
            </button>
          );
        })}
      </div>

      <div className="poll-navigation">
        <button className="ghost-button" disabled={isFirstField} onClick={onPrevious} type="button">
          Previous
        </button>
        {isLastField ? (
          <button
            className="primary-button"
            disabled={!canSubmitBallot || submitBallotPending}
            onClick={onSubmitBallot}
            type="button"
          >
            {submitBallotPending ? 'Submitting...' : 'Submit Choices'}
          </button>
        ) : (
          <button className="primary-button" onClick={onNext} type="button">
            Next
          </button>
        )}
      </div>
    </article>
  );
};

export default memo(PollCard, (previousProps, nextProps) => {
  return (
    previousProps.field === nextProps.field &&
    previousProps.selectedOption === nextProps.selectedOption &&
    previousProps.submitting === nextProps.submitting &&
    previousProps.onVote === nextProps.onVote &&
    previousProps.currentIndex === nextProps.currentIndex &&
    previousProps.totalFields === nextProps.totalFields &&
    previousProps.onPrevious === nextProps.onPrevious &&
    previousProps.onNext === nextProps.onNext &&
    previousProps.onSubmitBallot === nextProps.onSubmitBallot &&
    previousProps.canSubmitBallot === nextProps.canSubmitBallot &&
    previousProps.submitBallotPending === nextProps.submitBallotPending
  );
});
