import React from 'react';
import { Hospital, generateRecommendations } from '@/services/hospitalData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

interface RecommendationsListProps {
  hospitals: Hospital[];
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({ hospitals }) => {
  const recommendations = generateRecommendations(hospitals);

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Transfer Recommendations</CardTitle>
          <CardDescription>
            No recommendations available at this time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600" data-id="ehf4jw08g" data-path="src/components/recommendations/RecommendationsList.tsx">
            All hospitals are currently operating within acceptable capacity levels. 
            No patient transfers are recommended at this time.
          </p>
        </CardContent>
      </Card>);

  }

  return (
    <div className="space-y-6" data-id="gtz500l5x" data-path="src/components/recommendations/RecommendationsList.tsx">
      <h2 className="text-2xl font-bold" data-id="vm501e772" data-path="src/components/recommendations/RecommendationsList.tsx">Patient Transfer Recommendations</h2>
      <p className="text-gray-600" data-id="prh3ji3mw" data-path="src/components/recommendations/RecommendationsList.tsx">
        Based on current hospital occupancy and risk levels, the following patient transfers are recommended:
      </p>
      
      <div className="space-y-4" data-id="suk90mba7" data-path="src/components/recommendations/RecommendationsList.tsx">
        {recommendations.map((rec, index) =>
        <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-blue-50 pb-4">
              <CardTitle className="text-lg">
                Recommended Transfer #{index + 1}
              </CardTitle>
              <CardDescription>
                {rec.patientCount} patient{rec.patientCount > 1 ? 's' : ''} from {rec.fromHospital.name} to {rec.toHospital.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="siws031di" data-path="src/components/recommendations/RecommendationsList.tsx">
                <div className="border rounded-md p-4 bg-red-50" data-id="oqbmji0u1" data-path="src/components/recommendations/RecommendationsList.tsx">
                  <div className="flex items-center justify-between mb-3" data-id="zvwi4qjur" data-path="src/components/recommendations/RecommendationsList.tsx">
                    <h3 className="font-semibold" data-id="a570u2owo" data-path="src/components/recommendations/RecommendationsList.tsx">{rec.fromHospital.name}</h3>
                    <Badge variant="destructive">🔴 High Risk</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm" data-id="iv6smltng" data-path="src/components/recommendations/RecommendationsList.tsx">
                    <div data-id="jdf9wfot3" data-path="src/components/recommendations/RecommendationsList.tsx">
                      <p className="text-gray-500" data-id="sqwwbd4an" data-path="src/components/recommendations/RecommendationsList.tsx">ED Trolleys</p>
                      <p className="font-medium" data-id="84rc8cpoh" data-path="src/components/recommendations/RecommendationsList.tsx">{rec.fromHospital.edTrolleys}</p>
                    </div>
                    <div data-id="zapmui96x" data-path="src/components/recommendations/RecommendationsList.tsx">
                      <p className="text-gray-500" data-id="l9blyl70r" data-path="src/components/recommendations/RecommendationsList.tsx">Occupancy</p>
                      <p className="font-medium" data-id="rp0kp588i" data-path="src/components/recommendations/RecommendationsList.tsx">{Math.round(rec.fromHospital.currentOccupancy / rec.fromHospital.capacity * 100)}%</p>
                    </div>
                    <div data-id="ih1z3bu64" data-path="src/components/recommendations/RecommendationsList.tsx">
                      <p className="text-gray-500" data-id="t7qnnyic4" data-path="src/components/recommendations/RecommendationsList.tsx">Delayed Transfers</p>
                      <p className="font-medium" data-id="ptnyij544" data-path="src/components/recommendations/RecommendationsList.tsx">{rec.fromHospital.delayedTransfers}</p>
                    </div>
                    <div data-id="fxivqshdf" data-path="src/components/recommendations/RecommendationsList.tsx">
                      <p className="text-gray-500" data-id="68vhoszex" data-path="src/components/recommendations/RecommendationsList.tsx">Elderly Waiting</p>
                      <p className="font-medium" data-id="ktxurl0op" data-path="src/components/recommendations/RecommendationsList.tsx">{rec.fromHospital.elderlyWaiting}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-green-50" data-id="2wr2njtao" data-path="src/components/recommendations/RecommendationsList.tsx">
                  <div className="flex items-center justify-between mb-3" data-id="qtv3ogljh" data-path="src/components/recommendations/RecommendationsList.tsx">
                    <h3 className="font-semibold" data-id="ygtzu3057" data-path="src/components/recommendations/RecommendationsList.tsx">{rec.toHospital.name}</h3>
                    <Badge variant="outline" className="border-green-500 text-green-600">🟢 Low Risk</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm" data-id="en708ri27" data-path="src/components/recommendations/RecommendationsList.tsx">
                    <div data-id="qg0zfj0sg" data-path="src/components/recommendations/RecommendationsList.tsx">
                      <p className="text-gray-500" data-id="m3qlm03dz" data-path="src/components/recommendations/RecommendationsList.tsx">ED Trolleys</p>
                      <p className="font-medium" data-id="8a3bcnczj" data-path="src/components/recommendations/RecommendationsList.tsx">{rec.toHospital.edTrolleys}</p>
                    </div>
                    <div data-id="oaxdwxq0j" data-path="src/components/recommendations/RecommendationsList.tsx">
                      <p className="text-gray-500" data-id="0h21uku5s" data-path="src/components/recommendations/RecommendationsList.tsx">Occupancy</p>
                      <p className="font-medium" data-id="nu0jl99my" data-path="src/components/recommendations/RecommendationsList.tsx">{Math.round(rec.toHospital.currentOccupancy / rec.toHospital.capacity * 100)}%</p>
                    </div>
                    <div data-id="4wgonco82" data-path="src/components/recommendations/RecommendationsList.tsx">
                      <p className="text-gray-500" data-id="rcwmbltp5" data-path="src/components/recommendations/RecommendationsList.tsx">Available Beds</p>
                      <p className="font-medium" data-id="p4ccd9jg1" data-path="src/components/recommendations/RecommendationsList.tsx">{rec.toHospital.capacity - rec.toHospital.currentOccupancy}</p>
                    </div>
                    <div data-id="s8lpqpvwf" data-path="src/components/recommendations/RecommendationsList.tsx">
                      <p className="text-gray-500" data-id="z3l54hd3r" data-path="src/components/recommendations/RecommendationsList.tsx">Distance</p>
                      <p className="font-medium" data-id="7hy9edd6m" data-path="src/components/recommendations/RecommendationsList.tsx">42 km</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-blue-50 rounded-md p-4" data-id="v0wm3tqop" data-path="src/components/recommendations/RecommendationsList.tsx">
                  <div className="flex items-center" data-id="9ix2q6kdn" data-path="src/components/recommendations/RecommendationsList.tsx">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="font-medium" data-id="mdptqn1k4" data-path="src/components/recommendations/RecommendationsList.tsx">Transfer {rec.patientCount} patient{rec.patientCount > 1 ? 's' : ''}</span>
                    <ArrowRight className="h-4 w-4 mx-2" />
                    <span data-id="cwgif1pm5" data-path="src/components/recommendations/RecommendationsList.tsx">Expected to reduce risk level at {rec.fromHospital.name} to Medium</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3" data-id="tv2lod406" data-path="src/components/recommendations/RecommendationsList.tsx">
                <Button variant="outline">Dismiss</Button>
                <Button>Confirm Transfer</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>);

};

export default RecommendationsList;