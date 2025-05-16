import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useHospitals } from "@/components/context/HospitalContext"
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

const CSVUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadCSV, loading } = useHospitals();
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a CSV file to upload',
        variant: 'destructive'
      });
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        await uploadCSV(text);
      };
      reader.readAsText(file);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process the CSV file',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Hospital Data</CardTitle>
        <CardDescription>
          Upload a CSV file with the latest hospital data to update the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4" data-id="3ymdm3aiu" data-path="src/components/hospital/CSVUploader.tsx">
          <div className="grid grid-cols-1 gap-2" data-id="78ux7ee3z" data-path="src/components/hospital/CSVUploader.tsx">
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange} />

            <p className="text-xs text-gray-500" data-id="efdpun6vb" data-path="src/components/hospital/CSVUploader.tsx">
              The CSV file should include columns for hospital name, ED trolleys, ward trolleys, delayed transfers, and elderly waiting.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full">

          {loading ? 'Processing...' :
          <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Data
            </>
          }
        </Button>
      </CardFooter>
    </Card>);

};

export default CSVUploader;