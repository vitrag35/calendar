import { useState } from 'react';
import { Clock, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface Target {
  id: string;
  accountNo: string;
  customerName: string;
}

interface SetCallTimeModalProps {
  target: Target;
  salesRepId: string;
  onClose: () => void;
  onSave: (targetId: string, time: string) => void;
}

export function SetCallTimeModal({ target, salesRepId, onClose, onSave }: SetCallTimeModalProps) {
  const [manualTime, setManualTime] = useState('');
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [useDropdown, setUseDropdown] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const handleCreateTime = () => {
    let timeToSave = '';
    
    if (useDropdown) {
      timeToSave = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    } else if (manualTime) {
      // Validate manual time format (HH:MM)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(manualTime)) {
        toast.error('Invalid time format. Please use HH:MM format.');
        return;
      }
      
      // Convert 24-hour to 12-hour format
      const [hours, minutes] = manualTime.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      timeToSave = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
    } else {
      toast.error('Please enter a time.');
      return;
    }

    onSave(target.id, timeToSave);
    toast.success('Time Created Successfully');
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Call Time</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 py-4 border-b">
            <div>
              <p className="text-sm text-gray-600">Customer:</p>
              <p>{target.accountNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sales Rep:</p>
              <p>{salesRepId}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-input">Select Time</Label>
            <div className="flex gap-2">
              <Input
                id="time-input"
                type="text"
                placeholder="HH:MM (e.g., 09:30)"
                value={manualTime}
                onChange={(e) => {
                  setManualTime(e.target.value);
                  setUseDropdown(false);
                }}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setUseDropdown(!useDropdown)}
              >
                <Clock className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {useDropdown && (
            <div className="grid grid-cols-3 gap-2 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Hour</Label>
                <Select value={selectedHour} onValueChange={(value) => {
                  setSelectedHour(value);
                  setManualTime('');
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Minute</Label>
                <Select value={selectedMinute} onValueChange={(value) => {
                  setSelectedMinute(value);
                  setManualTime('');
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Period</Label>
                <Select value={selectedPeriod} onValueChange={(value) => {
                  setSelectedPeriod(value);
                  setManualTime('');
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreateTime}>
              Create Time
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
