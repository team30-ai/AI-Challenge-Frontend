import React from 'react';
import { Hospital, getRiskExplanation } from '@/services/hospitalData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface RiskExplanationProps {
  hospital: Hospital;
}


const mockShapValues = {
  edTrolleys: 0.45,
  wardTrolleys: 0.15,
  delayedTransfers: 0.25,
  elderlyWaiting: 0.15
};

const RiskExplanation: React.FC<RiskExplanationProps> = ({ hospital }) => {
  const explanation = getRiskExplanation(hospital);

  const getRiskIcon = (risk: 'high' | 'medium' | 'low') => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'medium':
        return <Info className="h-6 w-6 text-orange-500" />;
      case 'low':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
  };

  const getRiskColor = (risk: 'high' | 'medium' | 'low') => {
    switch (risk) {
      case 'high':
        return 'text-red-500 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-green-500 bg-green-50 border-green-200';
    }
  };

  return (
    <Card className={`border ${getRiskColor(hospital.riskScore)}`}>
      <CardHeader>
        <div className="flex items-center gap-3" data-id="tgmkrtcem" data-path="src/components/risk/RiskExplanation.tsx">
          {getRiskIcon(hospital.riskScore)}
          <div data-id="dmvae0w1r" data-path="src/components/risk/RiskExplanation.tsx">
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription className="text-gray-600">
              AI-powered risk evaluation for {hospital.name}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6" data-id="mkf8r7eao" data-path="src/components/risk/RiskExplanation.tsx">
          <div data-id="wtlazys7c" data-path="src/components/risk/RiskExplanation.tsx">
            <h3 className="font-semibold mb-2 flex items-center" data-id="6kpsp2o3i" data-path="src/components/risk/RiskExplanation.tsx">
              Risk Level: 
              <Badge
                variant={hospital.riskScore === 'high' ? 'destructive' : hospital.riskScore === 'medium' ? 'default' : 'outline'}
                className={`ml-2 ${hospital.riskScore === 'medium' ? 'bg-orange-500' : ''} ${hospital.riskScore === 'low' ? 'border-green-500 text-green-600' : ''}`}>

                {hospital.riskScore.charAt(0).toUpperCase() + hospital.riskScore.slice(1)}
              </Badge>
            </h3>
            <p className="text-gray-700" data-id="opu2dn133" data-path="src/components/risk/RiskExplanation.tsx">{explanation}</p>
          </div>
          
          <div data-id="gwwx9g3lb" data-path="src/components/risk/RiskExplanation.tsx">
            <h3 className="font-semibold mb-3" data-id="3ul3j9ojp" data-path="src/components/risk/RiskExplanation.tsx">Factor Importance</h3>
            <div className="space-y-3" data-id="d6toihl92" data-path="src/components/risk/RiskExplanation.tsx">
              <div data-id="mjtk1isij" data-path="src/components/risk/RiskExplanation.tsx">
                <div className="flex justify-between text-sm mb-1" data-id="2b8pgnvkl" data-path="src/components/risk/RiskExplanation.tsx">
                  <span data-id="17rzj96kz" data-path="src/components/risk/RiskExplanation.tsx">ED Trolleys</span>
                  <span data-id="djtwdbeep" data-path="src/components/risk/RiskExplanation.tsx">{Math.round(mockShapValues.edTrolleys * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2" data-id="na6853m4x" data-path="src/components/risk/RiskExplanation.tsx">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${mockShapValues.edTrolleys * 100}%` }} data-id="z1ws0mydz" data-path="src/components/risk/RiskExplanation.tsx">
                  </div>
                </div>
              </div>
              <div data-id="19n4zfond" data-path="src/components/risk/RiskExplanation.tsx">
                <div className="flex justify-between text-sm mb-1" data-id="3m2ei6iig" data-path="src/components/risk/RiskExplanation.tsx">
                  <span data-id="7plqt7wzo" data-path="src/components/risk/RiskExplanation.tsx">Delayed Transfers</span>
                  <span data-id="myv4czlqk" data-path="src/components/risk/RiskExplanation.tsx">{Math.round(mockShapValues.delayedTransfers * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2" data-id="5tfbo5mkc" data-path="src/components/risk/RiskExplanation.tsx">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${mockShapValues.delayedTransfers * 100}%` }} data-id="fl9j71cyk" data-path="src/components/risk/RiskExplanation.tsx">
                  </div>
                </div>
              </div>
              <div data-id="7h7x7s7zq" data-path="src/components/risk/RiskExplanation.tsx">
                <div className="flex justify-between text-sm mb-1" data-id="ukfofu68e" data-path="src/components/risk/RiskExplanation.tsx">
                  <span data-id="q970op813" data-path="src/components/risk/RiskExplanation.tsx">Ward Trolleys</span>
                  <span data-id="2a76ue1o4" data-path="src/components/risk/RiskExplanation.tsx">{Math.round(mockShapValues.wardTrolleys * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2" data-id="5p24fwzya" data-path="src/components/risk/RiskExplanation.tsx">
                  <div
                    className="bg-amber-600 h-2 rounded-full"
                    style={{ width: `${mockShapValues.wardTrolleys * 100}%` }} data-id="6v5yhu2p2" data-path="src/components/risk/RiskExplanation.tsx">
                  </div>
                </div>
              </div>
              <div data-id="7qaef3cpx" data-path="src/components/risk/RiskExplanation.tsx">
                <div className="flex justify-between text-sm mb-1" data-id="nlyz5jkov" data-path="src/components/risk/RiskExplanation.tsx">
                  <span data-id="pk1c9u1se" data-path="src/components/risk/RiskExplanation.tsx">Elderly Waiting &gt;24hrs</span>
                  <span data-id="5j7r8nfu3" data-path="src/components/risk/RiskExplanation.tsx">{Math.round(mockShapValues.elderlyWaiting * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2" data-id="hnhwpmdat" data-path="src/components/risk/RiskExplanation.tsx">
                  <div
                    className="bg-teal-600 h-2 rounded-full"
                    style={{ width: `${mockShapValues.elderlyWaiting * 100}%` }} data-id="iax6qfnfw" data-path="src/components/risk/RiskExplanation.tsx">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>);

};

export default RiskExplanation;