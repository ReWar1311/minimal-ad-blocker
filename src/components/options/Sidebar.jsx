import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TuneIcon from "@mui/icons-material/Tune";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = ({ activePanel, onPanelChange, stats }) => {
  const menuItems = [
    { id: "dashboard", icon: <DashboardIcon />, label: "DASHBOARD" },
    { id: "rules", icon: <TuneIcon />, label: "BLOCKING RULES" },
    { id: "settings", icon: <SettingsIcon />, label: "SETTINGS" },
  ];

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePanel === item.id ? "active" : ""}`}
            onClick={() => onPanelChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div>
        <div className="sidebar-stats">
          <div className="stats-title">SYSTEM STATUS</div>
          <div className="stat-item">
            <span className="stat-label">BLOCKED</span>
            <span className="stat-value">{stats.blocked.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">RULES</span>
            <span className="stat-value">{stats.rules}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">ALLOWED</span>
            <span className="stat-value">{stats.whitelisted}</span>
          </div>
        </div>
        <footer className="popup-footer">
          <p className="footer-text">
            Made with ♥ by{" "}
            <a
              href="https://github.com/ReWar1311"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Prashant Rewar
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;
