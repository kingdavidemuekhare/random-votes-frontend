import { useEffect, useState } from 'react';
import { onSocketStateChanged } from '../services/socketService';

const LiveStatus = ({ compact = false }) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => onSocketStateChanged(setConnected), []);

  if (compact) {
    return (
      <div
        aria-label={connected ? 'Live updates connected' : 'Reconnecting live updates'}
        className={`live-status live-status-compact ${connected ? 'online' : 'offline'}`}
        title={connected ? 'Live updates connected' : 'Reconnecting live updates'}
      >
        <span className="status-dot" />
      </div>
    );
  }

  return (
    <div className={`live-status ${connected ? 'online' : 'offline'}`}>
      <span className="status-dot" />
      <span>{connected ? 'Live updates connected' : 'Reconnecting live updates'}</span>
    </div>
  );
};

export default LiveStatus;
