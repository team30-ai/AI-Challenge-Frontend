import React from 'react';
import { Hospital } from '@/services/hospitalData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HospitalTableProps {
  hospitals: Hospital[];
  showActions?: boolean;
}

const HospitalTable: React.FC<HospitalTableProps> = ({ hospitals, showActions = true }) => {
  // Sort hospitals by risk: high first, then medium, then low
  const sortedHospitals = [...hospitals].sort((a, b) => {
    const riskOrder = { high: 0, medium: 1, low: 2 };
    return riskOrder[a.riskScore] - riskOrder[b.riskScore];
  });

  const getRiskBadge = (risk: 'high' | 'medium' | 'low') => {
    switch (risk) {
      case 'high':
        return <Badge variant="destructive" className="whitespace-nowrap">🔴 High Risk</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap">🟠 Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-600 whitespace-nowrap">🟢 Low Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden w-full" data-id="kab155lg2" data-path="src/components/hospital/HospitalTable.tsx">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital</TableHead>
            <TableHead className="text-center">ED Trolleys</TableHead>
            <TableHead className="text-center">Ward Trolleys</TableHead>
            <TableHead className="text-center">Delayed Transfers</TableHead>
            <TableHead className="text-center">Elderly Waiting &gt;24hrs</TableHead>
            <TableHead className="text-center">Risk Level</TableHead>
            {showActions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedHospitals.map((hospital) =>
          <TableRow key={hospital.id} className={hospital.riskScore === 'high' ? 'bg-red-50' : ''}>
              <TableCell className="font-medium">{hospital.name}</TableCell>
              <TableCell className="text-center">{hospital.edTrolleys}</TableCell>
              <TableCell className="text-center">{hospital.wardTrolleys}</TableCell>
              <TableCell className="text-center">{hospital.delayedTransfers}</TableCell>
              <TableCell className="text-center">{hospital.elderlyWaiting}</TableCell>
              <TableCell className="text-center">{getRiskBadge(hospital.riskScore)}</TableCell>
              {showActions &&
            <TableCell className="text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/risk-scoring?hospital=${hospital.id}`}>View Details</Link>
                  </Button>
                </TableCell>
            }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>);

};

export default HospitalTable;