import React from 'react'
import DashboardTopRow from './DashboardTopRow'
import DashboardMiddleRow from './DashboardMiddleRow'
import DashboardThirdRow from './DashboardThirdRow'


function Dashboard() {
    return (
        <div className="px-4 py-3 bg-blue-50">
            <DashboardTopRow />
            <DashboardMiddleRow/>
            <DashboardThirdRow/>
        </div>
    )
}

export default Dashboard