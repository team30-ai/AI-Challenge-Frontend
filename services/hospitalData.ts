/* eslint-disable @typescript-eslint/no-unused-vars */


export interface Hospital {
  id: string;
  name: string;
  edTrolleys: number;
  wardTrolleys: number;
  delayedTransfers: number;
  elderlyWaiting: number;
  riskScore: 'low' | 'medium' | 'high';
  county: string;
  location: {
    lat: number;
    lng: number;
  };
  capacity: number;
  currentOccupancy: number;
}

export const mockHospitals: Hospital[] = [
{
  id: 'h1',
  name: 'St. Vincent\'s University Hospital',
  edTrolleys: 32,
  wardTrolleys: 15,
  delayedTransfers: 12,
  elderlyWaiting: 8,
  riskScore: 'high',
  county: 'Dublin',
  location: { lat: 53.317, lng: -6.215 },
  capacity: 600,
  currentOccupancy: 570
},
{
  id: 'h2',
  name: 'Mater Misericordiae University Hospital',
  edTrolleys: 28,
  wardTrolleys: 10,
  delayedTransfers: 8,
  elderlyWaiting: 6,
  riskScore: 'high',
  county: 'Dublin',
  location: { lat: 53.357, lng: -6.265 },
  capacity: 650,
  currentOccupancy: 610
},
{
  id: 'h3',
  name: 'Cork University Hospital',
  edTrolleys: 15,
  wardTrolleys: 8,
  delayedTransfers: 5,
  elderlyWaiting: 3,
  riskScore: 'medium',
  county: 'Cork',
  location: { lat: 51.884, lng: -8.486 },
  capacity: 800,
  currentOccupancy: 680
},
{
  id: 'h4',
  name: 'University Hospital Galway',
  edTrolleys: 22,
  wardTrolleys: 11,
  delayedTransfers: 7,
  elderlyWaiting: 5,
  riskScore: 'medium',
  county: 'Galway',
  location: { lat: 53.275, lng: -9.061 },
  capacity: 700,
  currentOccupancy: 630
},
{
  id: 'h5',
  name: 'University Hospital Limerick',
  edTrolleys: 40,
  wardTrolleys: 18,
  delayedTransfers: 14,
  elderlyWaiting: 10,
  riskScore: 'high',
  county: 'Limerick',
  location: { lat: 52.663, lng: -8.636 },
  capacity: 550,
  currentOccupancy: 540
},
{
  id: 'h6',
  name: 'Beaumont Hospital',
  edTrolleys: 25,
  wardTrolleys: 12,
  delayedTransfers: 9,
  elderlyWaiting: 7,
  riskScore: 'medium',
  county: 'Dublin',
  location: { lat: 53.387, lng: -6.231 },
  capacity: 820,
  currentOccupancy: 740
},
{
  id: 'h7',
  name: 'Naas General Hospital',
  edTrolleys: 35,
  wardTrolleys: 16,
  delayedTransfers: 11,
  elderlyWaiting: 9,
  riskScore: 'high',
  county: 'Kildare',
  location: { lat: 53.218, lng: -6.660 },
  capacity: 400,
  currentOccupancy: 390
},
{
  id: 'h8',
  name: 'MRH Mullingar',
  edTrolleys: 5,
  wardTrolleys: 3,
  delayedTransfers: 2,
  elderlyWaiting: 1,
  riskScore: 'low',
  county: 'Westmeath',
  location: { lat: 53.526, lng: -7.335 },
  capacity: 300,
  currentOccupancy: 220
},
{
  id: 'h9',
  name: 'St. James\'s Hospital',
  edTrolleys: 20,
  wardTrolleys: 9,
  delayedTransfers: 6,
  elderlyWaiting: 4,
  riskScore: 'medium',
  county: 'Dublin',
  location: { lat: 53.337, lng: -6.294 },
  capacity: 1000,
  currentOccupancy: 850
},
{
  id: 'h10',
  name: 'Sligo University Hospital',
  edTrolleys: 8,
  wardTrolleys: 4,
  delayedTransfers: 3,
  elderlyWaiting: 1,
  riskScore: 'low',
  county: 'Sligo',
  location: { lat: 54.273, lng: -8.480 },
  capacity: 350,
  currentOccupancy: 280
}];


