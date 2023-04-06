import React from "react";
import DashboardImg from '../../Assets/images/dashboard.svg'
const Dashboard = () => {
    return (
        <div className="container">
            <img style={{ width: '50%' }} src={DashboardImg} alt="dashboard"/>
            <h4 className="text-center text-muted"> Dashboard Coming Soon</h4>
        </div>
    )
}

export default Dashboard;