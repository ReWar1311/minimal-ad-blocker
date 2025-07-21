import React, { useState } from "react";
import GppBadIcon from '@mui/icons-material/GppBad';
import GppGoodIcon from '@mui/icons-material/GppGood';
import BlockIcon from '@mui/icons-material/Block';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const DashboardPanel = ({
  isBlocking,
  blockedCount,
  blockedDomains,
  whitelistSites,
  famousSitesConfig,
}) => {
  const activeFamousSites = Object.values(famousSitesConfig || {}).filter(
    Boolean
  ).length;

  return (
    <div className="dashboard-panel">
      <div className="panel-header">
        <h2 className="panel-title">PROTECTION OVERVIEW</h2>
        <p className="panel-subtitle">
          Real-time ADs and Trackers Blocking Status
        </p>
      </div>

      {/* Status Cards */}
      <div className="status-grid">
        <div className="status-card primary">
          <div className="card-icon">{isBlocking ? <GppGoodIcon /> : <GppBadIcon />}</div>
          <div className="card-content">
            <h3 className="card-title">PROTECTION STATUS</h3>
            <p className="card-value">{isBlocking ? "ACTIVE" : "DISABLED"}</p>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon"><BlockIcon /></div>
          <div className="card-content">
            <h3 className="card-title">REQUESTS BLOCKED</h3>
            <p className="card-value">{blockedCount.toLocaleString()}</p>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon"><ChecklistRtlIcon /></div>
          <div className="card-content">
            <h3 className="card-title">ACTIVE RULES</h3>
            <p className="card-value">{blockedDomains?.length}</p>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon"><ThumbUpOffAltIcon /></div>
          <div className="card-content">
            <h3 className="card-title">WHITELISTED</h3>
            <p className="card-value">{whitelistSites?.length}</p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="coffee-support">
        <div className="coffee-container">
          <div className="coffee-icon">☕</div>
          <div className="coffee-content">
            <h3>Enjoy Ad-Free Browsing?</h3>
            <p>
              If this extension makes your web experience better, consider
              supporting its development!
            </p>
            <a
              href="https://coff.ee/rewar1311"
              target="_blank"
              rel="noopener noreferrer"
              className="coffee-button"
            >
              <span className="coffee-emoji">☕</span> Buy Me a Coffee
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
