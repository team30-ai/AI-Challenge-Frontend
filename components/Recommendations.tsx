import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useHospitals } from './context/HospitalContext';
import RecommendationsList from './helpers/recommendations/RecommendationsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MoveRight } from 'lucide-react';

const Recommendations = () => {
  const { hospitals, loading } = useHospitals();

  // Count high risk hospitals
  const highRiskCount = hospitals.filter((h) => h.riskScore === 'high').length;

  return (
    <MainLayout>
      <div className="space-y-6" data-id="vc0jtpe6k" data-path="src/pages/Recommendations.tsx">
        <div data-id="7746eemd6" data-path="src/pages/Recommendations.tsx">
          <h1 className="text-3xl font-bold" data-id="1mwd2o9n5" data-path="src/pages/Recommendations.tsx">Recommendation System</h1>
          <p className="text-gray-600" data-id="zl3gkh9kl" data-path="src/pages/Recommendations.tsx">AI-powered suggestions to optimize patient flow and reduce overcrowding</p>
        </div>
        
        {loading ?
        <div className="flex justify-center items-center py-16" data-id="i8gggdq67" data-path="src/pages/Recommendations.tsx">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div> :

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="daf0cbltl" data-path="src/pages/Recommendations.tsx">
            <div className="lg:col-span-2" data-id="oklibvo6e" data-path="src/pages/Recommendations.tsx">
              <RecommendationsList hospitals={hospitals} />
            </div>
            
            <div className="space-y-6" data-id="fjoatemcv" data-path="src/pages/Recommendations.tsx">
              <Card>
                <CardHeader>
                  <CardTitle>How Recommendations Work</CardTitle>
                  <CardDescription>
                    Understanding the AI recommendation engine
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4" data-id="t0xn7zeoo" data-path="src/pages/Recommendations.tsx">
                    <p data-id="bf2ennj65" data-path="src/pages/Recommendations.tsx">
                      The recommendation system analyzes multiple factors to suggest optimal patient transfers:
                    </p>
                    
                    <ul className="space-y-3" data-id="9fmd07rhu" data-path="src/pages/Recommendations.tsx">
                      <li className="flex items-start" data-id="u9kyml1lr" data-path="src/pages/Recommendations.tsx">
                        <span className="h-5 w-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5" data-id="3vza4hwtt" data-path="src/pages/Recommendations.tsx">1</span>
                        <span data-id="89rsurk8p" data-path="src/pages/Recommendations.tsx">Identifies hospitals at critical risk levels</span>
                      </li>
                      <li className="flex items-start" data-id="q4cfg5ji4" data-path="src/pages/Recommendations.tsx">
                        <span className="h-5 w-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5" data-id="340j92ik9" data-path="src/pages/Recommendations.tsx">2</span>
                        <span data-id="d5tbrzio3" data-path="src/pages/Recommendations.tsx">Finds nearby hospitals with available capacity</span>
                      </li>
                      <li className="flex items-start" data-id="dd98vsapa" data-path="src/pages/Recommendations.tsx">
                        <span className="h-5 w-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5" data-id="k0fszv29g" data-path="src/pages/Recommendations.tsx">3</span>
                        <span data-id="ps0c6dxsv" data-path="src/pages/Recommendations.tsx">Calculates optimal number of transfers needed</span>
                      </li>
                      <li className="flex items-start" data-id="89n9vq71z" data-path="src/pages/Recommendations.tsx">
                        <span className="h-5 w-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5" data-id="omfdjjdg9" data-path="src/pages/Recommendations.tsx">4</span>
                        <span data-id="hwgb75hay" data-path="src/pages/Recommendations.tsx">Prioritizes moves that will have the greatest impact on risk reduction</span>
                      </li>
                    </ul>
                    
                    <div className="bg-blue-50 p-4 rounded-md mt-4" data-id="203kk9x2b" data-path="src/pages/Recommendations.tsx">
                      <div className="flex items-center mb-2" data-id="m821934zi" data-path="src/pages/Recommendations.tsx">
                        <MoveRight className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="font-semibold" data-id="2x1717i86" data-path="src/pages/Recommendations.tsx">Transfer Impact</h3>
                      </div>
                      <p className="text-sm" data-id="nqclnkem6" data-path="src/pages/Recommendations.tsx">
                        Each recommended transfer is calculated to reduce the risk level of the source hospital 
                        while ensuring the destination hospital remains at a safe capacity level.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={highRiskCount > 0 ? 'border-red-200' : 'border-green-200'}>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4" data-id="h8bhhrgm1" data-path="src/pages/Recommendations.tsx">
                    {highRiskCount > 0 ?
                  <>
                        <div className="flex items-center text-red-600" data-id="rqb9a3dgf" data-path="src/pages/Recommendations.tsx">
                          <span className="h-3 w-3 rounded-full bg-red-500 mr-2" data-id="8c0j1kvil" data-path="src/pages/Recommendations.tsx"></span>
                          <span className="font-medium" data-id="szer0p899" data-path="src/pages/Recommendations.tsx">{highRiskCount} Hospital{highRiskCount > 1 ? 's' : ''} at High Risk</span>
                        </div>
                        <p className="text-sm text-gray-600" data-id="voligjl35" data-path="src/pages/Recommendations.tsx">
                          There are currently {highRiskCount} hospital{highRiskCount > 1 ? 's' : ''} in critical condition 
                          requiring immediate attention. Review the recommendations for suggested actions.
                        </p>
                      </> :

                  <>
                        <div className="flex items-center text-green-600" data-id="ewc1fhwad" data-path="src/pages/Recommendations.tsx">
                          <span className="h-3 w-3 rounded-full bg-green-500 mr-2" data-id="hmtpc0sqj" data-path="src/pages/Recommendations.tsx"></span>
                          <span className="font-medium" data-id="i72z9q7zx" data-path="src/pages/Recommendations.tsx">All Hospitals Operating Normally</span>
                        </div>
                        <p className="text-sm text-gray-600" data-id="oq1rh412r" data-path="src/pages/Recommendations.tsx">
                          Currently, all hospitals are operating within acceptable capacity levels. 
                          No urgent transfers are needed at this time.
                        </p>
                      </>
                  }
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        }
      </div>
    </MainLayout>);

};

export default Recommendations;