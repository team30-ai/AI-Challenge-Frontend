import React from 'react';
import { Hospital, getAlerts } from '@/services/hospitalData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bell, Clock } from 'lucide-react';
import Link from 'next/link';

interface AlertsListProps {
  hospitals: Hospital[];
}

const AlertsList: React.FC<AlertsListProps> = ({ hospitals }) => {
  const alerts = getAlerts(hospitals);

  if (alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Emergency Alerts</CardTitle>
          <CardDescription>
            No active alerts at this time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center" data-id="h6fmoqhqd" data-path="src/components/alerts/AlertsList.tsx">
            <Bell className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2" data-id="etjs0n6qs" data-path="src/components/alerts/AlertsList.tsx">
              All hospitals are currently operating within acceptable risk levels.
            </p>
            <p className="text-gray-500 text-sm" data-id="hbnupg6zf" data-path="src/components/alerts/AlertsList.tsx">
              You&apos;ll be notified here when a hospital reaches critical overcrowding levels.
            </p>
          </div>
        </CardContent>
      </Card>);

  }

  return (
    <div className="space-y-6" data-id="6zapk1lbo" data-path="src/components/alerts/AlertsList.tsx">
      <div className="flex items-center justify-between" data-id="kmt8pjdz4" data-path="src/components/alerts/AlertsList.tsx">
        <h2 className="text-2xl font-bold flex items-center" data-id="u8p83fdbb" data-path="src/components/alerts/AlertsList.tsx">
          <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
          Emergency Alerts
          <Badge variant="destructive" className="ml-2">
            {alerts.length} Active
          </Badge>
        </h2>
        <Button variant="outline" size="sm">
        SMS Alert Settings
        </Button>
      </div>
      
      <div className="space-y-4" data-id="xps85lxme" data-path="src/components/alerts/AlertsList.tsx">
        {alerts.map((alert, index) =>
        <Card key={index} className="border-red-300 overflow-hidden">
            <CardHeader className="bg-red-50 pb-4">
              <div className="flex justify-between items-start" data-id="i5ridcp9k" data-path="src/components/alerts/AlertsList.tsx">
                <div data-id="won3mvuyt" data-path="src/components/alerts/AlertsList.tsx">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    Critical Overcrowding Alert
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {alert.hospital.name}
                  </CardDescription>
                </div>
                <div className="flex items-center text-sm text-gray-500" data-id="6jmj2ru59" data-path="src/components/alerts/AlertsList.tsx">
                  <Clock className="h-4 w-4 mr-1" />
                  Just now
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <p className="text-gray-800 mb-4" data-id="au54zpq36" data-path="src/components/alerts/AlertsList.tsx">{alert.message}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6" data-id="faimbgra2" data-path="src/components/alerts/AlertsList.tsx">
                <div className="bg-red-50 p-3 rounded-md text-center" data-id="o263eurnx" data-path="src/components/alerts/AlertsList.tsx">
                  <p className="text-xs text-gray-500 mb-1" data-id="hi0n9fdmw" data-path="src/components/alerts/AlertsList.tsx">ED Trolleys</p>
                  <p className="font-semibold text-red-600" data-id="hgv3d0v8o" data-path="src/components/alerts/AlertsList.tsx">{alert.hospital.edTrolleys}</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-md text-center" data-id="z8nd7sdvw" data-path="src/components/alerts/AlertsList.tsx">
                  <p className="text-xs text-gray-500 mb-1" data-id="uy1pi7bps" data-path="src/components/alerts/AlertsList.tsx">Ward Trolleys</p>
                  <p className="font-semibold text-amber-600" data-id="chl69vrla" data-path="src/components/alerts/AlertsList.tsx">{alert.hospital.wardTrolleys}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-md text-center" data-id="1r62ubxhw" data-path="src/components/alerts/AlertsList.tsx">
                  <p className="text-xs text-gray-500 mb-1" data-id="zzxq1hmd3" data-path="src/components/alerts/AlertsList.tsx">Delayed Transfers</p>
                  <p className="font-semibold text-blue-600" data-id="frz1xccvy" data-path="src/components/alerts/AlertsList.tsx">{alert.hospital.delayedTransfers}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-md text-center" data-id="r18g2f0k3" data-path="src/components/alerts/AlertsList.tsx">
                  <p className="text-xs text-gray-500 mb-1" data-id="nygni8km7" data-path="src/components/alerts/AlertsList.tsx">Elderly Waiting</p>
                  <p className="font-semibold text-purple-600" data-id="7rvcd8hyj" data-path="src/components/alerts/AlertsList.tsx">{alert.hospital.elderlyWaiting}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-end" data-id="g66xe5lp7" data-path="src/components/alerts/AlertsList.tsx">
                <Button variant="outline" asChild>
                  <Link href={`/risk-scoring?hospital=${alert.hospital.id}`}>View Risk Analysis</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link href="/recommendations">See Recommendations</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>);

};

export default AlertsList;