// Calculate risk score based on hospital metrics
export const calculateRiskScore = (hospital: Omit<Hospital, 'riskScore'>): 'low' | 'medium' | 'high' => {
  const { edTrolleys, wardTrolleys, delayedTransfers, elderlyWaiting } = hospital;

  // Simple scoring algorithm
  let score = 0;

  // ED Trolleys
  if (edTrolleys >= 30) score += 3;else
  if (edTrolleys >= 15) score += 2;else
  score += 1;

  // Ward Trolleys
  if (wardTrolleys >= 15) score += 3;else
  if (wardTrolleys >= 8) score += 2;else
  score += 1;

  // Delayed Transfers
  if (delayedTransfers >= 10) score += 3;else
  if (delayedTransfers >= 5) score += 2;else
  score += 1;

  // Elderly Waiting >24 hours
  if (elderlyWaiting >= 8) score += 3;else
  if (elderlyWaiting >= 4) score += 2;else
  score += 1;

  // Determine risk level based on score
  if (score >= 10) return 'high';else
  if (score >= 6) return 'medium';else
  return 'low';
};

// Get risk explanation
export const getRiskExplanation = (hospital: Hospital): string => {
  const factors: string[] = [];

  if (hospital.edTrolleys >= 30) factors.push(`${hospital.edTrolleys} ED trolleys (critical level)`);else
  if (hospital.edTrolleys >= 15) factors.push(`${hospital.edTrolleys} ED trolleys (concerning level)`);

  if (hospital.delayedTransfers >= 10) factors.push(`${hospital.delayedTransfers} delayed transfers (critical level)`);else
  if (hospital.delayedTransfers >= 5) factors.push(`${hospital.delayedTransfers} delayed transfers (concerning level)`);

  if (hospital.elderlyWaiting >= 8) factors.push(`${hospital.elderlyWaiting} elderly patients waiting >24 hours (critical level)`);else
  if (hospital.elderlyWaiting >= 4) factors.push(`${hospital.elderlyWaiting} elderly patients waiting >24 hours (concerning level)`);

  return `This hospital is at ${hospital.riskScore} risk because of: ${factors.join(', ')}.`;
};

// Generate recommendations
export const generateRecommendations = (hospitals: Hospital[]): {fromHospital: Hospital;toHospital: Hospital;patientCount: number;}[] => {
  const recommendations: {fromHospital: Hospital;toHospital: Hospital;patientCount: number;}[] = [];

  // Find high-risk hospitals
  const highRiskHospitals = hospitals.filter((h) => h.riskScore === 'high');

  // Find low-risk hospitals with capacity
  const lowRiskHospitals = hospitals.filter((h) => h.riskScore === 'low' && h.capacity - h.currentOccupancy >= 5);

  // Generate recommendations
  highRiskHospitals.forEach((fromHospital) => {
    if (lowRiskHospitals.length > 0) {
      // Find the nearest low-risk hospital (simplified by just picking the first one for demo)
      const toHospital = lowRiskHospitals[0];

      // Calculate patient count to transfer (simplified for demo)
      const patientCount = Math.min(5, toHospital.capacity - toHospital.currentOccupancy);

      recommendations.push({
        fromHospital,
        toHospital,
        patientCount
      });
    }
  });

  return recommendations;
};

// Get alerts based on risk scores
export const getAlerts = (hospitals: Hospital[]): {hospital: Hospital;message: string;}[] => {
  const highRiskHospitals = hospitals.filter((h) => h.riskScore === 'high');

  return highRiskHospitals.map((hospital) => ({
    hospital,
    message: `ALERT: ${hospital.name} is at critical overcrowding levels with ${hospital.edTrolleys} ED trolleys and ${hospital.elderlyWaiting} elderly patients waiting >24 hours.`
  }));
};

// Simulate loading hospital data
export const getHospitalData = (): Promise<Hospital[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockHospitals);
    }, 500);
  });
};

// Simulate uploading CSV data
export const uploadCSVData = (data: string): Promise<Hospital[]> => {
  return new Promise((resolve) => {
    // In a real app, this would parse the CSV and return data
    // For now, we'll just return our mock hospitals with a timeout
    setTimeout(() => {
      resolve(mockHospitals);
    }, 1000);
  });
};