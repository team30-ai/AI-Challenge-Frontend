import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useHospitals } from './context/HospitalContext';
import AlertsList from './helpers/alerts/AlertsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, BellOff, Loader2, Settings } from 'lucide-react';

const Alerts = () => {
  const { hospitals, loading } = useHospitals();

  // Count alerts
  const highRiskCount = hospitals.filter((h) => h.riskScore === 'high').length;

  return (
    <MainLayout>
      <div className="space-y-6" data-id="mche2n7en" data-path="src/pages/Alerts.tsx">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" data-id="b4s9xrkkr" data-path="src/pages/Alerts.tsx">
          <div data-id="pkxvfz3y7" data-path="src/pages/Alerts.tsx">
            <h1 className="text-3xl font-bold flex items-center" data-id="oxt5evar2" data-path="src/pages/Alerts.tsx">
              Emergency Alerts
              {highRiskCount > 0 &&
              <Badge variant="destructive" className="ml-3">
                  {highRiskCount} Active
                </Badge>
              }
            </h1>
            <p className="text-gray-600" data-id="ver5mlac3" data-path="src/pages/Alerts.tsx">Automatic alerts for critical hospital overcrowding situations</p>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Alerts</TabsTrigger>
              <TabsTrigger value="critical">Critical Only</TabsTrigger>
              <TabsTrigger value="history">Alert History</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {loading ?
        <div className="flex justify-center items-center py-16" data-id="h7mfqiy4w" data-path="src/pages/Alerts.tsx">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div> :

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="vr8vdb0oz" data-path="src/pages/Alerts.tsx">
            <div className="lg:col-span-2" data-id="j49021iae" data-path="src/pages/Alerts.tsx">
              <AlertsList hospitals={hospitals} />
            </div>
            
            <div className="space-y-6" data-id="1bo0d2joc" data-path="src/pages/Alerts.tsx">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Alert Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4" data-id="za3m16erb" data-path="src/pages/Alerts.tsx">
                    <div className="flex items-center justify-between" data-id="f1o2w4y26" data-path="src/pages/Alerts.tsx">
                      <div className="space-y-0.5" data-id="memevi3so" data-path="src/pages/Alerts.tsx">
                        <Label htmlFor="email-alerts">Email Alerts</Label>
                        <p className="text-xs text-gray-500" data-id="8le90cazm" data-path="src/pages/Alerts.tsx">
                          Receive email notifications for critical alerts
                        </p>
                      </div>
                      <Switch id="email-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between" data-id="b9al0onfz" data-path="src/pages/Alerts.tsx">
                      <div className="space-y-0.5" data-id="9tv0vqukl" data-path="src/pages/Alerts.tsx">
                        <Label htmlFor="sms-alerts">SMS Alerts</Label>
                        <p className="text-xs text-gray-500" data-id="jgk55hi6w" data-path="src/pages/Alerts.tsx">
                          Receive text message notifications for critical alerts
                        </p>
                      </div>
                      <Switch id="sms-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between" data-id="5j8bej0r3" data-path="src/pages/Alerts.tsx">
                      <div className="space-y-0.5" data-id="abugx04ou" data-path="src/pages/Alerts.tsx">
                        <Label htmlFor="dashboard-alerts">Dashboard Alerts</Label>
                        <p className="text-xs text-gray-500" data-id="t4jt24z9w" data-path="src/pages/Alerts.tsx">
                          Show alert banners on the dashboard
                        </p>
                      </div>
                      <Switch id="dashboard-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between" data-id="u8fz99luv" data-path="src/pages/Alerts.tsx">
                      <div className="space-y-0.5" data-id="b5yt8gg8t" data-path="src/pages/Alerts.tsx">
                        <Label htmlFor="medium-risk-alerts">Medium Risk Alerts</Label>
                        <p className="text-xs text-gray-500" data-id="cnyo1nlov" data-path="src/pages/Alerts.tsx">
                          Also receive alerts for medium risk situations
                        </p>
                      </div>
                      <Switch id="medium-risk-alerts" />
                    </div>
                    
                    <Button className="w-full mt-2" variant="outline">
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Alert Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4" data-id="cicgy0bbo" data-path="src/pages/Alerts.tsx">
                    <div className="flex items-start" data-id="csbr52ut5" data-path="src/pages/Alerts.tsx">
                      <div className="bg-red-100 p-2 rounded-full mr-3" data-id="n95406blq" data-path="src/pages/Alerts.tsx">
                        <Bell className="h-5 w-5 text-red-600" />
                      </div>
                      <div data-id="hb36hmge3" data-path="src/pages/Alerts.tsx">
                        <h3 className="font-medium" data-id="5fjh0sq2z" data-path="src/pages/Alerts.tsx">High Risk Alerts</h3>
                        <p className="text-sm text-gray-600" data-id="ksbr7lzu0" data-path="src/pages/Alerts.tsx">
                          Triggered when a hospital has 30+ ED trolleys, 10+ delayed transfers, 
                          or 8+ elderly patients waiting &gt;24 hours.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start" data-id="n3ss2tj0j" data-path="src/pages/Alerts.tsx">
                      <div className="bg-orange-100 p-2 rounded-full mr-3" data-id="28npcewox" data-path="src/pages/Alerts.tsx">
                        <Bell className="h-5 w-5 text-orange-600" />
                      </div>
                      <div data-id="l4yek4cga" data-path="src/pages/Alerts.tsx">
                        <h3 className="font-medium" data-id="68gdmu4ij" data-path="src/pages/Alerts.tsx">Medium Risk Alerts</h3>
                        <p className="text-sm text-gray-600" data-id="1pnw2sw8o" data-path="src/pages/Alerts.tsx">
                          Triggered when a hospital has 15-29 ED trolleys, 5-9 delayed transfers, 
                          or 4-7 elderly patients waiting &gt;24 hours.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start" data-id="ffs021rl2" data-path="src/pages/Alerts.tsx">
                      <div className="bg-gray-100 p-2 rounded-full mr-3" data-id="o6whs7yjj" data-path="src/pages/Alerts.tsx">
                        <BellOff className="h-5 w-5 text-gray-600" />
                      </div>
                      <div data-id="srmqf7g61" data-path="src/pages/Alerts.tsx">
                        <h3 className="font-medium" data-id="hk5iuwwxe" data-path="src/pages/Alerts.tsx">Alert Silencing</h3>
                        <p className="text-sm text-gray-600" data-id="4u3mloi8n" data-path="src/pages/Alerts.tsx">
                          Alerts can be temporarily silenced for specific hospitals for up to 4 hours, 
                          after which they will automatically resume.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        }
      </div>
    </MainLayout>);

};

export default Alerts;