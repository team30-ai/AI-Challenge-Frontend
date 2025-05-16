import React from 'react';
import { Hospital } from '@/services/hospitalData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  const occupancyPercentage = Math.round(hospital.currentOccupancy / hospital.capacity * 100);

  const getRiskBadge = (risk: 'high' | 'medium' | 'low') => {
    switch (risk) {
      case 'high':
        return <Badge variant="destructive" className="ml-2">🔴 High Risk</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-orange-500 hover:bg-orange-600 ml-2">🟠 Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-600 ml-2">🟢 Low Risk</Badge>;
      default:
        return <Badge variant="outline" className="ml-2">Unknown</Badge>;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <Card className={`overflow-hidden ${hospital.riskScore === 'high' ? 'border-red-500' : ''}`}>
      <CardHeader className={hospital.riskScore === 'high' ? 'bg-red-50' : 'bg-gray-50'}>
        <CardTitle className="flex justify-between items-center text-lg">
          <span data-id="ztlholubi" data-path="src/components/hospital/HospitalCard.tsx">{hospital.name}</span>
          {getRiskBadge(hospital.riskScore)}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4" data-id="mvrhz9izp" data-path="src/components/hospital/HospitalCard.tsx">
          <div className="grid grid-cols-2 gap-4" data-id="walfcd1pd" data-path="src/components/hospital/HospitalCard.tsx">
            <div className="bg-blue-50 p-3 rounded-md" data-id="q0wcw1ku7" data-path="src/components/hospital/HospitalCard.tsx">
              <p className="text-sm text-gray-500" data-id="cbcjnwazf" data-path="src/components/hospital/HospitalCard.tsx">ED Trolleys</p>
              <p className="text-lg font-semibold" data-id="ir4cizlhx" data-path="src/components/hospital/HospitalCard.tsx">{hospital.edTrolleys}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-md" data-id="s68fr7rjf" data-path="src/components/hospital/HospitalCard.tsx">
              <p className="text-sm text-gray-500" data-id="2uojyo3i9" data-path="src/components/hospital/HospitalCard.tsx">Ward Trolleys</p>
              <p className="text-lg font-semibold" data-id="7g5f589oj" data-path="src/components/hospital/HospitalCard.tsx">{hospital.wardTrolleys}</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-md" data-id="okwclc5kw" data-path="src/components/hospital/HospitalCard.tsx">
              <p className="text-sm text-gray-500" data-id="oxvzpbear" data-path="src/components/hospital/HospitalCard.tsx">Delayed Transfers</p>
              <p className="text-lg font-semibold" data-id="osilcqvb6" data-path="src/components/hospital/HospitalCard.tsx">{hospital.delayedTransfers}</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-md" data-id="oomc23adi" data-path="src/components/hospital/HospitalCard.tsx">
              <p className="text-sm text-gray-500" data-id="bnobpmzsg" data-path="src/components/hospital/HospitalCard.tsx">Elderly Waiting &gt;24hrs</p>
              <p className="text-lg font-semibold" data-id="2ohofhasz" data-path="src/components/hospital/HospitalCard.tsx">{hospital.elderlyWaiting}</p>
            </div>
          </div>
          
          <div data-id="6c974rzg3" data-path="src/components/hospital/HospitalCard.tsx">
            <div className="flex justify-between mb-1" data-id="w3wz7esw4" data-path="src/components/hospital/HospitalCard.tsx">
              <span className="text-sm" data-id="1egiph7wl" data-path="src/components/hospital/HospitalCard.tsx">Occupancy</span>
              <span className="text-sm font-medium" data-id="62mhboueb" data-path="src/components/hospital/HospitalCard.tsx">{occupancyPercentage}%</span>
            </div>
            <Progress
              value={occupancyPercentage}
              className="h-2"
              indicatorClassName={getProgressColor(occupancyPercentage)} />

            <div className="flex justify-between mt-1 text-xs text-gray-500" data-id="cl079n09b" data-path="src/components/hospital/HospitalCard.tsx">
              <span data-id="a6gkie2zr" data-path="src/components/hospital/HospitalCard.tsx">{hospital.currentOccupancy} occupied</span>
              <span data-id="dy867igb3" data-path="src/components/hospital/HospitalCard.tsx">{hospital.capacity} capacity</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Button variant="outline" asChild className="w-full">
          <Link  href={`/risk-scoring?hospital=${hospital.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>);

};

export default HospitalCard;