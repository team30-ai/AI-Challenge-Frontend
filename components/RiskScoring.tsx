import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useHospitals } from './context/HospitalContext';
import RiskExplanation from './helpers/risk/RiskExplanation';
import { Hospital } from '@/services/hospitalData';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

const RiskScoring = () => {
  const { hospitals, loading } = useHospitals();
  const searchParams = useSearchParams();
  const hospitalId = searchParams.get('hospital');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    if (hospitals.length > 0) {
      if (hospitalId) {
        const hospital = hospitals.find((h) => h.id === hospitalId);
        if (hospital) {
          setSelectedHospital(hospital);
        } else {
          setSelectedHospital(hospitals[0]);
        }
      } else if (!selectedHospital) {
        setSelectedHospital(hospitals[0]);
      }
    }
  }, [hospitals, hospitalId, selectedHospital]);

  const handleHospitalChange = (id: string) => {
    const hospital = hospitals.find((h) => h.id === id);
    if (hospital) {
      setSelectedHospital(hospital);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6" data-id="4xr77kll4" data-path="src/pages/RiskScoring.tsx">
        <div data-id="cs0b9h603" data-path="src/pages/RiskScoring.tsx">
          <h1 className="text-3xl font-bold" data-id="gek3g28z2" data-path="src/pages/RiskScoring.tsx">AI Risk Scoring Engine</h1>
          <p className="text-gray-600" data-id="xrrwi8ntl" data-path="src/pages/RiskScoring.tsx">Analyze hospital risk factors and understand the AI&apos;s assessment</p>
        </div>

        {loading ?
        <div className="flex justify-center items-center py-16" data-id="xctxz0bqr" data-path="src/pages/RiskScoring.tsx">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div> :

        <>
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" data-id="0x2od80ni" data-path="src/pages/RiskScoring.tsx">
                  <div data-id="1smtnp14k" data-path="src/pages/RiskScoring.tsx">
                    <CardTitle>Hospital Risk Analysis</CardTitle>
                    <CardDescription>
                      Select a hospital to see detailed risk assessment
                    </CardDescription>
                  </div>
                  <div className="w-full md:w-64" data-id="120ssegke" data-path="src/pages/RiskScoring.tsx">
                    <Select
                    value={selectedHospital?.id || ''}
                    onValueChange={handleHospitalChange}>

                      <SelectTrigger>
                        <SelectValue placeholder="Select hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitals.map((hospital) =>
                      <SelectItem key={hospital.id} value={hospital.id}>
                            {hospital.name} {' '}
                            {hospital.riskScore === 'high' &&
                        <span className="ml-2 text-red-500" data-id="ky6uqv7vx" data-path="src/pages/RiskScoring.tsx">● High Risk</span>
                        }
                          </SelectItem>
                      )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedHospital ?
              <div className="space-y-8" data-id="orlnb1dez" data-path="src/pages/RiskScoring.tsx">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="5dom4550g" data-path="src/pages/RiskScoring.tsx">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Hospital Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4" data-id="nxba94omq" data-path="src/pages/RiskScoring.tsx">
                            <div data-id="aonpmeo1s" data-path="src/pages/RiskScoring.tsx">
                              <h3 className="font-semibold flex items-center" data-id="8l8ut0rk2" data-path="src/pages/RiskScoring.tsx">
                                {selectedHospital.name}
                                {selectedHospital.riskScore === 'high' &&
                            <Badge variant="destructive" className="ml-2">High Risk</Badge>
                            }
                                {selectedHospital.riskScore === 'medium' &&
                            <Badge variant="default" className="ml-2 bg-orange-500">Medium Risk</Badge>
                            }
                                {selectedHospital.riskScore === 'low' &&
                            <Badge variant="outline" className="ml-2 border-green-500 text-green-600">Low Risk</Badge>
                            }
                              </h3>
                              <p className="text-gray-500" data-id="2b0dthmi2" data-path="src/pages/RiskScoring.tsx">{selectedHospital.county}, Ireland</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4" data-id="joki9lcp7" data-path="src/pages/RiskScoring.tsx">
                              <div className="bg-blue-50 p-3 rounded-md" data-id="byyv4bxad" data-path="src/pages/RiskScoring.tsx">
                                <p className="text-sm text-gray-500" data-id="ucnp6d1b4" data-path="src/pages/RiskScoring.tsx">Current Occupancy</p>
                                <p className="text-lg font-semibold" data-id="u2n574kyb" data-path="src/pages/RiskScoring.tsx">{selectedHospital.currentOccupancy} / {selectedHospital.capacity}</p>
                                <p className="text-xs text-gray-500" data-id="cx7fh4f2s" data-path="src/pages/RiskScoring.tsx">
                                  {Math.round(selectedHospital.currentOccupancy / selectedHospital.capacity * 100)}% of total capacity
                                </p>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-md" data-id="1lpjuysqh" data-path="src/pages/RiskScoring.tsx">
                                <p className="text-sm text-gray-500" data-id="c2cybj077" data-path="src/pages/RiskScoring.tsx">Available Beds</p>
                                <p className="text-lg font-semibold" data-id="6l4jwhgzt" data-path="src/pages/RiskScoring.tsx">{selectedHospital.capacity - selectedHospital.currentOccupancy}</p>
                                <p className="text-xs text-gray-500" data-id="7txzzhynd" data-path="src/pages/RiskScoring.tsx">
                                  {Math.round((selectedHospital.capacity - selectedHospital.currentOccupancy) / selectedHospital.capacity * 100)}% available
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Key Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4" data-id="amz39pjq5" data-path="src/pages/RiskScoring.tsx">
                            <div className={`p-4 rounded-md ${selectedHospital.edTrolleys >= 30 ? 'bg-red-50' : 'bg-gray-50'}`} data-id="qpiuu69xs" data-path="src/pages/RiskScoring.tsx">
                              <h4 className="text-sm text-gray-500" data-id="hhhnngxv8" data-path="src/pages/RiskScoring.tsx">ED Trolleys</h4>
                              <p className={`text-xl font-semibold ${selectedHospital.edTrolleys >= 30 ? 'text-red-600' : ''}`} data-id="x5zb3wzb7" data-path="src/pages/RiskScoring.tsx">
                                {selectedHospital.edTrolleys}
                              </p>
                              <p className="text-xs text-gray-500" data-id="n5fpwbr6h" data-path="src/pages/RiskScoring.tsx">
                                {selectedHospital.edTrolleys >= 30 ? 'Critical level' :
                            selectedHospital.edTrolleys >= 15 ? 'Concerning level' : 'Normal level'}
                              </p>
                            </div>
                            <div className={`p-4 rounded-md ${selectedHospital.wardTrolleys >= 15 ? 'bg-red-50' : 'bg-gray-50'}`} data-id="92b1l0eas" data-path="src/pages/RiskScoring.tsx">
                              <h4 className="text-sm text-gray-500" data-id="dow1rxpp9" data-path="src/pages/RiskScoring.tsx">Ward Trolleys</h4>
                              <p className={`text-xl font-semibold ${selectedHospital.wardTrolleys >= 15 ? 'text-red-600' : ''}`} data-id="9fmab2mec" data-path="src/pages/RiskScoring.tsx">
                                {selectedHospital.wardTrolleys}
                              </p>
                              <p className="text-xs text-gray-500" data-id="7on4zqsmb" data-path="src/pages/RiskScoring.tsx">
                                {selectedHospital.wardTrolleys >= 15 ? 'Critical level' :
                            selectedHospital.wardTrolleys >= 8 ? 'Concerning level' : 'Normal level'}
                              </p>
                            </div>
                            <div className={`p-4 rounded-md ${selectedHospital.delayedTransfers >= 10 ? 'bg-red-50' : 'bg-gray-50'}`} data-id="93wpjze4x" data-path="src/pages/RiskScoring.tsx">
                              <h4 className="text-sm text-gray-500" data-id="jk0g9tzu8" data-path="src/pages/RiskScoring.tsx">Delayed Transfers</h4>
                              <p className={`text-xl font-semibold ${selectedHospital.delayedTransfers >= 10 ? 'text-red-600' : ''}`} data-id="htptk2x1t" data-path="src/pages/RiskScoring.tsx">
                                {selectedHospital.delayedTransfers}
                              </p>
                              <p className="text-xs text-gray-500" data-id="fp6yoh7z6" data-path="src/pages/RiskScoring.tsx">
                                {selectedHospital.delayedTransfers >= 10 ? 'Critical level' :
                            selectedHospital.delayedTransfers >= 5 ? 'Concerning level' : 'Normal level'}
                              </p>
                            </div>
                            <div className={`p-4 rounded-md ${selectedHospital.elderlyWaiting >= 8 ? 'bg-red-50' : 'bg-gray-50'}`} data-id="rbmnri8du" data-path="src/pages/RiskScoring.tsx">
                              <h4 className="text-sm text-gray-500" data-id="goihyjnob" data-path="src/pages/RiskScoring.tsx">Elderly Waiting &gt;24hrs</h4>
                              <p className={`text-xl font-semibold ${selectedHospital.elderlyWaiting >= 8 ? 'text-red-600' : ''}`} data-id="s9ryesx0n" data-path="src/pages/RiskScoring.tsx">
                                {selectedHospital.elderlyWaiting}
                              </p>
                              <p className="text-xs text-gray-500" data-id="u1g8vcot3" data-path="src/pages/RiskScoring.tsx">
                                {selectedHospital.elderlyWaiting >= 8 ? 'Critical level' :
                            selectedHospital.elderlyWaiting >= 4 ? 'Concerning level' : 'Normal level'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <RiskExplanation hospital={selectedHospital} />
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">AI Model Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4" data-id="uhq74siif" data-path="src/pages/RiskScoring.tsx">
                          <div data-id="ayc0248xz" data-path="src/pages/RiskScoring.tsx">
                            <h3 className="font-semibold text-sm text-gray-500" data-id="kl5rkwgmj" data-path="src/pages/RiskScoring.tsx">About the Risk Scoring Model</h3>
                            <p className="mt-1" data-id="wkjp6tgsa" data-path="src/pages/RiskScoring.tsx">
                              The AIoife risk scoring engine uses a gradient boosting model trained on historical 
                              hospital data, including patient outcomes, overcrowding metrics, and staffing levels 
                              to predict the risk of adverse events.
                            </p>
                          </div>
                          
                          <div className="border-t pt-4" data-id="768vcanh2" data-path="src/pages/RiskScoring.tsx">
                            <h3 className="font-semibold text-sm text-gray-500" data-id="ese0yglc6" data-path="src/pages/RiskScoring.tsx">Model Features</h3>
                            <ul className="mt-1 list-disc list-inside text-gray-700" data-id="rcyya1tbv" data-path="src/pages/RiskScoring.tsx">
                              <li data-id="nkx6nnjg1" data-path="src/pages/RiskScoring.tsx">ED and ward trolley counts</li>
                              <li data-id="pb1pk2br2" data-path="src/pages/RiskScoring.tsx">Delayed transfers of care</li>
                              <li data-id="tlj5h1c3n" data-path="src/pages/RiskScoring.tsx">Elderly patients waiting more than 24 hours</li>
                              <li data-id="zivyibywc" data-path="src/pages/RiskScoring.tsx">Current hospital occupancy rates</li>
                              <li data-id="1vcs2z0sb" data-path="src/pages/RiskScoring.tsx">Staffing levels (where available)</li>
                              <li data-id="b8cx0ejzv" data-path="src/pages/RiskScoring.tsx">Historical patient outcome data</li>
                            </ul>
                          </div>
                          
                          <div className="border-t pt-4" data-id="vwcwih9x7" data-path="src/pages/RiskScoring.tsx">
                            <h3 className="font-semibold text-sm text-gray-500" data-id="5blyzlxp1" data-path="src/pages/RiskScoring.tsx">Model Accuracy</h3>
                            <p className="mt-1" data-id="ufodt235r" data-path="src/pages/RiskScoring.tsx">
                              The current model has achieved 87% accuracy in predicting high-risk situations 
                              based on validation against historical events. Regular retraining ensures the 
                              model stays current with evolving healthcare conditions.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div> :

              <div className="text-center py-8 text-gray-500" data-id="ut8i15oyn" data-path="src/pages/RiskScoring.tsx">
                    Select a hospital to view risk assessment
                  </div>
              }
              </CardContent>
            </Card>
          </>
        }
      </div>
    </MainLayout>);

};

export default RiskScoring;