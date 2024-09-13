import "./Dashboard.css";
import WindowIcon from '@mui/icons-material/Window';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IpTable from "../Components/IpTable";
import BlockedIpData from "../Components/BlockedIp";

export default function Dashboard() {
    
    return (
        <>
            <div className="d-flex">
                <div className="dash-side-bar">
                    <div className="icon">
                        <img src="" alt="CloudBouncer" />
                    </div>
                    <div className="dash-nav-link">
                        <div className="dash-links">
                            <div className="dash-link-icon">
                                <WindowIcon />
                            </div>
                            <div>
                                Overview
                            </div>

                        </div>
                        <div className="dash-links">
                            <div className="dash-link-icon">
                                <AssessmentIcon />
                            </div>
                            Reports
                        </div>
                        <div className="dash-links">
                            <div className="dash-link-icon">
                                <GroupsIcon />
                            </div>
                            Customers
                        </div>
                        <div className="dash-links">
                            <div className="dash-link-icon">
                                <SettingsIcon />
                            </div>
                            Settings
                        </div>
                        <div className="dash-links">
                            <div className="dash-link-icon">
                                <CodeIcon />
                            </div>
                            Developer
                        </div>
                        <div className="dash-links" style={{ marginTop: "auto" }}>
                            <div className="dash-link-icon">
                                <LogoutIcon />
                            </div>
                            Logout
                        </div>

                    </div>
                </div>
                <div className="main-screen">
                    <div className="dash-nav">
                        <div>Dashboard</div>
                        <button style={{border: "none", backgroundColor: "#fff"}} ><AccountCircleIcon fontSize="large" /></button>
                    </div>
                    <div className="graph">
                        <h5>Graph Statistics</h5>
                    </div>
                    <div className="ip">
                        <div className="block-ip">
                            <h5 className="mt-2 mb-3">Blocked Ip</h5>
                            <div>
                                <BlockedIpData />
                            </div>
                        </div>
                        <div className="ip-log">
                            <h5 className="mt-2 mb-2">Ip Logs</h5>
                            <div>
                                <IpTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};