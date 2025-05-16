/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {Hospital, getHospitalData, uploadCSVData } from '@/services/hospitalData';
import { useToast } from '@/hooks/use-toast';

interface HospitalContextType {
  hospitals: Hospital[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  uploadCSV: (data: string) => Promise<void>;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider: React.FC<{children: ReactNode;}> = ({ children }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHospitalData();
      setHospitals(data);
    } catch (err) {
      setError('Failed to load hospital data');
      toast({
        title: 'Error',
        description: 'Failed to load hospital data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadCSV = async (data: string) => {
    try {
      setLoading(true);
      setError(null);
      const newData = await uploadCSVData(data);
      setHospitals(newData);
      toast({
        title: 'Success',
        description: 'Hospital data updated successfully'
      });
    } catch (err) {
      setError('Failed to process CSV data');
      toast({
        title: 'Error',
        description: 'Failed to process CSV data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <HospitalContext.Provider value={{ hospitals, loading, error, refreshData, uploadCSV }}>
      {children}
    </HospitalContext.Provider>);

};

export const useHospitals = (): HospitalContextType => {
  const context = useContext(HospitalContext);
  if (context === undefined) {
    throw new Error('useHospitals must be used within a HospitalProvider');
  }
  return context;
};