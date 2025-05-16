import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useHospitals } from './context/HospitalContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Grid, List, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import HospitalTable from './helpers/hospitals/HospitalTable';
import HospitalCard from './helpers/hospitals/HospitalCard';
import CSVUploader from './helpers/hospitals/CSVUploader';

const Dashboard = () => {
  const { hospitals, loading, refreshData } = useHospitals();
  const [view, setView] = useState<'table' | 'cards'>('table');

  const highRiskCount = hospitals.filter((h) => h.riskScore === 'high').length;
  const mediumRiskCount = hospitals.filter((h) => h.riskScore === 'medium').length;
  const lowRiskCount = hospitals.filter((h) => h.riskScore === 'low').length;

  return (
    <MainLayout>
      <div className="space-y-6" data-id="so5ayldyt" data-path="src/pages/Dashboard.tsx">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" data-id="eaalbz3yz" data-path="src/pages/Dashboard.tsx">
          <div data-id="79c2xatmj" data-path="src/pages/Dashboard.tsx">
            <h1 className="text-3xl font-bold" data-id="ur018t0k8" data-path="src/pages/Dashboard.tsx">Hospital Risk Dashboard</h1>
            <p className="text-gray-600" data-id="o2hfm6qwa" data-path="src/pages/Dashboard.tsx">Real-time overview of hospital overcrowding across Ireland</p>
          </div>
          
          <div className="flex items-center gap-3" data-id="ypityw0tc" data-path="src/pages/Dashboard.tsx">
            <div className="bg-white border rounded-md p-1 flex items-center" data-id="k3vra80y1" data-path="src/pages/Dashboard.tsx">
              <button
                className={`p-1.5 rounded-md ${view === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setView('table')} data-id="wrbm5uq09" data-path="src/pages/Dashboard.tsx">

                <List className="h-5 w-5" />
              </button>
              <button
                className={`p-1.5 rounded-md ${view === 'cards' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setView('cards')} data-id="qnb60t138" data-path="src/pages/Dashboard.tsx">

                <Grid className="h-5 w-5" />
              </button>
            </div>
            
            <Button size="sm" variant="outline" onClick={() => refreshData()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-id="p3moucuo3" data-path="src/pages/Dashboard.tsx">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Hospitals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-id="h9zu2wacf" data-path="src/pages/Dashboard.tsx">{hospitals.length}</div>
              <p className="text-sm text-gray-500" data-id="c29tifbql" data-path="src/pages/Dashboard.tsx">Monitored facilities</p>
            </CardContent>
          </Card>
          
          <Card className="border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <span className="h-3 w-3 rounded-full bg-red-500 mr-2" data-id="crbq3ncln" data-path="src/pages/Dashboard.tsx"></span>
                High Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600" data-id="pn1xljlpa" data-path="src/pages/Dashboard.tsx">{highRiskCount}</div>
              <p className="text-sm text-gray-500" data-id="ir3si45qo" data-path="src/pages/Dashboard.tsx">Critical overcrowding</p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <span className="h-3 w-3 rounded-full bg-orange-500 mr-2" data-id="ch037c6dr" data-path="src/pages/Dashboard.tsx"></span>
                Medium Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500" data-id="q6dyoiakn" data-path="src/pages/Dashboard.tsx">{mediumRiskCount}</div>
              <p className="text-sm text-gray-500" data-id="4lsy4j4uu" data-path="src/pages/Dashboard.tsx">Moderate overcrowding</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <span className="h-3 w-3 rounded-full bg-green-500 mr-2" data-id="14uyuadyy" data-path="src/pages/Dashboard.tsx"></span>
                Low Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600" data-id="3ftzujpha" data-path="src/pages/Dashboard.tsx">{lowRiskCount}</div>
              <p className="text-sm text-gray-500" data-id="5rp48q94d" data-path="src/pages/Dashboard.tsx">Normal operations</p>
            </CardContent>
          </Card>
        </div>
        
        {/* High Risk Alert */}
        {highRiskCount > 0 &&
        <Card className="border-red-300 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4" data-id="sbdmujy68" data-path="src/pages/Dashboard.tsx">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div data-id="plrgmu3o9" data-path="src/pages/Dashboard.tsx">
                  <h3 className="font-semibold text-lg" data-id="90i4zhsnv" data-path="src/pages/Dashboard.tsx">Critical Alert: {highRiskCount} Hospitals at High Risk</h3>
                  <p className="text-gray-700" data-id="k9veye6ef" data-path="src/pages/Dashboard.tsx">
                    {highRiskCount} {highRiskCount === 1 ? 'hospital has' : 'hospitals have'} critical overcrowding that requires immediate attention.
                  </p>
                </div>
                <div className="ml-auto" data-id="rpxfber1w" data-path="src/pages/Dashboard.tsx">
                  <Button variant="destructive" asChild>
                    <Link href="/alerts">View Alerts</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        }
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="4f2rzhgb9" data-path="src/pages/Dashboard.tsx">
          <div className="lg:col-span-2" data-id="42e04we6e" data-path="src/pages/Dashboard.tsx">
            <Card>
              <CardHeader>
                <CardTitle>Hospital Status</CardTitle>
                <CardDescription>
                  Overview of all monitored hospitals sorted by risk level
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ?
                <div className="flex justify-center items-center py-16" data-id="vw1li6iw0" data-path="src/pages/Dashboard.tsx">
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                  </div> :

                <>
                    {view === 'table' ?
                  <HospitalTable hospitals={hospitals} /> :

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-id="yliu0traf" data-path="src/pages/Dashboard.tsx">
                        {hospitals.map((hospital) =>
                    <HospitalCard key={hospital.id} hospital={hospital} />
                    )}
                      </div>
                  }
                  </>
                }
              </CardContent>
            </Card>
          </div>
          
          <div data-id="zeh2isr1q" data-path="src/pages/Dashboard.tsx">
            <CSVUploader />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Tools and shortcuts for hospital management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3" data-id="8tqb9ydux" data-path="src/pages/Dashboard.tsx">
                  <Button className="w-full justify-start" asChild>
                    <Link href="/recommendations">View Transfer Recommendations</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/risk-scoring">AI Risk Analysis</Link>
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    Generate Report
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Contact Emergency Response Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>);

};

export default Dashboard;